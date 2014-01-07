require 'spec_helper'

describe file('/etc/apt/sources.list.d/10gen.list') do
  it { should be_file }
end

describe package('mongodb-10gen') do
  it { should be_installed }
end

describe port(27_017) do
  it { should be_listening }
end
