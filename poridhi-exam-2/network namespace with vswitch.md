## Creating Two network namespaces and connect them with their virtual ethernet 

In a Linux system, network namespaces provide segregated instances of the network stack, interfaces, and routing tables. Processes can function within their own independent network environment with network namespaces, ensuring isolation from processes in other namespaces.

Each network namespace has its own set of network interfaces, IP addresses, routing tables, and firewall rules. This enables processes within a namespace to have their own distinct network configuration, distinct from processes in other namespaces.

Using network namespaces, administrators can create isolated network environments for various programs or users, preventing interference or conflicts between them. It also facilitates the deployment of network virtualization and containerization technologies, where each container or virtual machine can operate in its own network namespace, assuring network isolation and security.


## *Diagram* ##

![Alt text](<Screenshot from 2023-06-22 02-48-37.png>)



## Checklist

- Create a virtual machine on workstation by using KVM.
- Create a bridge, lights up and set the IP address.
- Create 1st namespace.
- Create a virtual ether on bridge and connect with 1st namespace's virtual ether.
- Merge the virtual ether with 1st namespace and set the IP address
- Enable / Lights up the virtual ethernet
- Make the slave as virtual ether on bridge and light's up.

- Create 2nd namespace.
- Create a virtual ether on bridge and connect with 2nd namespace's virtual ether.
- Merge the virtual ether with 2nd namespace and set the IP address
- Enable / Lights up the virtual ethernet.
- Make the slave as virtual ether on bridge and light's up.

- Check the IP reachibility.


## *Create a virtual machine on workstation by using KVM* ##


I have provisioned Almalinux-8 as a virtual machine.

```
cat /etc/os-release | grep VERSION_ID
    VERSION_ID="8.8"
```

## *Create a bridge, lights up and set the IP address.* ##

Here we will create the bridge, name as "nazmul"

```
ip link add nazmul type bridge
ip link set nazmul up
ip addr add 100.100.200.100/24 dev nazmul
```

## *Create 1st namespace.* ##
The name of 1st namespace is "ns121"
```
ip netns add ns121
```


## *Create a virtual ether on bridge and connect with 1st namespace's virtual ether* ##
```
ip link add veth0 type veth peer name veth1
```

## *Merge the virtual ether with 1st namespace and set the IP address* ##
```
ip link set veth1 netns ns121
ip netns exec ns121 ip addr add 100.100.200.5/24 dev veth1
```

## *Enable / Lights up the virtual ethernet* ##
```
ip netns exec ns121 ip link set veth1 up
```

## *Make the slave as virtual ether on bridge and light's up* ##
```
ip link set veth0 master nazmul
ip link set veth0 up
```

## *Create 2nd namespace* ##
```
ip netns add ns212
```

## *Create a virtual ether on bridge and connect with 2nd namespace's virtual ether* ##
```
ip link add veth2 type veth peer name veth3
```

## *Merge the virtual ether with 2nd namespace and set the IP address* ##
```
ip link set veth3 netns ns212
ip netns exec ns212 ip addr add 100.100.200.6/24 dev veth3
```

## *Enable / Lights up the virtual ethernet* ##
```
ip netns exec ns212 ip link set veth3 up
```

## *Make the slave as virtual ether on bridge and light's up* ##
```
ip netns exec ns212 ip link set veth3 up
```

## *Make the slave as virtual ether on bridge and light's up* ##
```
ip link set veth2 master nazmul
ip link set veth2 up
```


## *Check the IP reachibility* ##
Enter the green namespace
```
ip netns exec ns121 /bin/bash
```

Check the IP address
```
ip add
```

Finally check the IP reachibility from Green namespace to Blue name space
```
ping 100.100.200.6 -c3
```

## *Relevent logs* ##

Check the namespaces


