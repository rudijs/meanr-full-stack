set :application, 'meanr'
set :repo_url, 'git@github.com:rudijs/meanr-full-stack.git'

# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }

set :deploy_to, '/srv/meanr'
# set :scm, :git

set :user, "deploy"

# set :format, :pretty
# set :log_level, :debug
# set :pty, true

set :linked_files, %w{config/config.js config/env/development.json config/env/production.json}
set :linked_dirs, %w{log node_modules}

set :seed_files, %w{test/fixtures/db/users.json test/fixtures/db/articles.json}

set :default_env, { path: "/home/#{fetch(:user)}/node/bin:$PATH" }
set :keep_releases, 5

set :ssh_options, {
     forward_agent: true
}

namespace :deploy do

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do

      execute "sudo service nginx reload"

      # If capistrano delpoy runs directly after a chef fun on a new server the node application may not be running yet.
      # If so reload will fail, so we'll catch that and try a start operation
      begin
        execute "sudo service node reload"
      rescue
        execute "sudo service node start"
      end
    end
  end

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

  after :finishing, "deploy:cleanup"
end

# Sometimes the NPM node_modules/scrypt build fails - not sure why so far?
# The fix (for now) is to remove the .node-gyp files re-run the deployment.
# So before deployment check for and remove these files.
# If scrypt has built successfully already removing these files will have no effect.
desc "Clean .node-gyp"
task :clean_node_gyp do
  on roles(:app), in: :sequence do
  execute "if [[ -d /home/#{fetch(:user)}/.node-gyp ]]; then rm -rf /home/#{fetch(:user)}/.node-gyp; fi"
  end
end

# Rsync config files direct.
# Current deployment policy keeps these sensitive files out of the git repository.
# Other options for this include encrypting the contents into a chef databag or something like chef-vault
desc "Rsync configs"
task :rsync_configs do

  roles(:app).each do |server|
    fetch(:linked_files).each do |linked_file|
      system("ssh #{fetch(:user)}@#{server} 'if [[ ! -d #{shared_path}/config/env/ ]]; then mkdir -p #{shared_path}/config/env/; fi'")
      system("rsync -v --recursive #{linked_file} #{fetch(:user)}@#{server}:#{shared_path}/#{linked_file}")
    end
  end
end

desc "Seed MongoDB"
task :mongodb_seed do

  puts "Seeding MongoDB #{fetch(:mongodb_name)}"

  on roles(:db), in: :sequence do |server|
    fetch(:seed_files).each do |linked_file|

      collection_name = File.basename(linked_file).split('.')[0]

      puts "scp #{linked_file} to #{fetch(:user)}@#{server} #{collection_name}"
      system("scp #{linked_file} #{fetch(:user)}@#{server}:~")

      execute "mongoimport --db #{fetch(:mongodb_name)} --collection #{collection_name} < /home/#{fetch(:user)}/#{File.basename(linked_file)}"

      execute "rm /home/#{fetch(:user)}/#{File.basename(linked_file)}"

    end
  end
end

desc "Drop MongoDB Collections"
task :mongodb_drop do

  puts "Dropping MongoDB #{fetch(:mongodb_name)} collections"

  on roles(:db), in: :sequence do |server|
  fetch(:seed_files).each do |linked_file|

    collection_name = File.basename(linked_file).split('.')[0]
    execute "echo 'db.#{collection_name}.drop()' | mongo #{fetch(:mongodb_name)}"
  end
end
end

before :deploy, :rsync_configs
before :deploy, :clean_node_gyp
