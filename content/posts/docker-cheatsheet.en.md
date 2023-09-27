---
title: "Docker Cheatsheet"
date: 2023-07-21T07:14:12+02:00
draft: true
author: ["Adam"]
cover:
    image: img/post-images/docker-post.png
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
Their location on the host is:
```bash
tail -f /var/lib/docker/containers/<container id>/<container id>-json.log
```
## Docker Compose
Run the docker-compose.yaml file in detached mode:
```
docker-compose up -d
```
## Copying from Host to Container:
**Copying a Single File:**
```bash
docker cp [path_to_file_on_host] [container_name_or_id]:[path_in_container]
```
Example:
```bash
docker cp ./local_file.txt my_container:/app/local_file.txt
```
**Copying an Entire Folder:**
```bash
docker cp [path_to_folder_on_host] [container_name_or_id]:[path_in_container]
```
Example:
```bash
docker cp ./folder_on_host my_container:/app/
```

## Copying from Container to Host:
**Copying a Single File:**
```bash
docker cp [container_name_or_id]:[path_in_container] [path_on_host]
```
Example:
```bash
docker cp my_container:/app/file_in_container.txt ./file_on_host.txt
```
**Copying an Entire Folder (to a folder on the host):**
```bash
docker cp [container_name_or_id]:[path_in_container] [folder_path_on_host]
```
Example:
```bash
docker cp my_container:/app/folder_in_container ./folder_on_host/
```
## Docker Networks

![reverse-proxy](/img/blog/docker-network.png "Nextcloud reverse_proxy")

### Get port details for a container:
```bash
docker container port <container-name>

# 80/tcp -> 0.0.0.0:80
# 80/tcp -> :::80
```

### Get IP address for a container:
```bash
docker container inspect --format '{{ .NetworkSettings.IPAddress }}' webhost
```

### Show all networks:
```bash
docker network ls
```

### Inspect a network:
```bash
docker network inspect <network-name>
```

### Create a virtual network:
```bash
docker network create <network-name>
```

To use a custom bridge, we can use the `--driver` option.

### Attach a network to a container:
```bash
docker network connect <network-name> <container-name>
```

### Detach a network from a container:
```bash
docker network disconnect <network-name> <container-name>
```

### Connect to a network while running a container:
```bash
docker container run -d --name <container-name> --network <network-name> <image>
```

### Default Network Types:

- **Bridge** or **Docker0** - the default virtual network mapped to the host IP. It allows containers to communicate with each other when running on the same Docker host.

- **Host** - a special network that attaches the container directly to the host by skipping the virtual network.

- **None** - Only the localhost interface is available in the container.

By using Docker networks, we can **ensure** that:

- **related** apps are on the same Docker **network**,
- their **inter-communication** is restricted to the virtual network,
- traffic can be forwarded from host to container only if we **publish** the container with the `--publish` or `-p` option.

### DNS

Containers can communicate with other containers in the same virtual network using hostnames.

Docker defaults the hostname to the container's name. However, we can also use aliases.

To provide network aliases for containers, we can do the following:

```bash
docker container run --rm --network <network-name> --network-alias <container-network-alias> <image>
```

With this approach, containers in the same virtual network can communicate with each other using aliases.

The `--rm` flag ensures that the container is permanently deleted upon exit.

