---
title: "Deploy hugo app && github actions"
date: 2023-09-28T19:13:12+02:00
draft: true
author: ["Adam"]
cover:
    image: img/post-images/github-actions-hugo-app-deploy.png
    alt: 'hugo'

tags: ["github","hugo"] 
categories: ["github","hugo"] 
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "hugo app deploy && github actions"
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


# Deploy aplikacji Hugo za pomocą GitHub Actions

GitHub Actions to potężne narzędzie do automatyzacji procesów w repozytoriach GitHub. W poniższym artykule omówimy, jak wdrożyć stronę internetową opartą na Hugo, korzystając z GitHub Actions.

## Konfiguracja GitHub Actions

1. Stwórz plik `.github/workflows/deploy.yml` w swoim repozytorium.

2. Dodaj poniższą konfigurację do pliku `deploy.yml`:

```yaml
name: Deploy website

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Get files
        uses: actions/checkout@v3
        with: 
          submodules: true
          fetch-depth: 0

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: '0.101.0'
          extended: true

      - name: Build
        run: hugo 

      - name: Install SSH key
        uses: shimataro/ssh-key-action@v2
        with: 
          key: ${{ secrets.SSH_KEY }}
          known_hosts: ${{ secrets.KNOWN_HOSTS }}

      - name: Deploy
        run: rsync -avhe "ssh -p ${{ secrets.SSH_PORT }}" --rsync-path="sudo rsync" ./public/ ${{ secrets.SSH_TARGET }}:${{ secrets.SSH_PATH }} --delete
```

## Dodawanie Zmiennych w Repozytorium GitHub

Aby dodać zmienne, takie jak `secrets.SSH_PORT`, do swojego repozytorium GitHub:

1. Wejdź do ustawień swojego repozytorium na GitHub.

2. W sekcji "Secrets" (Tajemnice) możesz dodać nowe zmienne. Na przykład, aby dodać `SSH_PORT`:

   - Kliknij "New repository secret" (Nowa tajemnica repozytorium).
   - Nadaj jej nazwę `SSH_PORT`.
   - Wprowadź odpowiednią wartość portu SSH.

   Możesz zrobić to samo dla innych tajemnic, takich jak `SSH_KEY`, `KNOWN_HOSTS`, `SSH_TARGET`, i `SSH_PATH`, które są używane w skrypcie do wdrażania.

Teraz, po każdym przesłaniu kodu na gałąź `master`, GitHub Actions automatycznie uruchomi proces wdrażania Twojej strony Hugo na serwerze docelowym przy użyciu podanych tajemnic.