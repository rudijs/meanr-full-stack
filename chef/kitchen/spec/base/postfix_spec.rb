require 'spec_helper'

describe package('postfix') do
  it { should be_installed }
end
