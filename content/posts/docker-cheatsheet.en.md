---
title: "Docker Cheatsheet"
date: 2023-07-21T07:14:12+02:00
draft: true
author: ["Adam"]
cover:
    image: img/blog/docker.webp
    alt: 'docker'

tags: ["docker","web","cheatsheet"] 
categories: ["docker","web","cheatsheet"] 
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "little About Docker Containers"
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

## What is Docker?

Docker is a way to **containerize applications** (placing code in boxes that can operate independently). It magically creates a virtual computer, but in reality, **these are not virtual machines**.

**Containers** are boxes that **do not have a host operating system**, so they are **independent** of the device they run on.

Benefits:

- **Isolation**: Each container operates in a separate environment.
- **Portability**: Containers are independent of the environment.
- **Scalability**: Easy addition and removal of containers based on the workload.
- **Speed**: Quick start and stop of containers thanks to the operating system kernel mechanisms.


## Docker Images
Show available images locally:
```
docker images
```

## Docker Containers
Show active containers (returns container IDs):
```
docker ps
```

Show all containers (both active and inactive):
```
docker ps -a
```

## Managing Containers
Start an image (create a container from it):
```
docker start <IMAGE>
```

Stop a container:
```
docker stop <CONTAINER ID>
```

Stop all running containers:
```
docker kill $(docker ps -q)
```

Remove a container:
```
docker rm <CONTAINER ID>
```

Remove all containers (both running and stopped):
```
docker rm --force $(docker ps -a -q)
```

## Managing Images
Remove an image:
```
docker rmi <IMAGE ID>
```

Remove all available images:
```
docker rmi --force $(docker images -q)
```

## Pulling Images
Pull the Nginx image in version 1.31:
```
docker pull nginx:1.31
```

## Running Containers
Run Nginx interactively (logs to terminal):
```
docker run nginx:1.31
```

Run Nginx in the background (detached mode):
```
docker run -d nginx:1.31
```

Run an image from Docker Hub if not found locally:
```
docker run nginx:1.22-alpine
```

Run Nginx on port 80 in the background and forward it to localhost port 9000:
```
docker run -d -p 9000:80 nginx:latest
```
Now, Nginx is accessible on port 9000.

## Container Logs
Display container logs:
```
docker logs <CONTAINER ID>
```

## Docker Compose
Run the docker-compose.yaml file in detached mode:
```
docker-compose up -d
```

