## Creating Two containers and connect them with OpenVSwitch


Open vSwitch (OpenvSwitch or OVS) is an open-source, multilayer virtual switch designed to be used in virtualized environments like data centers, cloud computing, and network virtualization. It enables network virtualization by providing the functionality of a traditional network switch while offering additional features that make it suitable for modern virtualization scenarios.

Key features of Open vSwitch include:

Multi-layer Switching: Open vSwitch operates at multiple OSI (Open Systems Interconnection) layers, including layer 2 (data link layer) and layer 3 (network layer), allowing it to handle various types of network traffic and perform routing tasks.

Network Overlay Support: Open vSwitch supports network overlay technologies like VXLAN, GRE, and Geneve, which allow virtual networks to be extended across physical network boundaries, facilitating scalable and flexible network virtualization.

SDN (Software-Defined Networking) Integration: Open vSwitch is designed to work seamlessly with SDN controllers, enabling centralized management and control of network configurations and policies.

Flow-based Forwarding: It implements flow-based forwarding, where packets are matched to specific flows and forwarded accordingly, providing efficient packet processing.

QoS (Quality of Service): Open vSwitch allows you to set up Quality of Service policies to prioritize certain types of traffic and ensure better performance for critical applications.

Monitoring and Debugging: Open vSwitch provides tools and features for monitoring and debugging network traffic, allowing administrators to gain insights into the virtualized network environment.

OpenFlow Support: OpenFlow is a protocol that enables communication between the SDN controller and the switches. Open vSwitch has support for OpenFlow, allowing it to integrate into SDN environments effectively.

Open vSwitch is widely used in various virtualization platforms, including OpenStack, KVM (Kernel-based Virtual Machine), and Docker, to facilitate network connectivity and management within virtualized environments.


## *Prerequisites* ##

- OS: Rockylinux 9 
- Virtual Env: KVM
- Container engine: podman
- Selinux: enabled
- Firewalld: enabled


## *Diagram* ##


## Checklist

- Create two virtual machines on workstation by using KVM.
- Set the hostname.
- Install dependent packages.
- Install the bridge utils on host machine.
- Install podman as container engine on both VM.
- Create two bridges by using OVS and lights up.
- Add the veths with OVS.
- Set the IP addresses on VETHs.
- Set the MTU on VETHs.
- Create containers.
- Install necessary packages and modify the permission of ping response.
- Add IP addresses on the containers by using ovs-docker.
- Create and lights up a tunnel with vxlan id, with another VM by using ovs.
- Allow vxlan port on firewalld service.
- Run this container as a service.
- Check the IP reachability.




hostnamectl set-hostname node1
dnf search nfv
dnf install centos-release-nfv* -y
dnf install openvswitch* -y --skip-broken
dnf search openvswitch
dnf install network-scripts-openvswitch2.16.x86_64  -y  --skip-broken
dnf install epel-release -y
dnf install bridge-utils -y
systemctl enable --now openvswitch.service 
ovs-vsctl add-br ovs-br0
ovs-vsctl add-br ovs-br1
ovs-vsctl add-port ovs-br0 veth0 -- set interface veth0 type=internal
ovs-vsctl add-port ovs-br1 veth1 -- set interface veth1 type=internal
ip address add 192.168.1.1/24 dev veth0 
ip address add 192.168.2.1/24 dev veth1 
ip link set dev veth0 up mtu 1450
ip link set dev veth1 up mtu 1450
dnf install podman* -y