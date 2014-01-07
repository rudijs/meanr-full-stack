require_relative '../spec_helper'

describe 'node_app_root::default' do
  let(:chef_run) do
    ChefSpec::Runner.new do |node|
      node.automatic['app']['root'] = '/srv/node/app/root'
      node.automatic['app']['owner'] = 'deploy'
      node.automatic['app']['group'] = 'deploy'
    end.converge(described_recipe)
  end

  it 'creates a directory with attributes' do
    expect(chef_run).to create_directory('/srv/node/app/root').with(
        user: 'deploy',
        group: 'deploy',
        mode: '0755'
                        )
  end

end
