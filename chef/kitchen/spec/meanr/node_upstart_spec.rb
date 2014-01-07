require 'spec_helper'

describe file('/etc/init/node.conf') do
  it { should be_file }
end
