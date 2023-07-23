---
title: "Docker Cheatsheet"
date: 2023-07-21T07:14:12+02:00
draft: true
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

## Co to jest Docker?

Docker to sposób na **konteneryzację aplikacji** (umieszczanie kodu w boksach, które mogą działać samodzielnie). W magiczny sposób tworzy on komputer wirtualny, ale tak naprawdę **nie są to komputery wirtualne**.

**Kontenery** to boksy, które **nie mają systemu operacyjnego hosta**, więc są **niezależne** od urządzenia, na którym działają.

Korzyści:

- **Izolacja**: Każdy kontener działa w odseparowanym środowisku.
- **Przenośność**: Kontenery są niezależne od środowiska.
- **Skalowalność**: Łatwe dodawanie i usuwanie kontenerów w zależności od obciążenia.
- **Szybkość**: Szybkie uruchamianie i zatrzymywanie kontenerów dzięki mechanizmom jądra systemu operacyjnego.


## Obrazy 
Pokaż, jakie obrazy są dostępne lokalnie:
```
docker images
```

## Kontenery
Pokaż, jakie kontenery są aktywne (zwraca ID kontenera):
```
docker ps
```

Pokaż wszystkie kontenery (zarówno aktywne, jak i nieaktywne):
```
docker ps -a
```

## Zarządzanie kontenerami
Odpal obraz (stwórz z niego kontener):
```
docker start <IMAGE>
```

Zatrzymaj kontener:
```
docker stop <CONTAINER ID>
```

Zatrzymaj wszystkie uruchomione kontenery:
```
docker kill $(docker ps -q)
```

Usuń kontener:
```
docker rm <CONTAINER ID>
```

Usuń wszystkie kontenery (zarówno aktywne, jak i nieaktywne):
```
docker rm $(docker ps -a -q)
```

## Zarządzanie obrazami
Usuń obraz:
```
docker rmi <IMAGE ID>
```

Usuń wszystkie dostępne obrazy:
```
docker rmi $(docker images -q)
```

## Pobieranie obrazu
Pobierz obraz nginix w wersji 1.31:
```
docker pull nginx:1.31
```

## Uruchamianie kontenera
Odpal nginixa w trybie logowania do terminala:
```
docker run nginx:1.31
```

Odpal nginxa w tle (detached mode):
```
docker run -d nginx:1.31
```

Odpal obraz z Docker Hub, jeśli nie zostanie znaleziony lokalnie:
```
docker run nginx:1.22-alpine
```

Uruchom nginx na porcie 80 w tle i przekieruj port 9000 na localhost:
```
docker run -d -p 9000:80 nginx:latest
```
Teraz nginx jest dostępny na porcie 9000.

## Logi kontenera
Odpali logi kontenera:
```
docker logs <CONTAINER ID>
```

## Docker Compose
Uruchom plik docker-compose.yaml w trybie detached (tło):
```
docker-compose up -d
```

