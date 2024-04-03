---
title: "Nginx proxy and webserver"
date: 2024-04-02T21:30:35+02:00
draft: false
cover:
    image: img/post-images/nginxx.png
    alt: 'nginx'

tags: ["nginx","webserver"] 
categories: ["nginx","webserver"] 
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "Nginix webserver"
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
## Introduction:

### This tutorial will cover:

- *Basic Concepts:* Understanding the difference between directive and context, inheritance model, and the order in which nginx selects server blocks and locations.


We've crafted a series where you can easily find the appropriate configuration for a specific topic (such as gzip, SSL, etc.), or simply read through everything. For the best experience, we recommend setting up nginx on your own Linux virtual machine and experimenting with it yourself.

## What is Nginx?

Nginx is a versatile web server known for its exceptional speed. Besides serving web content, it functions as a reverse proxy server and proxy, facilitating smooth integration with slower upstream servers like Unicorn or Puma. Nginx allows traffic distribution through load balancing, supports media streaming, dynamic image resizing, content caching, and much more. Its architecture consists of a master process overseeing worker processes responsible for handling requests, ensuring efficient operation.

## Basic Commands:

To start nginx, simply type:

```
[sudo] nginx
```

Once your nginx server is running, you can manage it by sending signals:

```
[sudo] nginx -s signal
```

Available signals:

- ```stop:``` quick shutdown
- ```quit:``` graceful shutdown (waits for workers to finish processing)
- ```reload:``` reload configuration file
- ```reopen:``` reopen log files

## Directive and Context

By default, the nginx configuration file is located at:

```/etc/nginx/nginx.conf```, 

```/usr/local/etc/nginx/nginx.conf```, 

or ```/usr/local/nginx/conf/nginx.conf```

This file consists of:

- directive: an option consisting of a name and parameters; should end with a semicolon

```gzip on;```
- context: a section where you can declare directives (similar to scope in programming languages)

```bash

worker_processes 2; # directive in global context

http {              # http context
    gzip on;        # directive in http context

  server {          # server context
    listen 80;      # directive in server context
  }
}
```

## Types of Directives

You need to be careful when using the same directive in multiple contexts because the inheritance model differs for different directives. There are 3 types of directives, each with its own inheritance model.

### Normal

It has one value per context. Additionally, it can be defined only once within a context. Child contexts can override the parent directive, but this override will only be significant within that particular child context.

```bash
gzip on;
gzip off; # having 2 normal directives in the same context is illegal

server {
  location /downloads {
    gzip off;
  }

  location /assets {
    # gzip is here
  }
}
```
### Array

Adding multiple directives within the same context will add values instead of completely overriding them. Defining a directive within a child context will override ALL parent values within that child context.

```nginx
error_log /var/log/nginx/error.log;
error_log /var/log/nginx/error_notice.log notice;
error_log /var/log/nginx/error_debug.log debug;

server {
  location /downloads {
    # this will override all parent directives
    error_log /var/log/nginx/error_downloads.log;
  }
}
```

### Action Directive

Action directives are directives that change something. Their inheritance behavior will depend on the module.

For instance, in the case of the rewrite directive, every matching directive will be executed:

```nginx
server {
  rewrite ^ /foobar;

  location /foobar {
    rewrite ^ /foo;
    rewrite ^ /bar;
  }
}
```

If a user tries to retrieve /anything:

- The server rewrite will be executed, redirecting from /anything to /foobar
- The /foobar location will match
- The first location rewrite will be executed, redirecting from /foobar to /foo
- The second location rewrite will be executed, redirecting from /foo to /bar

This is different behavior from what the return directive provides:

```nginx
server {
  location / {
    return 200;
    return 404;
  }
}
```
In the above case, a ```200``` status will be immediately returned.

## Handling Requests

Inside nginx, you can define multiple virtual servers, each described by the ```server { }``` context.

```nginx
server {
  listen      *:80 default_server;
  server_name szulinek.pl;

  return 200 "Welcome from szulinek.pl";
}

server {
  listen      *:80;
  server_name foo.co;

  return 200 "Welcome from foo.co";
}

server {
  listen      *:81;
  server_name bar.co;

  return 200 "Welcome from bar.co";
}
```

This allows nginx to specify how to handle incoming requests. Nginx first checks the listen directive to determine which virtual server is listening on a given IP:port combination. Then it checks the value from the server_name directive against the Host header, which holds the server's domain name.

Nginx selects the virtual server in the following order:

- Server listening on IP:port, with a matching server_name directive;
- Server listening on IP:port, with the default_server flag;
- Server listening on IP:port, first defined;
- If no matches are found, reject the connection.

In the above example, this means:

```nginx
Request for foo.co:80     => "Welcome from foo.co"
Request for www.foo.co:80 => "Welcome from szulinek.pl"
Request for bar.co:80     => "Welcome from szulinek.pl"
Request for bar.co:81     => "Welcome from bar.co"
Request for foo.co:81     => "Welcome from bar.co"
```

