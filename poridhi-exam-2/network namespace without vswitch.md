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

## *Relevent logs* ##

Check the namespaces

![image](https://github.com/alam-nazmul/Poridhi-Exams/assets/103389594/07a9f698-1dec-4c92-8846-5cc2a82bd9cc)

IP addresses for root, green and blue namespaces

![image](https://github.com/alam-nazmul/Poridhi-Exams/assets/103389594/9b197748-41b0-40a9-a5e4-9d42bb695fdb)

![image](https://github.com/alam-nazmul/Poridhi-Exams/assets/103389594/9258b5a5-f62e-4634-8efd-531d1b36bfac)

![image](https://github.com/alam-nazmul/Poridhi-Exams/assets/103389594/2415ef1b-ce0d-4163-a0f8-94b778581eed)

Ping response between two namespaces
![image](https://github.com/alam-nazmul/Poridhi-Exams/assets/103389594/cde6e261-2e64-49b8-b112-cdd30cf79b2c)
