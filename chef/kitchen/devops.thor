require 'colorize'

class Devops < Thor

  devops_env = ENV.fetch("DEVOPS_ENV", "development")

  # default devops_env development
  vm_hostname = "dev.meanr.com"
  vm_ip = "192.168.33.10"
  vm_user = "vagrant"

  if devops_env == 'staging'
    vm_hostname = "staging.meanr.com"
    vm_ip = "staging.meanr.com"
    vm_user = "ubuntu"

  elsif devops_env == 'qa'
    vm_hostname = "qa.meanr.com"
    vm_ip = "qa.meanr.com"
    vm_user = "ubuntu"

  elsif devops_env == 'production'
    vm_hostname = "meanr.com"
    vm_ip = "meanr.com"
    vm_user = "ubuntu"
  end

  puts "\n>>>>>>>>>> ENV => #{devops_env.upcase}".green
  puts "\n>>>>>>>>>> Working on #{vm_user}@#{vm_hostname}".red
  puts "\n\n"

  desc "sshcopyid", "Adds ssh public key to server"
  method_options :hostname => vm_hostname, :user => vm_user
  def sshcopyid
    cmd = "ssh-copy-id #{options[:user]}@#{options[:hostname]}"
    puts cmd; system cmd
  end

  desc "upgrade", "Upgrades server"
  method_options :hostname => vm_hostname, :user => vm_user
  def upgrade
    cmd = "ssh #{options[:user]}@#{options[:hostname]} -X 'sudo aptitude update && sudo aptitude safe-upgrade -y'"
    puts cmd; system cmd
    invoke :reboot
  end

  desc "rebuild", "Rebuilds VirtualBox Guest Additions kernel modules"
  def rebuild
    cmd = "vagrant ssh --command 'sudo aptitude install curl build-essential dkms -y && sudo /etc/init.d/vboxadd setup'"
    puts cmd; system cmd
    # "vagrant reload" throws errors if new kernal so halt and manual restart instead.
    puts "Full machine shutdown to force vagrant reload. Restart with vagrant up."
    invoke :reboot
  end

  desc "reboot", "Reboots server"
  method_options :hostname => vm_hostname, :user => vm_user
  def reboot
    puts "Rebooting #{options[:hostname]} ..."
    cmd = "ssh #{options[:user]}@#{options[:hostname]} 'sudo init 6'"
    puts cmd; system cmd
  end

  desc "halt", "Halts server"
  method_options :hostname => vm_hostname, :user => vm_user
  def halt
    puts "Halting the server #{options[:hostname]} ...'"
    cmd = "ssh #{options[:user]}@#{options[:hostname]} 'sudo init 0'"
    puts cmd; system cmd
  end

  desc "bootstrap", "Bootstraps server with Ruby and Chef"
  method_options :hostname => vm_hostname, :user => vm_user
  def bootstrap
    cmd = "ssh #{options[:user]}@#{options[:hostname]} \"if ! [ -e /opt/chef/bin/chef-solo ]; then curl -L https://www.opscode.com/chef/install.sh | sudo bash; else echo 'Chef [OK]' ; fi\""
    puts cmd; system cmd
  end

  desc "cook", "Runs knife solo cook"
  method_options :hostname => vm_hostname, :user => vm_user
  def cook
    cmd = "knife solo cook --no-chef-check #{options[:user]}@#{options[:hostname]}"
    puts cmd; system cmd
    cmd = "knife solo clean #{options[:user]}@#{options[:hostname]}"
    puts cmd; system cmd
  end

  desc "test", "Runs foodcritic and checspec tests"
  def test
    puts "Foodcritic:"
    system "foodcritic site-cookbooks"
    puts "ChefSpec"
    system "rspec site-cookbooks"
    puts "Rubocop"
    system "rubocop site-cookbooks"
    system "rubocop spec"
  end

  desc "new_cookbook", "Creates a new cookbook"
  def new_cookbook(name)
    system "knife cookbook create -o site-cookbooks #{name}"
  end

end
