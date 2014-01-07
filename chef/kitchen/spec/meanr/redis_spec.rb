require 'spec_helper'

describe command('which redis-cli') do
  it { should return_stdout '/usr/local/bin/redis-cli' }
end

describe port(6379) do
  it { should be_listening }
end