### server_name Directive

The ```server_name``` directive accepts multiple values. It also supports matching using wildcards and regular expressions.

```nginx
server_name szulinek.pl www.szulinek.pl; # exact match
server_name *.szulinek.pl;              # wildcard match
server_name szulinek.*;                 # wildcard match
server_name  ~^[0-9]*\.szulinek\.pl$;   # regular expression match
```

In case of ambiguity, nginx follows this order:

 1.   Exact name;
 2.   Longest wildcard name starting with an asterisk, e.g., “*.example.org”;
 3.   Longest wildcard name ending with an asterisk, e.g., “mail.*”;
 4. First regular expression match (in the order they appear in the configuration file).

Nginx maintains 3 hash tables: exact names, wildcard names starting with an asterisk, and wildcard names ending with an asterisk. If the result is not found in any of these tables, regular expressions will be tested sequentially.

It's worth noting that

```nginx
server_name .szulinek.pl;
```

is a shorthand for:

```nginx
server_name  szulinek.pl  www.szulinek.pl  *.szulinek.pl;
```

With one difference: ```.szulinek.pl``` is stored in the second table, which means it's slightly slower than explicitly declared.

### listen Directive

In most cases, you'll notice that the ```listen``` directive accepts IP:port values.

```nginx
listen 127.0.0.1:80;
listen

 127.0.0.1;    # defaults to port :80

listen *:81;
listen 81;           # defaults to all IP addresses

listen [::]:80;      # IPv6 addresses
listen [::1];        # IPv6 addresses
```

However, you can also specify UNIX domain sockets:

```nginx
listen unix:/var/run/nginx.sock;
```

You can even use hostnames:

```nginx
listen localhost:80;
listen szulinek.pl:80;
```

However, use this cautiously because the hostname might not resolve during nginx startup, causing nginx to fail to bind to the specified TCP socket.

Finally, if the directive is absent, ```*:80``` is used.

## Minimal Configuration

With all this knowledge, we should be able to create and understand the minimal configuration needed to run nginx.

```nginx
# /etc/nginx/nginx.conf

events {}                   # defining the event context is necessary for the configuration to be considered valid

http {
 server {
    listen 80;
    server_name  szulinek.pl  www.szulinek.pl  *.szulinek.pl;

    return 200 "Welcome";
  }
}
```

## root, location, and try_files Directives

### root Directive

The root directive sets the main directory for requests, allowing nginx to map incoming requests to the filesystem.

```nginx
server {
  listen 80;
  server_name szulinek.pl;
  root /var/www/szulinek.pl;
}
```

This enables nginx to serve server content according to the request:

```nginx
szulinek.pl:80/index.html     # serves /var/www/szulinek.plm/index.html
szulinek.pl:80/foo/index.html # serves /var/www/szulinek.plm/foo/index.html
```



### location Directive

The ```location``` directive sets configuration based on the requested URI.

```location [modifier] path```

```nginx
location /foo {
  # ...
}
```

When no modifier is specified, the path is treated as a prefix, after which anything can follow. The above example will match:

```nginx
/foo
/fooo
/foo123
/foo/bar/index.html
...
```
Moreover, multiple ```location``` directives can be used within the same context:

```nginx
server {
  listen 80;
  server_name szulinek.pl;
  root /var/www/szulinek.pl;

  location / {
    return 200 "root";
  }

  location /foo {
    return 200 "foo";
  }
}
```
```nginx
szulinek.pl:80   /       # => "root"
szulinek.pl:80   /foo    # => "foo"
szulinek.pl:80   /foo123 # => "foo"
szulinek.pl:80   /bar    # => "root"
```
Nginx also provides several modifiers that can be used in conjunction with ```location```. These modifiers affect which location block will be used, as each modifier has an associated order.

```nginx
=           - Exact match
^~          - Preferential match
~ && ~*     - Regular expression match
no modifier - Prefix match
```
Nginx first checks for any exact matches. If none are found, it checks preferential matches. If that match also fails, regex matches are tested in the order they appear. If everything else fails, the last resort is a prefix match.

```nginx
location /match {
  return 200 'Prefix match: matches anything starting with /match';
}

location ~* /match[0-9] {
  return 200 'Case-sensitive regex match';
}

location ~ /MATCH[0-9] {
  return 200 'Case-insensitive regex match';
}

location ^~ /match0 {
  return 200 'Preferential match';
}

location = /match {
  return 200 'Exact match';
}
```
```nginx
/match     # => 'Exact match'
/match0    # => 'Preferential match'
/match1    # => 'Case-sensitive regex match'
/MATCH1    # => 'Case-insensitive regex match'
/match-abc # => 'Prefix match: matches anything starting with /match'

```

### try_files Directive

This directive will attempt different paths and return the one that's found.
```nginx
try_files $uri index.html =404;
```
So for ```/foo.html```, it will try to return files in the following order:


1.   $uri ( /foo.html );
2.   index.html;
3.   If none are found: 404.