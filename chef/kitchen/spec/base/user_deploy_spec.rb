require 'spec_helper'

describe user('deploy') do
  it { should exist }
end

describe user('deploy') do
  it { should belong_to_group 'deploy' }
end

describe user('deploy') do
  it { should have_home_directory '/home/deploy' }
end

describe user('deploy') do
  it { should have_login_shell '/bin/bash' }
end
