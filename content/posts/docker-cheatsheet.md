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
docker rm --force $(docker ps -a -q)
```

## Zarządzanie obrazami
Usuń obraz:
```
docker rmi <IMAGE ID>
```

Usuń wszystkie dostępne obrazy:
```
docker rmi --force $(docker images -q)
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
Ich lokalizacja na hoście to:
```bash
tail -f /var/lib/docker/containers/<container id>/<container id>-json.log
```

## Docker Compose
Uruchom plik docker-compose.yaml w trybie detached (tło):
```
docker-compose up -d
```
## Kopiowanie z hosta do kontenera:
**Kopiowanie pojedynczego pliku:**
```bash
docker cp [ścieżka_do_pliku_na_hostcie] [nazwa_lub_id_kontenera]:[ścieżka_w_kontenerze]
```
Przykład:
```bash
docker cp ./lokalny_plik.txt moj_kontener:/app/lokalny_plik.txt
```
**Kopiowanie całego folderu:**
```bash
docker cp [ścieżka_do_folderu_na_hostcie] [nazwa_lub_id_kontenera]:[ścieżka_w_kontenerze]
```
Przykład:
```bash
docker cp ./folder_na_hostcie moj_kontener:/app/
```
## Kopiowanie z kontenera do hosta:
**Kopiowanie pojedynczego pliku:**
```bash
docker cp [nazwa_lub_id_kontenera]:[ścieżka_w_kontenerze] [ścieżka_na_hostcie]
```
**Przykład:**
```bash
docker cp moj_kontener:/app/plik_w_kontenerze.txt ./plik_w_hostcie.txt
```
**Kopiowanie całego folderu (do folderu na hoście):**
```bash
docker cp [nazwa_lub_id_kontenera]:[ścieżka_w_kontenerze] [ścieżka_folderu_na_hostcie]
```
**Przykład:**
```bash
docker cp moj_kontener:/app/folder_w_kontenerze ./folder_na_hostcie/
```
## Sieci w Dockerze

![reverse-proxy](/img/blog/docker-network.png "Nextcloud reverse_proxy")


### Pobierz szczegóły portu dla kontenera:
```bash
docker container port <container-name>

# 80/tcp -> 0.0.0.0:80
# 80/tcp -> :::80
```
### Pobierz IP dla kontenera:
```bash
docker container inspect --format '{{ .NetworkSettings.IPAddress }}' webhost
```
### Pokaż wszystkie sieci:
```bash
docker network ls
```
### Zbadaj sieć:
```bash
docker network inspect <network-name>
```
### Utwórz wirtualną sieć:
```bash
docker network create <network-name>
```
Aby użyć customowego bridge, możemy skorzystać z opcji --driver.
### Podłącz sieć do kontenera:
```bash
docker network connect <network-name> <container-name>
```
### Odłącz sieć do kontenera:
```bash
docker network disconnect <network-name> <container-name>
```
### Podłącz się do sieci podczas uruchamiania kontenera:
```bash
docker container run -d --name <container-name> --network <network-name> <image>
```
### Domyślne typy sieci:

- **Bridge** lub **Docker0** - domyślna wirtualna sieć mapowana na adres IP hosta. Pozwala kontenerom na komunikację między sobą, gdy działają na tym samym hoście Dockera.

- **host** - specjalna sieć, która przyłącza kontener bezpośrednio do hosta, pomijając wirtualną sieć.

- **none** - W kontenerze dostępny jest tylko interfejs localhost.

Przy użyciu sieci w Dockerze możemy **zapewnić**, że:

**powiązane** aplikacje są w tej samej **sieci** Dockera,
ich komunikacja odbywa się **tylko** w ramach wirtualnej sieci,
ruch może być przekierowywany z hosta do kontenera tylko wtedy, gdy **publikujemy** kontener za pomocą opcji **--publish** lub **-p**.
### DNS
Kontenery mogą komunikować się ze sobą w tej samej wirtualnej sieci za pomocą nazw hostów.

Docker domyślnie przypisuje nazwę hosta na podstawie nazwy kontenera. Niemniej jednak, możemy również używać aliasów.

Aby dostarczyć kontenerom aliasy sieciowe, możemy postępować w następujący sposób:
```bash
docker container run --rm --network <nazwa-sieci> --network-alias <alias-sieciowy-kontenera> <obraz>
```
Dzięki temu kontenery w tej samej wirtualnej sieci mogą ze sobą komunikować się za pomocą aliasów.

Flaga --rm sprawia, że kontener zostanie trwale usunięty po zakończeniu działania.