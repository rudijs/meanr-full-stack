#
# Cookbook Name:: nginx_configure
# Recipe:: default
#
# Copyright 2013, YOUR_COMPANY_NAME
#
# All rights reserved - Do Not Redistribute
#
template "/etc/nginx/sites-available/#{node.app.hostname}"  do
  source 'nginx_meanr_conf.erb'
  notifies :reload, 'service[nginx]', :delayed
end

execute "nxensite #{node.app.hostname}" do

  command "/usr/sbin/nxensite #{node.app.hostname}"

  notifies :reload, 'service[nginx]', :delayed

  not_if do
    ::File.symlink?("#{node['nginx']['dir']}/sites-enabled/#{node.app.hostname}")
  end

end
