require 'spec_helper'

describe command('hostname --fqdn') do
  it { should return_stdout /((dev|staging|qa)\.meanr\.com)|meanr\.com/ }
end
