require 'spec_helper'

describe package('unattended-upgrades') do
  it { should be_installed }
end

describe file('/etc/apt/apt.conf.d/50unattended-upgrades') do
  it { should be_file }
end
