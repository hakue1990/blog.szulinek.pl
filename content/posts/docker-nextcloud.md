---
title: "Docker Nextcloud"
date: 2023-08-07T17:41:15+02:00
draft: false
cover:
    image: img/blog/nc.jpg
    alt: 'nextcloud'

tags: ["nextcloud","web","toturial"] 
categories: ["nextcloud","web","toturial"] 
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "czyli własna chmura"
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

Nextcloud to doskonałe rozwiązanie jako samodzielnie hostowana alternatywa dla **Google Drive** lub **Dropbox**.

Nie zamierzam ci mówić, dlaczego powinieneś używać Nextcloud. Zamiast tego, pokażę ci, jak zainstalować serwer Nextcloud za pomocą kontenerów Dockerowych.

Poradnik wykorzystuje konfigurację reverse proxy Nginx, dzięki której możesz wdrożyć swoją instancję **Nextcloud z SSL**. W ten sposób adres URL Twojego wdrożenia Nextcloud będzie używał protokołu HTTPS, a transfer plików będzie odbywał się w sposób bezpieczny.

Pod koniec poradnika podzielę się kilkoma wskazówkami dla użytkowników chmury Linode w celu zmniejszenia wysiłku przy wdrażaniu Nextcloud.
Wymagania wstępne

Zanim przejdziemy dalej, musisz się upewnić, że pewne rzeczy są załatwione. Oto czego potrzebujesz:

- Serwer Linux 
- Zainstalowany Docker wraz z  Docker Compose 
- Zarejestrowana domena


## Wdrażanie serwera Nextcloud z Dockerem na reverse proxy

Zobaczmy kroki jeden po drugim.

### Krok 1: Skonfiguruj odwrócone proxy

Dzięki reverse proxy możesz wdrożyć wiele usług sieciowych na tym samym serwerze.jest to koniczeczne bo potrzebujesz kontenera **Let's Encrypt** do obsługi **SSL**.

Istnieją dwie metody konfiguracji odwróconego proxy Nginx.



Wdrożenie odwróconego proxy powinno być przeprowadzone za pomocą oddzielnego pliku Compose, abyś mógł uruchamiać lub aktualizować usługi sieciowe bez zakłócania konfiguracji odwróconego proxy.

Już przygotowałem pliki Compose w naszym publicznym repozytorium GitHub. Ponieważ nie jest to szczegółowy artykuł o wdrożeniu odwróconego proxy, nie będę zagłębiał się w szczegóły pliku Compose.

Możesz użyć gita lub wget, aby pobrać pliki. Jeśli używasz gita, sklonuj całe repozytorium:

git clone https://github.com/linuxhandbook/tutorial-snippets && \
	cd tutorial-snippets/Reverse_Proxy

W przeciwnym razie po prostu pobierz niezbędne pliki:


Są tutaj trzy pliki:

- **env.example:** nazwij go .env i zmień  DEFAULT_EMAIL na swój adres **e-mail**.
- **max_upload_size.conf:** Ten plik zapewnia, że ​​możesz przesyłać pliki o wielkości nawet 1 GB (domyślnie 2 MB).
- **docker-compose.yaml:** Największy z nich wszystkich. Omówiony krótko w następnym akapicie.

Utwórz sieć **Docker** o nazwie **net**. Będzie ona używana w pliku **docker-compose.yaml**.

```
docker network create net
```

Plik docker-compose wygląda **następująco:**
```
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
```


Nareszcie, wdrożdeplot kontenerów

```
docker-compose up -d
```
Po pomyślnym wdrożeniu, przy próbie odwiedzenia adresu IP serwera, na którym znajduje się nasze reverse proxy zoabczysz poniższy komuniktat.

![Alt text of image](/img/blog/503-nextcloud-reverse-proxy.webp "Image title")

Jest **okej** - nie wdrożyliśmy jeszcze żadnych apliakcji webowych.

### Krok 2: Deploy NextCloud

dwie składowe to: jedna to baza danych, druga to samo Nextcloud, albo raczej nazwijmy go frontem.

Dla backendowej bazy danych, każda baza oparta na MySQL będzie działać.
 Wybieram MariaDB, zwłaszcza znacznik (wersję) obrazu 10.5.9.

Dla Nextcloud, użyję wersji 21.0.0, jest to najnowsza wersja w chwili pisania tego artykułu.

Dlatego obrazy używane to

```
mariadb:10.5.9
nextcloud:21.0.0
```

Jeśli używasz tego tutorialu w przyszłości i istnieje nowsza wersja Nextcloud i MariaDB,  użyj tych wersji.