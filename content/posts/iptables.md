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
description: "reguły firewalla czyli iptables"
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

## Czym jest iptables ?

`iptables` to narzędzie używane w systemach operacyjnych opartych na jądrze Linux do konfiguracji reguł firewalla. Pozwala na filtrowanie i przekierowywanie pakietów sieciowych na podstawie różnych kryteriów, takich jak adresy IP, porty i protokoły. Może być stosowany zarówno do ochrony przed atakami sieciowymi, jak i do zarządzania ruchem sieciowym wewnątrz systemu.

## przydatne reguły


1. `iptables -A INPUT -p tcp --dport 80 -j ACCEPT`: Ta komenda dodaje regułę do tabeli `filter`, która akceptuje przychodzące pakiety TCP na porcie 80.
2. `iptables -A INPUT -s 192.168.0.0/24 -j DROP`: Ta komenda dodaje regułę do tabeli `filter`, która odrzuca pakiety przychodzące z adresów IP w zakresie 192.168.0.0/24.
3. `iptables -A FORWARD -i eth0 -o eth1 -p icmp -j ACCEPT`: Ta komenda dodaje regułę do tabeli `filter`, która akceptuje pakiety ICMP przechodzące przez interfejs `eth0` i wychodzące przez interfejs `eth1`.

gdzie:
- `-A` oznacza dodanie reguły na końcu łańcucha (tabela i łańcuch muszą być już utworzone),
- `-p` określa protokół,
- `--dport` wskazuje na docelowy port,
- `-s` określa źródłowy adres IP lub zakres adresów IP,
- `-j` wskazuje na akcję, która ma zostać wykonana dla pasujących pakietów (np. `ACCEPT` - akceptuj, `DROP` - odrzuć).

Naturalnie istnieje wiele innych opcji i kombinacji, które można stosować w `iptables`, aby dostosować zasady filtrowania do konkretnych potrzeb.

### Oczywiście jest to wierzchołek góry lodowej dla tego najlepiej posiłkować się dokumentacją - dostępną pod [tym linkiem](https://linux.die.net/man/8/iptables).
