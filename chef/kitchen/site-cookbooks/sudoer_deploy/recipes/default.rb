#
# Cookbook Name:: sudoer_deploy
# Recipe:: default
#
# Copyright 2013, YOUR_COMPANY_NAME
#
# All rights reserved - Do Not Redistribute
#
template '/etc/sudoers.d/deploy' do
  source 'sudo_deploy.conf'
  mode '0440'
end
