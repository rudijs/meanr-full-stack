#
# Cookbook Name:: apt-get-periodic
# Recipe:: default
#
# Copyright 2013, YOUR_COMPANY_NAME
#
# All rights reserved - Do Not Redistribute
#
# Execute apt-get update to ensure the local APT package cache is up to date
execute 'apt-get-update' do
  command 'apt-get update'
  ignore_failure true
  action :nothing
end

package 'update-notifier-common' do
  notifies :run, resources(execute: 'apt-get-update'), :immediately
end

execute 'apt-get-update-periodic' do
  command 'apt-get update'
  ignore_failure true
  only_if do
    File.exists?('/var/lib/apt/periodic/update-success-stamp') &&
        File.mtime('/var/lib/apt/periodic/update-success-stamp') < Time.now - 86_400
  end
end
