#
# Cookbook Name:: ssh_known_hosts
# Recipe:: default
#
# Copyright 2013, YOUR_COMPANY_NAME
#
# All rights reserved - Do Not Redistribute
#
# accept ssh host keys automatically for each host

ssh_known_hosts = data_bag('ssh_known_hosts')

# Skip if known_hosts has already be created
File.exists?("/home/#{node.app.owner}/.ssh/known_hosts") ? return : true

ssh_known_hosts.each do |h|

  ssh_known_host = data_bag_item('ssh_known_hosts', h)

  execute "SSH Trusted Host: #{ssh_known_host['hostname']}" do
    command "ssh -oStrictHostKeyChecking=no git@#{ssh_known_host['hostname']}"
    user node.app.owner
    environment 'HOME' => "/home/#{node.app.owner}"
    returns 255
  end

end

# If ssh known_hosts was create OK update the file permissions
if File.exists?("/home/#{node.app.owner}/.ssh/known_hosts")
  file "/home/#{node.app.owner}/.ssh/known_hosts" do
    owner node.app.owner
    group node.app.group
    mode '0644'
    action :touch
  end
end
