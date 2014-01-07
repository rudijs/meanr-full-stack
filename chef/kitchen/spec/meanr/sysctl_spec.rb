require 'spec_helper'

describe file('/etc/sysctl.d/99-chef-attributes.conf') do
  it { should be_file }

  it { should contain 'net.ipv4.ip_local_port_range=2000 65000' }
  it { should contain 'net.ipv4.tcp_window_scaling=1' }
  it { should contain 'net.ipv4.tcp_max_syn_backlog=3240000' }
  it { should contain 'net.ipv4.tcp_max_tw_buckets=1440000' }
  it { should contain 'net.core.rmem_default=8388608' }
  it { should contain 'net.core.rmem_max=16777216' }
  it { should contain 'net.core.wmem_max=16777216' }
  it { should contain 'net.ipv4.tcp_rmem=4096 87380 16777216' }
  it { should contain 'net.ipv4.tcp_wmem=4096 65536 16777216' }
  it { should contain 'net.ipv4.tcp_congestion_control=cubic' }

end
