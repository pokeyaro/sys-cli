# sys-cli

Use this scaffolding to quickly and easily configure your system, like setting up networking, hostnames, etc.

### Installation

```bash
$ sudo npm i -g @sys-cli/core
```

### Directory tree after installation

```bash
.
├── bin                               # Command env path
│   └── sys-cli -> ../lib/node_modules/@sys-cli/core/bin/sys-cli.js
└── lib                               # Scaffolding internal link library
    └── node_modules
        └── @sys-cli
            └── core
                ├── LICENSE
                ├── README.md
                ├── bin
                ├── lib
                ├── node_modules
                └── package.json
```

### Usage

- main command

```bash
[root@localhost ~]# sys-cli -h
Usage: sys-cli <command> [options]

Options:
  -V, --version        output the version number
  -d, --debug          whether to enable debug mode (default: false)
  -h, --help           display help for command

Commands:
  netconfig [options]  linux system network interface configuration
  osconfig [options]   linux system basic configuration
  help [command]       display help for command
```

- subcommand

```bash
[root@localhost ~]# sys-cli sysconfig -h
Usage: sys-cli netconfig [options]

linux system network interface configuration

Options:
  -c, --cidr <ip/mask>     classless inter-domain routing
  -g, --gateway <gateway>  gateway address
  -i, --ipaddr <ipaddr>    ipv4 address
  -m, --netmask <netmask>  subnet mask
  -n, --ifname <ifname>    nic device interface name
  -y, --yes                whether to skip the interaction (default: false)
  -h, --help               display help for command

[root@localhost ~]# sys-cli osconfig -h
Usage: sys-cli osconfig [options]

linux system basic configuration

Options:
  -f, --force                whether to force update configuration (default: false)
  -n, --hostname <hostname>  system hostname
  -h, --help                 display help for command
```

### Example

- interactive command

```bash
[root@localhost ~]# sys-cli netconfig
? Please enter the nic device number ens192    10GbE    🙆🏻
? Please enter IP address 10.95.0.52
? Please enter Netmask 255.255.255.240
? Please enter Gateway 10.95.0.49
⠹ 🛰  Press y to continue...
⠧ 🚀 Start setting up local network services...
sys-cli success 🎉 Network setup successful ~
```

- non-interactive command

```bash
# set network
[root@localhost ~]# sys-cli netconfig -n eth0 -i 192.168.0.100 -m 255.255.255.0 -g 192.168.0.254 -y
sys-cli success 🎉 Network setup successful ~

# cidr options
[root@localhost ~]# sys-cli netconfig --ifname ens192 --cidr 10.0.128.5/24 --gateway 10.0.128.1 -y
sys-cli success 🎉 Network setup successful ~

# set hostname
[root@localhost ~]# sys-cli osconfig -n my-dev-server -f
sys-cli success 🎉 The hostname is set successfully ~
```
