#
# Cookbook Name:: node_app_root
# Recipe:: default
#
# Copyright 2013, YOUR_COMPANY_NAME
#
# All rights reserved - Do Not Redistribute
#
directory node.app.root do
  owner node.app.owner
  group node.app.group
  mode '0755'
  action :create
  not_if do
    ::File.directory?(node.app.root)
  end
end
