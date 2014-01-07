require 'spec_helper'

describe package('apticron') do
  it { should be_installed }
end

describe package('git-core') do
  it { should be_installed }
end

describe package('htop') do
  it { should be_installed }
end

describe package('sysstat') do
  it { should be_installed }
end
