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


# Deploying a Hugo Application with GitHub Actions

GitHub Actions is a powerful tool for automating processes in GitHub repositories. In this article, we will discuss how to deploy a Hugo-based website using GitHub Actions.

## Configuring GitHub Actions

1. Create a file named `.github/workflows/deploy.yml` in your repository.

2. Add the following configuration to the `deploy.yml` file:

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

## Adding Variables in GitHub Repository

To add variables like `secrets.SSH_PORT` to your GitHub repository:

1. Go to the settings of your repository on GitHub.

2. In the "Secrets" section, you can add new variables. For example, to add `SSH_PORT`:

   - Click on "New repository secret."
   - Give it the name `SSH_PORT`.
   - Enter the appropriate SSH port value.

   You can do the same for other secrets like `SSH_KEY`, `KNOWN_HOSTS`, `SSH_TARGET`, and `SSH_PATH`, which are used in the deployment script.

Now, after each code push to the `master` branch, GitHub Actions will automatically trigger the deployment process of your Hugo-based website to the target server using the provided secrets.