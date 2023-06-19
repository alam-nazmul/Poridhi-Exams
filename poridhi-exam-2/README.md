## Creating Two network namespaces and connect them with their virtual ethernet 

In a Linux system, network namespaces provide segregated instances of the network stack, interfaces, and routing tables. Processes can function within their own independent network environment with network namespaces, ensuring isolation from processes in other namespaces.

Each network namespace has its own set of network interfaces, IP addresses, routing tables, and firewall rules. This enables processes within a namespace to have their own distinct network configuration, distinct from processes in other namespaces.

Using network namespaces, administrators can create isolated network environments for various programs or users, preventing interference or conflicts between them. It also facilitates the deployment of network virtualization and containerization technologies, where each container or virtual machine can operate in its own network namespace, assuring network isolation and security.


## Checklist

- Create a virtual machine on workstation by using KVM.
- Create two namespaces.
- Make a connectivity between two virtual ethernet.
- Set the virtual ethernet port for both namespaces.
- Set the IP addresses on both virtual ethernet.
- Enable / Lights up the virtual ethernet on both namespaces.
- Check the IP reachibility.


## *Create a virtual machine on workstation by using KVM* ##


I have provisioned Almalinux-8 as a virtual machine.

```
cat /etc/os-release | grep VERSION_ID
    VERSION_ID="8.8"
```

## *Create two namespaces* ##

Here we will create two namespaces named as "Green" and "Blue"

```
ip netns add green
ip netns add blue
```

## *Set the virtual ethernet port for both namespaces* ##
```
ip link set veth0 netns green
ip link set veth1 netns blue
```


## *Set the IP addresses on both virtual ethernet* ##
```
ip -n green addr add 10.20.100.3/29 dev veth0
ip -n blue addr add 10.20.100.4/29 dev veth1
```

## *Make a connectivity between two virtual ethernet* ##
```
ip link add veth0 type veth peer name veth1
```

## *Enable / Lights up the virtual ethernet on both namespaces* ##
```
ip -n green link set dev veth0 up
ip -n blue link set dev veth1 up
```

## *Check the IP reachibility* ##
Enter the green namespace
```
ip netns exec green /bin/bash
```

Check the IP address
```
ip add
```

Finally check the IP reachibility from Green namespace to Blue name space
```
ping 10.20.100.4 -c3
```