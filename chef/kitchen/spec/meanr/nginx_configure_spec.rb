require 'spec_helper'

describe file('/etc/nginx/sites-enabled/meanr.com') do
  it { should be_file }
  its(:content) { should match /server_name\n(\s){12}dev\.meanr\.com\n(\s){12}staging\.meanr\.com\n(\s){12}qa\.meanr\.com\n(\s){12}meanr\.com;/ }
end
