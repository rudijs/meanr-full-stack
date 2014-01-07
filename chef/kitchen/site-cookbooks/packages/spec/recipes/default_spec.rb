require_relative '../spec_helper'

describe 'packages::default' do
  let(:chef_run) { ChefSpec::Runner.new.converge(described_recipe) }

  it 'installs sysstat' do
    expect(chef_run).to install_package 'sysstat'
  end

  it 'installs htop' do
    expect(chef_run).to install_package 'htop'
  end

  it 'installs apticron' do
    expect(chef_run).to install_package 'apticron'
  end

  it 'installs git-core' do
    expect(chef_run).to install_package 'git-core'
  end

end
