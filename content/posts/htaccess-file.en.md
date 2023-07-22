---
title: ".htaccess file"
date: 2023-06-27T20:39:16+02:00
draft: false
author: ["Adam"]
cover:
    image: img/apache-web-server-logo.webp
    alt: 'this is an alt!'

tags: ["Tech","www","server",".htaccess"] 
categories: ["hosting","Tech","apache2"]
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "Plik .htaccess"
# canonicalURL: "https://canonical.url/to/page"
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

## What is the .htaccess file?

The .htaccess file is nothing more than a configuration file used by the Apache server to define and modify website behaviors. It can contain rules for redirections, authentication, access blocking, and other instructions related to website management. The .htaccess file is located in the main website directory or in specific subdirectories and is used to make changes to the server configuration without accessing the main configuration file.

## Here are a few useful .htaccess rules:

### 1. **Rewriterule**:
Allows rewriting of URLs for a more readable and user-friendly format. It can be used to create simplified URLs or redirect traffic to other pages.

Example of a `RewriteRule` rule could be redirecting a simplified URL to a target file or page. For example:

```markdown
RewriteEngine On
RewriteRule ^products/(\d+)$ product.php?id=$1 [L]
```

The above rule rewrites the URL `example.com/products/123` to `example.com/product.php?id=123`, where `123` is the product ID.

### 2. **Redirect**:
Used to redirect users from one URL to another. Useful when a page has been moved or its structure has changed.

Example of a `Redirect` rule could be redirecting from one URL to another. For example:

```markdown
Redirect 301 /old-page.html /new-page.html
```

The above rule redirects any request for `example.com/old-page.html` to `example.com/new-page.html` with a 301 response code, indicating a permanent redirect.

### 3. **Deny/Allow**:
Allows blocking or granting access to specific directories or files on the server. Restrictions can be set for specific IP addresses or IP ranges.

Example of `Deny` and `Allow` rules could be blocking access to a specific directory based on an IP address. For example:

```markdown
Deny from 192.168.0.1
Allow from all
```

The above rules block access to the directory for users with the IP address `192.168.0.1`, but allow access for all other users.

### 4. **Expires/Header**:
Enables setting expiration dates for specific file types on the server, facilitating better browser cache management. Headers such as Cache-Control or Last-Modified can be set.

Example of `ExpiresByType` and `Header` rules could be setting the expiration date for CSS files to 7 days. For example:

```markdown
ExpiresByType text/css "access plus 7 days"
Header set Cache-Control "public"
```

The above rules set the expiration date for CSS files to 7 days from the time of retrieval and set the `Cache-Control` header to "public", allowing caching in the browser's cache.

### 5. **AuthType/AuthName/Require**:
Used to create security measures for directories or pages using HTTP authentication. Users and passwords can be created, which will be required for access.

Example of `AuthType`, `AuthName`, and `Require` rules could be creating a protected directory requiring authentication. For example:

```markdown
AuthType Basic
AuthName "Restricted Area"
AuthUserFile /path/to/.htpasswd
Require valid-user
```

The above rules require authentication for accessing a specific directory. Users must enter valid authentication credentials, which are stored in the `.htpasswd` file.

### 6. **ErrorDocument**:
Allows customization of error pages displayed when the server encounters a problem, such as a 404 error (page not found). Users can be redirected to another page or a custom error message can be displayed.

Example of an `ErrorDocument` rule could be customizing the 404 error page (page not found). For example:

```markdown
ErrorDocument 404 /error-pages/404.html
```

The above rule redirects users to the `example.com/error-pages/404.html` page when they encounter a 404 error.

These are just a few examples of .htaccess rules. It's important to understand that .htaccess is an Apache server configuration file that allows customization of server behavior. .htaccess rules can be powerful, and it's recommended to familiarize yourself with the Apache documentation before applying them.
