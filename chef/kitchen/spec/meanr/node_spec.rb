require 'spec_helper'

describe file('/home/deploy/node/bin/node') do
  it { should be_owned_by 'deploy' }
end

describe file('/home/deploy/node/bin/node') do
  it { should be_executable }
end
