#
# Cookbook Name:: node_upstart
# Recipe:: default
#
# Copyright 2013, YOUR_COMPANY_NAME
#
# All rights reserved - Do Not Redistribute
#
template '/etc/init/node.conf' do
  source 'node_upstart.conf'
end
