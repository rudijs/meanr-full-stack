require 'spec_helper'

describe file('/etc/profile.d/node_env.sh') do
  it { should be_file }
end
