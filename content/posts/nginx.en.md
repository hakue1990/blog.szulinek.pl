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
### This tutorial will have three parts:

- *Basics concepts:* get to know the difference between directive and context, the inheritance model, and the order in which nginx picks server blocks and locations.
- *Performance:* tips and tricks on improving speed. We will discuss gzip, caching, buffers, and timeouts.
- *SSL setup:* set up the configuration to serve content over HTTPS.

We aimed to create a series in which you can easily find the proper configuration for a particular topic (like gzip, SSL, etc.), or simply read it all through. For the best learning experience, we suggest you set nginx up on your own Linux VM and fiddle with it yourself.

## What is Nginx?

Nginx  is a versatile web server known for its exceptional speed. Beyond serving web content, it functions as a reverse proxy, facilitating seamless integration with slower upstream servers such as Unicorn or Puma. Nginx enables traffic distribution through load balancing, supports media streaming, dynamic image resizing, content caching, and more. Its architecture comprises a master process overseeing worker processes responsible for handling requests, thus ensuring efficient operation.

## Basic Commands:



To start nginx, simply type:

```
[sudo] nginx
```

While your nginx instance is running, you can manage it by sending signals:

```
[sudo] nginx -s signal
```

Available signals:

- ```stop:``` fast shutdown
- ```quit:``` graceful shutdown (wait for workers to finish their processes)
- ```reload:``` reload the configuration file
- ```reopen:``` reopen the log files

## Directive and Context

By default, the nginx configuration file can be found in:

```/etc/nginx/nginx.conf```,

```/usr/local/etc/nginx/nginx.conf```, 

or ```/usr/local/nginx/conf/nginx.conf```

This file consists of:

- directive: the option that consists of name and parameters; it should end with a semicolon

```gzip on;```
- context: the section where you can declare directives (similar to scope in programming languages)

```bash

worker_processes 2; # directive in global context

http {              # http context
    gzip on;        # directive in http context

  server {          # server context
    listen 80;      # directive in server context
  }
}
```

## Directive types

You have to pay attention when using the same directive in multiple contexts, as the inheritance model differs for different directives. There are 3 types of directives, each with its own inheritance model.

### Normal

Has one value per context. Also, it can be defined only once in the context. Subcontexts can override the parent directive, but this override will be valid only in a given subcontext.

```bash
gzip on;
gzip off; # illegal to have 2 normal directives in same context

server {
  location /downloads {
    gzip off;
  }

  location /assets {
    # gzip is in here
  }
}
```
### Array

Adding multiple directives in the same context will add to the values instead of overwriting them altogether. Defining a directive in a subcontext will override ALL parent values in the given subcontext.

```nginx
error_log /var/log/nginx/error.log;
error_log /var/log/nginx/error_notive.log notice;
error_log /var/log/nginx/error_debug.log debug;

server {
  location /downloads {
    # this will override all the parent directives
    error_log /var/log/nginx/error_downloads.log;
  }
}
```

### Action directive

Actions are directives that change things. Their inheritance behaviour will depend on the module.

For example, in the case of the rewrite directive, every matching directive will be executed:

```nginx
server {
  rewrite ^ /foobar;

  location /foobar {
    rewrite ^ /foo;
    rewrite ^ /bar;
  }
}
```

If the user tries to fetch /sample:

- a server rewrite is executed, rewriting from /sample, to /foobar
- the location /foobar is matched
- the first location rewrite is executed, rewriting from /foobar, to /foo
- the second location rewrite is executed, rewriting from /foo, to /bar

This is a different behaviour than what the return directive provides:

```nginx
server {
  location / {
    return 200;
    return 404;
  }
}
```
In the case above, the ```200``` status is returned immediately.

## Processing requests

Inside nginx, you can specify multiple virtual servers, each described by a ```server { }``` context.

```nginx
server {
  listen      *:80 default_server;
  server_name szulinek.pl;

  return 200 "Hello from szulinek.pl";
}

server {
  listen      *:80;
  server_name foo.co;

  return 200 "Hello from foo.co";
}

server {
  listen      *:81;
  server_name bar.co;

  return 200 "Hello from bar.co";
}
```

This will give nginx some insight on how to handle incoming requests. Nginx will first check the listen directive to test which virtual server is listening on the given IP:port combination. Then, the value from server_name directive is tested against the Host header, which stores the domain name of the server.

Nginx will choose the virtual server in the following order:

- Server listing on IP:port, with a matching server_name directive;
- Server listing on IP:port, with the default_server flag;
- Server listing on IP:port, first one defined;
- If there are no matches, refuse the connection.

In the example above, this will mean:

