---
title: "Docker Nextcloud"
date: 2023-08-07T17:41:29+02:00
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
## What is Nextcloud?

Nextcloud is an excellent self-hosted alternative to **Google Drive** or **Dropbox**.

I'm not going to tell you why you should use Nextcloud. Instead, I'll show you how to install a Nextcloud server using Docker containers.

The tutorial utilizes an Nginx reverse proxy configuration that allows you to deploy your **Nextcloud instance with SSL**. This way, your Nextcloud deployment's URL will use the HTTPS protocol, ensuring secure file transfers.

Towards the end of the guide, I'll provide a few tips for Linode cloud users to make Nextcloud deployment easier.

Prerequisites

Before we proceed, make sure a few things are in place. Here's what you need:

- A Linux server
- Docker installed along with Docker Compose
- A registered domain

## Deploying Nextcloud Server with Docker on a Reverse Proxy

Let's go through the steps one by one.

### Step 1: Set Up the Reverse Proxy

With a reverse proxy, you can deploy multiple web services on the same server. This is necessary as you'll need a **Let's Encrypt** container to handle **SSL**.

There are two methods to configure an Nginx reverse proxy.

The deployment of the reverse proxy should be done using a separate Compose file, allowing you to run or update web services without disrupting the reverse proxy configuration.

I've already prepared the Compose files in our public GitHub repository. As this isn't an in-depth article on reverse proxy deployment, I won't delve into the Compose file details.

You can use Git or Wget to download the files. If you're using Git, clone the entire repository:

```shell
git clone https://github.com/linuxhandbook/tutorial-snippets && \
	cd tutorial-snippets/Reverse_Proxy
```

Otherwise, just download the necessary files:

Here are three files:

- **env.example:** Rename it to .env and change DEFAULT_EMAIL to your **email** address.
- **max_upload_size.conf:** This file ensures you can upload files up to 1 GB in size (default is 2 MB).
- **docker-compose.yaml:** The largest of them all. Briefly discussed in the next paragraph.

Create a Docker network named **net**. It will be used in the **docker-compose.yaml** file.

```shell
docker network create net
```

The docker-compose file looks like this:

```yaml
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

Finally, deploy the containers:

```shell
docker-compose up -d
```

Upon successful deployment, when you attempt to visit the server's IP address where your reverse proxy is located, you will see the following message:

![Alt text of image](/img/blog/503-nextcloud-reverse-proxy.webp "Image title")

That's okay – we haven't deployed any web applications yet.

### Step 2: Deploy NextCloud

There are two components here: one is the database, another is Nextcloud itself, or rather let's call it the frontend.

For the backend database, any MySQL-based database will work. I'm going with MariaDB, especially the image tag (or version) 10.5.9.

For Nextcloud, I'll use version 21.0.0, which is the latest version at the time of writing this article.

Therefore, the images used are:

```shell
mariadb:10.5.9
nextcloud:21.0.0
```

If you are using this tutorial in the future and there is a much newer version of Nextcloud and MariaDB, please use those versions.
