#
# Cookbook Name:: node
# Recipe:: default
#
# Copyright 2013, YOUR_COMPANY_NAME
#
# All rights reserved - Do Not Redistribute
#
# Skip if already done
File.exists?("/home/#{node.app.owner}/node/bin/node") ? return : true

execute "Download node #{node.node_version}" do
  command "wget http://nodejs.org/dist/v#{node.node_version}/node-v#{node.node_version}-linux-x64.tar.gz"
end

execute 'Extract node archive' do
  command "tar -zxvf node-v#{node.node_version}-linux-x64.tar.gz"
end

execute 'Move node into place' do
  command "mv node-v#{node.node_version}-linux-x64 /home/#{node.app.owner}/node"
end

execute 'Update node permissions' do
  command "chown -R #{node.app.owner}.#{node.app.owner} /home/#{node.app.owner}/node"
end
