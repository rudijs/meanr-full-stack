require 'spec_helper'

describe file('/etc/sudoers.d/deploy') do
  it { should be_file }
end
