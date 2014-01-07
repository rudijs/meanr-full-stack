require 'spec_helper'

describe file('/srv/meanr') do
  it { should be_directory }
  it { should be_writable.by('owner') }
end

describe file('/srv/meanr') do
  it { should be_owned_by 'deploy' }
end

describe file('/srv/meanr') do
  it { should be_mode 755 }
end
