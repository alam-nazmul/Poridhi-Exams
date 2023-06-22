## Creating Two network namespaces and connect them with their virtual ethernet 

In a Linux system, network namespaces provide segregated instances of the network stack, interfaces, and routing tables. Processes can function within their own independent network environment with network namespaces, ensuring isolation from processes in other namespaces.

Each network namespace has its own set of network interfaces, IP addresses, routing tables, and firewall rules. This enables processes within a namespace to have their own distinct network configuration, distinct from processes in other namespaces.

Using network namespaces, administrators can create isolated network environments for various programs or users, preventing interference or conflicts between them. It also facilitates the deployment of network virtualization and containerization technologies, where each container or virtual machine can operate in its own network namespace, assuring network isolation and security.


## *Diagram* ##

![Screenshot from 2023-06-22 02-48-37](https://github.com/alam-nazmul/Poridhi-Exams/assets/103389594/0ae18d00-1751-4950-912b-774f256f2a66)


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


![Screenshot from 2023-06-22 21-43-41](https://github.com/alam-nazmul/Poridhi-Exams/assets/103389594/f7dc1817-4075-4c69-a58a-14a87fa81738)

Check the IP addresses on both namespaces


![Screenshot from 2023-06-22 21-44-09](https://github.com/alam-nazmul/Poridhi-Exams/assets/103389594/f065fda5-9d08-480c-89ad-f420631ca69e)


![Screenshot from 2023-06-22 21-44-35](https://github.com/alam-nazmul/Poridhi-Exams/assets/103389594/3ec97036-8341-4e07-8743-3466e0d0fa5d)


Ping response check


![Screenshot from 2023-06-22 21-45-01](https://github.com/alam-nazmul/Poridhi-Exams/assets/103389594/757d57ec-1853-4b3a-8dc9-c77e6877ecec)

