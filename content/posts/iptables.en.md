---
title: "Iptables"
date: 2023-07-09T17:34:05+02:00
draft: false
author: ["Adam"]
cover:
    image: img/iptables_filter.jpg
    alt: 'iptables rules'

tags: ["Tech","hosting",] 
categories: ["hosting","firewall"]
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "firewall rules"
# canonicalURL: "https://canonical.url/to/page"
disableHLJS: true # to disable highlightjs
disableShare: false
disableHLJS: false
hideSummary: false
searchHidden: true
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowWordCount: true
ShowRssButtonInSectionTermList: true
UseHugoToc: true

params:
    ShowShareButtons: true
---

## What is iptables?

`iptables` is a tool used in Linux-based operating systems for configuring firewall rules. It allows filtering and forwarding of network packets based on various criteria such as IP addresses, ports, and protocols. It can be used for both protecting against network attacks and managing network traffic within the system.

## Useful rules

1. `iptables -A INPUT -p tcp --dport 80 -j ACCEPT`: This command adds a rule to the `filter` table that accepts incoming TCP packets on port 80.
2. `iptables -A INPUT -s 192.168.0.0/24 -j DROP`: This command adds a rule to the `filter` table that drops incoming packets from IP addresses in the range 192.168.0.0/24.
3. `iptables -A FORWARD -i eth0 -o eth1 -p icmp -j ACCEPT`: This command adds a rule to the `filter` table that accepts ICMP packets passing through the `eth0` interface and exiting through the `eth1` interface.

Where:
- `-A` indicates adding the rule to the end of the chain (the table and chain must already exist),
- `-p` specifies the protocol,
- `--dport` indicates the destination port,
- `-s` specifies the source IP address or IP address range,
- `-j` indicates the action to be taken for matching packets (e.g., `ACCEPT` - accept, `DROP` - drop).

Of course, there are many other options and combinations that can be used in `iptables` to customize filtering rules according to specific needs.

### It's just the tip of the iceberg, so it's best to refer to the documentation available [here](https://linux.die.net/man/8/iptables).