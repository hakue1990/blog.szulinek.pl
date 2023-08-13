---
title: "Docker Nextcloud"
date: 2023-08-07T17:41:15+02:00
draft: false
cover:
    image: img/blog/nc.jpg
    alt: 'docker'

tags: ["docker","web","cheatsheet"] 
categories: ["docker","web","nextcloud"] 
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "Docker czyli o kontenerach"
canonicalURL: "https://canonical.url/to/page"
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

## Czym jest Nextcloud?

Nextcloud to doskonałe rozwiązanie jako samodzielnie hostowana alternatywa dla Google Drive lub Dropbox.

Nie zamierzam ci mówić, dlaczego powinieneś używać Nextcloud. Zamiast tego, pokażę ci, jak zainstalować serwer Nextcloud za pomocą kontenerów Dockerowych.

Nextcloud jest doskonałym rozwiązaniem jako samodzielna alternatywa dla Google Drive lub Dropbox, hostowana własnoręcznie.

Nie zamierzam Ci mówić, dlaczego powinieneś używać Nextcloud. Zamiast tego, pokażę Ci, jak zainstalować serwer Nextcloud przy użyciu kontenerów Docker.

Poradnik wykorzystuje konfigurację odwróconego proxy Nginx, dzięki której możesz wdrożyć swoją instancję Nextcloud z SSL. W ten sposób adres URL Twojego wdrożenia Nextcloud będzie używał protokołu HTTPS, a transfer plików będzie odbywał się w sposób bezpieczny.

Pod koniec poradnika podzielę się kilkoma wskazówkami dla użytkowników chmury Linode w celu zmniejszenia wysiłku przy wdrażaniu Nextcloud.
Wymagania wstępne

Zanim przejdziemy dalej, musisz się upewnić, że pewne rzeczy są załatwione. Oto czego potrzebujesz:

    Serwer Linux - fizyczny, maszyna wirtualna lub w chmurze.
    Zainstalowane Docker i Docker Compose na serwerze Linux. Jeśli potrzebujesz pomocy, postępuj zgodnie z przewodnikami instalacji Dockera na Ubuntu i CentOS. Podobnie możesz postępować według poradników instalacji docker-compose na Ubuntu i CentOS.
    Dobrze jest mieć pewną wiedzę na temat Dockera i Docker Compose.
    Nazwa domeny. To wdrożenie, podobnie jak wszystkie inne z Linux Handbook, odbywa się pod rzeczywistą nazwą domeny z HTTPS.
    Trochę doświadczenia z wierszem poleceń i komendami Linuxa, ponieważ jest w tym sporo ruchu.
    Dostęp do usługi SMTP, takiej jak Sendgrid. Będziesz potrzebować jej do wysyłania powiadomień e-mail, resetowania hasła itp.
    Czas i cierpliwość.

Wdrażanie serwera Nextcloud z Dockerem w odwróconym proxy

Zobaczmy kroki jeden po drugim.
Krok 1: Skonfiguruj odwrócone proxy

Dzięki odwróconemu proxy możesz wdrożyć wiele usług sieciowych na tym samym serwerze. To nie jest opcjonalne, ponieważ potrzebujesz kontenera Let's Encrypt do obsługi SSL.

Istnieją dwie metody konfiguracji odwróconego proxy Nginx.

Jeśli nie korzystasz z Linode, przejdź przez mój artykuł na temat konfiguracji nginx-reverse-proxy z Dockerem.

Jeśli korzystasz z Linode, polecam skorzystanie z naszego pliku StackScript reverse-proxy-jwilder, który ułatwi wdrożenie serwera z już skonfigurowanymi ustawieniami.

Wdrożenie odwróconego proxy powinno być przeprowadzone za pomocą oddzielnego pliku Compose, abyś mógł uruchamiać lub aktualizować usługi sieciowe bez zakłócania konfiguracji odwróconego proxy.

Już przygotowałem pliki Compose w naszym publicznym repozytorium GitHub. Ponieważ nie jest to szczegółowy artykuł o wdrożeniu odwróconego proxy, nie będę zagłębiał się w szczegóły pliku Compose.

Możesz użyć gita lub wget, aby pobrać pliki. Jeśli używasz gita, sklonuj całe repozytorium:

git clone https://github.com/linuxhandbook/tutorial-snippets && \
	cd tutorial-snippets/Reverse_Proxy

W przeciwnym razie po prostu pobierz niezbędne pliki:

mkdir -p ~/Reverse_Proxy && cd ~/Reverse_Proxy
for file in max_upload_size.conf env.example docker-compose.yaml; do
	wget https://raw.githubusercontent.com/linuxhandbook/tutorial-snippets/main/Reverse_Proxy/${file}
done

Są tutaj trzy pliki:

    env.example: Zmień nazwę na .env i zmień wartość DEFAULT_EMAIL na swój adres e-mail.
    max_upload_size.conf: Ten plik zapewnia, że ​​możesz przesyłać pliki o wielkości nawet 1 GB (domyślnie 2 MB).
    docker-compose.yaml: Największy z nich wszystkich. Omówiony krótko w następnym akapicie.

Utwórz sieć Docker o nazwie net. Będzie ona używana w pliku docker-compose.yaml.

docker network create net

Plik docker-compose wygląda następująco:
version: "3.3"

services:

    NginxProxy:
        image: "jwilder/nginx-proxy:latest"

        volumes:
            - "NPhtml:/usr/share/nginx/html"
            - "NPdhparam:/etc/nginx/dhparam"
            - "NPvhost:/etc/nginx/vhost.d"
            - "NPcerts:/etc/nginx/certs:ro"
            - "/var/run/docker.sock:/tmp/docker.sock:ro"
            - "./client_max_upload_size.conf:/etc/nginx/conf.d/client_max_upload_size.conf"

        labels:
            - "com.github.jrcs.letsencrypt_nginx_proxy_companion.nginx_proxy"
        restart: "on-failure"
        networks: ["net"]

        ports:
            - "80:80"
            - "443:443"

    LetsencryptCompanion:
        image: "jrcs/letsencrypt-nginx-proxy-companion:latest"

        volumes:
            - "LCacme:/etc/acme.sh"
            - "NPvhost:/etc/nginx/vhost.d"
            - "NPcerts:/etc/nginx/certs"
            - "NPhtml:/usr/share/nginx/html"
            - "/var/run/docker.sock:/var/run/docker.sock:ro"

        environment:
            - DEFAULT_EMAIL

        depends_on: ["NginxProxy"]
        restart: "on-failure"
        networks: ["net"]


volumes:
    NPhtml:
    NPdhparam:
    NPvhost:
    NPcerts:
    LCacme:

networks:
    net:
        external: true

Nginx-reverse-proxy-docker-compose hosted with ❤ by GitHub

Wreszcie, wdroż kontenery

docker-compose up -d

Po pomyślnym wdrożeniu, przy próbie odwiedzenia adresu IP serwera, na którym znajdu