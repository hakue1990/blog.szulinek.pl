---
title: "Traefik, Docker and SSL"
date: 2023-08-31T09:43:45+02:00
draft: true

cover:
    image: img/blog/traefik.png
    alt: 'docker'

tags: ["docker","traefik"] 
categories: ["docker","traefik"] 
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "Traefik reverse proxy"
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
---
## What is Traefik?

Traefik is an open-source, dynamic proxy server and load balancer often used as a tool to manage traffic in containerized environments like Docker. It enables automatic redirection of network traffic to different services based on configuration rules and supports multiple communication protocols including HTTP, TCP, and UDP.

### Docker Setup:

Start by creating the directory structure for Traefik:
```bash
mkdir traefik
cd traefik
mkdir data
cd data
touch acme.json
chmod 600 acme.json
touch config.yml
```

The directory structure should look like this:
```bash
./traefik
├── data
│   ├── acme.json
│   ├── config.yml
└── docker-compose.yml
```

The **traefik.yml** file will look like this:
```yaml
api:
  dashboard: true
  debug: true
entryPoints:
  http:
    address: ":80"
    http:
      redirections:
        entryPoint:
          to: https
          scheme: https
  https:
    address: ":443"
serversTransport:
  insecureSkipVerify: true
providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    exposedByDefault: false
  file:
    filename: /config.yml
certificatesResolvers:
  cloudflare:
    acme:
      email: you@example.com
      storage: acme.json
      dnsChallenge:
        provider: cloudflare
        resolvers:
          - "1.1.1.1:53"
          - "1.0.0.1:53"
```

Next, create the **network** Traefik will use, let's name it "proxy":
```bash
docker network create proxy
```

The **docker-compose.yml** file will look like this:
```yaml
version: '3'

services:
  traefik:
    image: traefik:latest
    container_name: traefik
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true
    networks:
      - proxy
    ports:
      - 80:80
      - 443:443
    environment:
      - CF_API_EMAIL=user@example.com
      - CF_DNS_API_TOKEN=YOUR_API_TOKEN
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /home/username/traefik/data/traefik.yml:/traefik.yml:ro
      - /home/username/traefik/data/acme.json:/acme.json
      - /home/username/traefik/data/config.yml:/config.yml:ro
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.traefik.entrypoints=http"
      - "traefik.http.routers.traefik.rule=Host(`traefik-dashboard.local.example.com`)"
      - "traefik.http.middlewares.traefik-auth.basicauth.users=USER:BASIC_AUTH_PASSWORD"
      - "traefik.http.middlewares.traefik-https-redirect.redirectscheme.scheme=https"
      - "traefik.http.middlewares.sslheader.headers.customrequestheaders.X-Forwarded-Proto=https"
      - "traefik.http.routers.traefik.middlewares=traefik-https-redirect"
      - "traefik.http.routers.traefik-secure.entrypoints=https"
      - "traefik.http.routers.traefik-secure.rule=Host(`traefik-dashboard.local.example.com`)"
      - "traefik.http.routers.traefik-secure.middlewares=traefik-auth"
      - "traefik.http.routers.traefik-secure.tls=true"
      - "traefik.http.routers.traefik-secure.tls.certresolver=cloudflare"
      - "traefik.http.routers.traefik-secure.tls.domains[0].main=local.example.com"
      - "traefik.http.routers.traefik-secure.tls.domains[0].sans=*.local.example.com"
      - "traefik.http.routers.traefik-secure.service=api@internal"

networks:
  proxy:
    external: true
```

Then, in the **data** directory, create the **config.yml** file.

### Basic Auth Password:
```bash
sudo apt update
sudo apt install apache2-utils
```

### Generate the password:
```bash
echo $(htpasswd -nb "<USER>" "<PASSWORD>") | sed -e s/\\$/\\$\\$/g
```