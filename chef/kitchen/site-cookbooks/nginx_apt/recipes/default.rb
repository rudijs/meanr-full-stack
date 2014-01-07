#
# Cookbook Name:: nginx_apt
# Recipe:: default
#
# Copyright 2013, YOUR_COMPANY_NAME
#
# All rights reserved - Do Not Redistribute
#
File.exists?('/etc/apt/sources.list.d/nginx.list') ? return : true

template '/etc/apt/sources.list.d/nginx.list'  do
  source 'nginx.list'
end

execute 'Get nginx gpg key' do
  command 'wget http://nginx.org/keys/nginx_signing.key'
end

execute 'Add nginx gpg key' do
  command 'cat nginx_signing.key | sudo apt-key add -'
end

execute 'Update apt repository' do
  command 'sudo apt-get update'
end
