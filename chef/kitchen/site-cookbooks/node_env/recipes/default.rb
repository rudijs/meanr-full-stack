#
# Cookbook Name:: node_env
# Recipe:: default
#
# Copyright 2013, YOUR_COMPANY_NAME
#
# All rights reserved - Do Not Redistribute
#
template '/etc/profile.d/node_env.sh'  do
  source 'node_env.sh.erb'
end