```nginx
Request to foo.co:80     => "Hello from foo.co"
Request to www.foo.co:80 => "Hello from szulinek.pl"
Request to bar.co:80     => "Hello from szulinek.pl"
Request to bar.co:81     => "Hello from bar.co"
Request to foo.co:81     => "Hello from bar.co"
```
### The server_name directive

The ```server_name``` directive accepts multiple values. It also handles wildcard matching and regular expressions.

```nginx
server_name szulinek.pl www.szulinek.pl; # exact match
server_name *.szulinek.pl;              # wildcard matching
server_name netguru.*;                 # wildcard matching
server_name  ~^[0-9]*\.netguru\.co$;   # regexp matching
```

When there is ambiguity, nginx uses the following order:

 1.   Exact name;
 2.   Longest wildcard name starting with an asterisk, e.g. “*.example.org”;
 3.   Longest wildcard name ending with an asterisk, e.g. “mail.*”;
 4. First matching regular expression (in the order of appearance in the configuration file).

Nginx will store 3 hash tables: exact names, wildcards starting with an asterisk, and wildcards ending with an asterisk. If the result is not in any of the tables, the regular expressions will be tested sequentially.

It is worth keeping in mind that

```nginx
server_name .szulinek.pl;
```

is an abbreviation of:

```nginx
server_name  szulinek.pl  www.szulinek.pl  *.szulinek.pl;
```

With one difference: ```.szulinek.pl``` is stored in the second table, which means that it is a bit slower than an explicit declaration.

### listen directive

In most cases, you’ll find that the ```listen``` directive accepts IP:port values.

```nginx
listen 127.0.0.1:80;
listen 127.0.0.1;    # by default port :80 is used

listen *:81;
listen 81;           # by default all ips are used

listen [::]:80;      # IPv6 addresses
listen [::1];        # IPv6 addresses
```
However, it is also possible to specify UNIX-domain sockets:
```nginx
listen unix:/var/run/nginx.sock;
```
You can even use hostnames:
```nginx
listen localhost:80;
listen szulinek.pl:80;
```

This should be used with caution, as the hostname may not be resolved upon nginx's launch, causing nginx to be unable to bind on a given TCP socket.

Finally, if the directive is not present, ```*:80```, is used.

## Minimal configuration

With all that knowledge, we should be able to create and understand the minimal configuration needed to run nginx.

```nginx
# /etc/nginx/nginx.conf

events {}                   # event context needs to be defined to consider config valid

http {
 server {
    listen 80;
    server_name  szulinek.pl  www.szulinek.pl  *.szulinek.pl;

    return 200 "Hello";
  }
}
```

## root, location, and try_files directives

### root directive

The root directive sets the root directory for requests, allowing nginx to map the incoming request onto the file system.

```nginx
server {
  listen 80;
  server_name szulinek.pl;
  root /var/www/szulinek.pl;
}
```

Which allows nginx to return server content according to the request:

```nginx
szulinek.pl:80/index.html     # returns /var/www/szulinek.plm/index.html
szulinek.pl:80/foo/index.html # returns /var/www/szulinek.plm/foo/index.html
```

### location directive

The ```location``` directive sets the configuration depending on the requested URI.

```location [modifier] path```

```nginx
location /foo {
  # ...
}
```

When no modifier is specified, the path is treated as prefix, after which anything can follow. The above example will match:

```nginx
/foo
/fooo
/foo123
/foo/bar/index.html
...
```
Also, multiple ```location``` directives can be used in a given context:
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
Nginx also provides a few modifiers which can be used in conjunction with ```location```. These modifiers impact which location block will be used, as each modifier has assigned precedence.
```nginx
=           - Exact match
^~          - Preferential match
~ && ~*     - Regex match
no modifier - Prefix match
```
Nginx will first check for any exact matches. If it doesn't find any, it'll look for preferential ones. If this match also fails, regex matches will be tested in the order of their appearance. If everything else fails, the last prefix match will be used.

```nginx
location /match {
  return 200 'Prefix match: matches everything that starting with /match';
}

location ~* /match[0-9] {
  return 200 'Case insensitive regex match';
}

location ~ /MATCH[0-9] {
  return 200 'Case sensitive regex match';
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
/match1    # => 'Case insensitive regex match'
/MATCH1    # => 'Case sensitive regex match'
/match-abc # => 'Prefix match: matches everything that starting with /match'

```

### try_files directive

This directive will try different paths, returning whichever is found.
```nginx
try_files $uri index.html =404;
```
So for ```/foo.html``` , it will try to return files in the following order:


1.   $uri ( /foo.html );
2.   index.html;
3.   If none is found: 404.




