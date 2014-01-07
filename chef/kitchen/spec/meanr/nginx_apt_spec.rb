require 'spec_helper'

describe file('/etc/apt/sources.list.d/nginx.list') do
  it { should be_file }
end
