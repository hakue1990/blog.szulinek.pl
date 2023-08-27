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

Pod koniec poradnika podzielę się kilkoma wskazówkami dla użytkowników chmury Linux w celu zmniejszenia wysiłku przy wdrażaniu Nextcloud.
Wymagania wstępne

Zanim przejdziemy dalej, musisz się upewnić, że pewne rzeczy są załatwione. Oto czego potrzebujesz:

- Serwer Linux 
- Zainstalowany Docker wraz z  Docker Compose 
- Zarejestrowana domena


## Wdrażanie serwera Nextcloud z Dockerem na reverse proxy

Zobaczmy kroki jeden po drugim.

### Krok 1: Skonfiguruj reverse proxy

Dzięki reverse proxy możesz wdrożyć wiele usług sieciowych na tym samym serwerze.jest to koniczeczne bo potrzebujesz kontenera **Let's Encrypt** do obsługi **SSL**.

Istnieją dwie metody konfiguracji odwróconego proxy Nginx.



Wdrożenie odwróconego proxy powinno być przeprowadzone za pomocą oddzielnego pliku Compose, abyś mógł uruchamiać lub aktualizować usługi sieciowe bez zakłócania konfiguracji odwróconego proxy.

Już przygotowałem pliki Compose w naszym publicznym repozytorium GitHub. Ponieważ nie jest to szczegółowy artykuł o wdrożeniu odwróconego proxy, nie będę zagłębiał się w szczegóły pliku Compose.

Możesz użyć gita aby pobrać repo:

git clone https://github.com/hakue1990/reverse-proxy-docker && \
	cd reverse-proxy-docker

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


Nareszcie, wdrożenie **kontenerów**

```
docker-compose up -d
```
Po pomyślnym wdrożeniu, przy próbie odwiedzenia adresu IP serwera, na którym znajduje się nasze reverse proxy zoabczysz poniższy komuniktat.

![reverse-proxy](/img/blog/503-nextcloud-reverse-proxy.webp "Nextcloud reverse_proxy")

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

Jeśli używasz tego tutorialu w przyszłości i istnieje nowsza wersja Nextcloud i MariaDB - użyj ich.

Możesz albo sklonować  repozytorium GitHub, albo po prostu pobrać niezbędne pliki.

```bash
git clone https://github.com/hakue1990/nextcloud-docker-compose.git && \
cd nextcloud-docker
```
następnie zmień skopiuj plik env.example i zmień jego nazwę na .env - ustaw w nim zmienne środowiskowe.
```bash
cp env.example .env
```
#### 1. NCDatabase
Usługa NCDatabase wygląda następująco:
```bash
NCDatabase:
	image: "mariadb:10.5.9"

	volumes:
		- "NCMariaDB:/var/lib/mysql"

	environment:
		- MYSQL_ROOT_PASSWORD
		- MYSQL_RANDOM_ROOT_PASSWORD
		- MYSQL_DATABASE
		- MYSQL_USER
		- MYSQL_PASSWORD

	restart: "on-failure"
	networks: ["common"]
```
obraz **"mariadb:10.5.9"**
- image: **mariadb:10.5.9** 
- **NCMariaDB:/var/lib/mysql** - dla trwałych danych używam volumenu NCMariaDB który jest zbindowany z /var/lib/mysql gdzie MariaDB przechowuje swoje dane
- environment - zmienne środowiskowe zapisane w pliku .env
- **restart: "on-failure"** -  kontener zostanie automatycznie ponownie uruchomiony w przypadku, gdy jego proces główny zakończy się niepowodzeniem.
- **networks: ["common"]** - jest to sieć pomiędzy kontenerem bazy a usługą frontendową - służy to zapewnieniu możliwości komunikacji między tymi kontenerami.
#### 2. NCFrontend
```bash
NCFrontend:
	image: "nextcloud:21.0.0"

	volumes: 
	  - "NCData:/var/www/html"

	environment:
		- LETSENCRYPT_HOST
		- VIRTUAL_HOST
		- TRUSTED_PROXIES
		- OVERWRITEPROTOCOL
		- MYSQL_DATABASE
		- MYSQL_USER
		- MYSQL_PASSWORD
		- MYSQL_HOST
		- SMTP_HOST
		- SMTP_PORT
		- SMTP_NAME
		- SMTP_PASSWORD
		- MAIL_FROM_ADDRESS
		- NEXTCLOUD_TRUSTED_DOMAINS
		- NEXTCLOUD_ADMIN_USER
		- NEXTCLOUD_ADMIN_PASSWORD

	depends_on:
		- "NCDatabase"
	networks: ["net", "common"]
```
- Używany obraz to **nextcloud:21.0.0**.
- **NCData:/var/www/html** Aby zapewnić bezpieczeństwo danych i uniknąć ich utraty w przypadku niefortunnego zdarzenia prostego restartu.kontenera, dane muszą być przechowywane trwale w woluminie **NCData** i mapowane do /var/www/html wewnątrz kontenera.
- **networks: ["net", "common"]** - dwie sieci net, która jest też częścią reverse-proxy. common jest dla komunikacji bazy i nextclouda.

**zmienne środowiskowe:**

Otwórz plik .env (ten sam, który użyłeś dla MariaDB) w swoim ulubionym edytorze tekstu i zacznij zmieniać wartości zgodnie z poniższym:

**LETSENCRYPT_HOST**, **VIRTUAL_HOST** i **NEXTCLOUD_TRUSTED_DOMAINS**: Ustaw je na domenę/subdomenę, na której chcesz hostować swoją instancję Nextcloud.

**TRUSTED_PROXIES**: Podsieć sieci, wspólna dla odwrotnej proxy i tego frontu. Możesz uzyskać podsieć za pomocą poniższego polecenia (upewnij się, że zainstalowano jq):
```bash
docker inspect -f '{{ json .IPAM.Config }}' net | jq -r .[].Subnet
```

**OVERWRITEPROTOCOL**: Parametr overwriteprotocol służy do ustawienia protokołu proxy. Ponieważ korzystamy z HTTPS, ustaw to na HTTPS.

### Wolumeny

W tej sieci mam zdefiniowane dwa woluminy wewnętrzne: NCMariaDB dla MariaDB oraz NCData dla Nextcloud. Czy chcesz je zachować jako wewnętrzne czy zewnętrzne, zależy od Ciebie.

```bash
volumes:
  NCMariaDB:
    external: true
  NCData:
    external: true
```
Następnie utwórz wolumeny:
```bash
for volume in NCMariaDB NCData; do
  docker volume create ${volume}
done
```
### Sieci

zdefiniowane są dwie sieci. Jedna jest dla front-endu i odwrotnej proxy, a druga jest dla front-endu i backendu, aby mogły się komunikować.

Kontener bazy danych i front-end Nextcloud mają wspólną sieć o nazwie "common", służy to do umożliwienia tym dwóm kontenerom komunikowania się ze sobą. Możesz uczynić to wewnętrznym, co ograniczy dostęp kontenera bazy danych do publicznego internetu, ale nie jestem pewien, jakie korzyści mogą wyniknąć z tego.

Mimo to, jeśli chcesz to zrobić, powinno to wyglądać tak:

```bash
networks:
	net:
	    external: true
	common:
		internal: true
```
### Deploy Nextclouda
```bash
docker-compose up -d
```

Jeśli wszystko poszło zgodnie z planem **zobaczysz:**
![reverse-proxy](/img/blog/nc.png "Nextcloud reverse_proxy")

Czyli swoją aplikację **NextCloud** w kontenerze Docker.
