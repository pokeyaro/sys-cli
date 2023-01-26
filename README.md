# sys-cli

> You can quickly set the network address and host name of the linux host through this scaffolding.

### Directory tree

- Sys-cli scaffolding built with lerna multi-package management tool.

```text
.
├── LICENSE
├── README.md
├── lerna.json
├── package.json
└── packages
    ├── command             // dependent package
    ├── core                // main package
    ├── netconfig           // dependent package
    ├── osconfig            // dependent package
    └── utils               // dependent package
```

### Installation

- It is recommended to install globally to avoid problems such as the `$PATH` environment variable.

```shell
$ sudo npm i -g @sys-cli/core
```

### API

[specific usage](https://www.npmjs.com/package/@sys-cli/core)

```bash
➜ which sys-cli
/usr/local/bin/sys-cli

➜ sys-cli -h
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

- set static network configuration (ip/netmask/gateway) and reload network service

```bash
# interactive
➜ sys-cli netconfig

# non-interactive
➜ sys-cli netconfig -n <ifname> -i <ipaddr> -m <netmask> -g <gateway> -y

# non-interactive
➜ sys-cli netconfig --ifname <ifname> --cidr <cidr> --gateway <gateway> -y
```

- set hostname and update the hosts local resolution entry

```bash
# non-interactive
➜ sys-cli osconfig -n <hostname> -f
```

### Hint

- Only applicable to GNU/Linux system, currently adapted distributions, such as: CentOS7, Debian11, RHEL7.5, OpenSUSE12.3, etc.
