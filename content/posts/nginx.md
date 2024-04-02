---
title: "Nginx"
date: 2024-04-02T21:30:35+02:00
draft: true
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
description: "Nginx proxy and webserver"
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
## Wprowadzenie:
### Ten samouczek będzie miał trzy części:

- *Podstawowe pojęcia:* poznanie różnicy między dyrektywą a kontekstem, model dziedziczenia i kolejność, w jakiej nginx wybiera bloki serwera i lokalizacje.
- *Wydajność:* wskazówki i sztuczki dotyczące poprawy szybkości. Omówimy kompresję gzip, buforowanie, pamięć podręczną i limity czasu.
- *Konfiguracja SSL:* skonfiguruj ustawienia, aby serwować treści za pomocą protokołu HTTPS.

Stworzyliśmy serię, w której łatwo znajdziesz odpowiednią konfigurację dla konkretnego tematu (takiego jak gzip, SSL, itp.), lub po prostu przeczytasz wszystko. Dla najlepszego doświadczenia zalecamy skonfigurowanie nginx na własnej maszynie wirtualnej Linux i pobawienie się nim samodzielnie.

## Czym jest Nginx?

Nginx to wszechstronny serwer WWW znany ze swojej wyjątkowej szybkości. Oprócz serwowania treści internetowych, działa jako serwer proxy odwrotny, ułatwiając płynną integrację z wolniejszymi serwerami upstream, takimi jak Unicorn lub Puma. Nginx umożliwia dystrybucję ruchu poprzez równoważenie obciążenia, obsługuje strumieniowanie mediów, dynamiczne zmienianie rozmiaru obrazów, buforowanie treści i wiele więcej. Jego architektura składa się z procesu głównego nadzorującego procesy robocze odpowiedzialne za obsługę żądań, co zapewnia efektywną pracę.

## Podstawowe polecenia:

Aby uruchomić nginx, wystarczy wpisać:

```
[sudo] nginx
```

Gdy twój serwer nginx działa, możesz go zarządzać, wysyłając sygnały:

```
[sudo] nginx -s sygnał
```

Dostępne sygnały:

- ```stop:``` szybkie zatrzymanie
- ```quit:``` grzeczne zatrzymanie (czeka na zakończenie pracy pracowników)
- ```reload:``` ponowne wczytanie pliku konfiguracyjnego
- ```reopen:``` ponowne otwarcie plików dziennika

## Dyrektywa i Kontekst

Domyślnie plik konfiguracyjny nginx znajduje się pod:

```/etc/nginx/nginx.conf```, 

```/usr/local/etc/nginx/nginx.conf```, 

lub ```/usr/local/nginx/conf/nginx.conf```

Ten plik składa się z:

- dyrektywa: opcja składająca się z nazwy i parametrów; powinna kończyć się średnikiem

```gzip on;```
- kontekst: sekcja, w której można deklarować dyrektywy (podobnie jak w zakresie w językach programowania)

```bash

worker_processes 2; # dyrektywa w kontekście globalnym

http {              # kontekst http
    gzip on;        # dyrektywa w kontekście http

  server {          # kontekst serwera
    listen 80;      # dyrektywa w kontekście serwera
  }
}
```

## Rodzaje dyrektyw

Musisz uważać, gdy używasz tej samej dyrektywy w wielu kontekstach, ponieważ model dziedziczenia różni się dla różnych dyrektyw. Istnieją 3 rodzaje dyrektyw, z których każdy ma swój własny model dziedziczenia.

### Normalne

Ma jedną wartość na kontekst. Ponadto może być zdefiniowane tylko raz w kontekście. Podkonteksty mogą zastępować dyrektywę rodzica, ale to zastąpienie będzie ważne tylko w danym podkontekście.

```bash
gzip on;
gzip off; # nielegalne jest posiadanie 2 normalnych dyrektyw w tym samym kontekście

server {
  location /downloads {
    gzip off;
  }

  location /assets {
    # gzip jest tutaj
  }
}
```
### Tablica

Dodanie wielu dyrektyw w tym samym kontekście spowoduje dodanie wartości, zamiast całkowicie je nadpisywać. Zdefiniowanie dyrektywy w podkontekście spowoduje zastąpienie WSZYSTKICH wartości rodzica w danym podkontekście.

```nginx
error_log /var/log/nginx/error.log;
error_log /var/log/nginx/error_notice.log notice;
error_log /var/log/nginx/error_debug.log debug;

server {
  location /downloads {
    # to zastąpi wszystkie dyrektywy nadrzędne
    error_log /var/log/nginx/error_downloads.log;
  }
}
```

### Dyrektywa akcji

Działania to dyrektywy, które coś zmieniają. Ich zachowanie dziedziczenia będzie zależało od modułu.

Na przykład, w przypadku dyrektywy rewrite, każda pasująca dyrektywa zostanie wykonana:

```nginx
server {
  rewrite ^ /foobar;

  location /foobar {
    rewrite ^ /foo;
    rewrite ^ /bar;
  }
}
```

Jeśli użytkownik spróbuje pobrać /przykład:

- wykonana zostanie przekierowanie serwera, przekierowując z /przykład, na /foobar
- dopasowana zostanie lokalizacja /foobar
- wykonane zostanie pierwsze przekierowanie lokalizacji, przekierowując z /foobar, na /foo
- wykonane zostanie drugie przekierowanie lokalizacji, przekierowując z /foo, na /bar

Jest to inne zachowanie niż to, które zapewnia dyrektywa return:

```nginx
server {
  location / {
    return 200;
    return 404;
  }
}
```
W powyższym przypadku natychmiast zwrócony zostanie status ```200```.

## Obsługa żądań

Wew

nątrz nginx możesz określić wiele serwerów wirtualnych, każdy opisany przez kontekst ```server { }```.

```nginx
server {
  listen      *:80 default_server;
  server_name szulinek.pl;

  return 200 "Witaj z szulinek.pl";
}

server {
  listen      *:80;
  server_name foo.co;

  return 200 "Witaj z foo.co";
}

server {
  listen      *:81;
  server_name bar.co;

  return 200 "Witaj z bar.co";
}
```

To pozwoli nginxowi na określenie, jak obsługiwać przychodzące żądania. Nginx najpierw sprawdzi dyrektywę listen, aby sprawdzić, który wirtualny serwer nasłuchuje na danej kombinacji IP:port. Następnie wartość z dyrektywy server_name zostanie sprawdzona w stosunku do nagłówka Host, który przechowuje nazwę domeny serwera.

Nginx wybierze wirtualny serwer w następującej kolejności:

- Serwer słuchający na IP:port, z pasującą dyrektywą server_name;
- Serwer słuchający na IP:port, z flagą default_server;
- Serwer słuchający na IP:port, pierwszy zdefiniowany;
- Jeśli nie ma dopasowań, odrzuć połączenie.

W powyższym przykładzie oznacza to:

```nginx
Żądanie dla foo.co:80     => "Witaj z foo.co"
Żądanie dla www.foo.co:80 => "Witaj z szulinek.pl"
Żądanie dla bar.co:80     => "Witaj z szulinek.pl"
Żądanie dla bar.co:81     => "Witaj z bar.co"
Żądanie dla foo.co:81     => "Witaj z bar.co"
```
### Dyrektywa server_name

Dyrektywa ```server_name``` akceptuje wiele wartości. Obsługuje również dopasowanie za pomocą symboli wieloznacznych i wyrażeń regularnych.

```nginx
server_name szulinek.pl www.szulinek.pl; # dokładne dopasowanie
server_name *.szulinek.pl;              # dopasowanie za pomocą symboli wieloznacznych
server_name netguru.*;                 # dopasowanie za pomocą symboli wieloznacznych
server_name  ~^[0-9]*\.netguru\.co$;   # dopasowanie za pomocą wyrażeń regularnych
```

W przypadku niejednoznaczności nginx stosuje następującą kolejność:

 1.   Dokładna nazwa;
 2.   Najdłuższa nazwa symboliczna rozpoczynająca się od gwiazdki, np. “*.przykład.org”;
 3.   Najdłuższa nazwa symboliczna kończąca się gwiazdką, np. “poczta.*”;
 4. Pierwsze dopasowanie wyrażenia regularnego (w kolejności pojawienia się w pliku konfiguracyjnym).

Nginx przechowuje 3 tabele haszowe: dokładne nazwy, symbole wieloznaczne rozpoczynające się od gwiazdki oraz symbole wieloznaczne kończące się gwiazdką. Jeśli wynik nie znajduje się w żadnej z tabel, wyrażenia regularne będą testowane sekwencyjnie.

Warto pamiętać, że

```nginx
server_name .szulinek.pl;
```

jest skrótem od:

```nginx
server_name  szulinek.pl  www.szulinek.pl  *.szulinek.pl;
```

Z jedną różnicą: ```.szulinek.pl``` jest przechowywane w drugiej tabeli, co oznacza, że jest nieco wolniejsze niż jawnie zadeklarowane.

### Dyrektywa listen

W większości przypadków zauważysz, że dyrektywa ```listen``` akceptuje wartości IP:port.

```nginx
listen 127.0.0.1:80;
listen 127.0.0.1;    # domyślnie używany jest port :80

listen *:81;
listen 81;           # domyślnie używane są wszystkie adresy IP

listen [::]:80;      # adresy IPv6
listen [::1];        # adresy IPv6
```
Jednak można również określić gniazda domeny UNIX:
```nginx
listen unix:/var/run/nginx.sock;
```
Można nawet używać nazw hostów:
```nginx
listen localhost:80;
listen szulinek.pl:80;
```

Należy jednak używać tego ostrożnie, ponieważ nazwa hosta może nie zostać rozwiązana podczas uruchamiania nginx, co powoduje, że nginx nie będzie mógł zbindować na określonym gnieździe TCP.

Wreszcie, jeśli dyrektywa nie jest obecna, używane jest ```*:80```.

## Minimalna konfiguracja

Z całej tej wiedzy powinniśmy być w stanie stworzyć i zrozumieć minimalną konfigurację potrzebną do uruchomienia nginx.

```nginx
# /etc/nginx/nginx.conf

events {}                   # konieczne jest zdefiniowanie kontekstu event, aby konfiguracja była uznawana za ważną

http {
 server {
    listen 80;
    server_name  szulinek.pl  www.szulinek.pl  *.szulinek.pl;

    return 200 "Witaj";
  }
}
```

## Dyrektywa root, location i try_files

### Dyrektywa root

Dyrektywa root ustawia główny katalog dla żądań, pozwalając nginxowi odwzorować przychodzące żądanie na systemie plików.

```nginx
server {
  listen 80;
  server_name szulinek.pl;
  root /var/www/szulinek.pl;
}
```

Co pozwala nginxowi zwracać treść serwera zgodnie z żądaniem:

```nginx
szulinek.pl:80/index.html     # zwraca /var/www/szulinek.plm/index.html
szulinek.pl:80/foo/index.html # zwraca /var/www/szulinek.plm/foo/index.html
```



### Dyrektywa location

Dyrektywa ```location``` ustawia konfigurację w zależności od żądanego URI.

```location [modifier] path```

```nginx
location /foo {
  # ...
}
```

Gdy nie jest określony żaden modyfikator, ścieżka jest traktowana jako prefiks, po którym może nastąpić cokolwiek. Powyższy przykład będzie pasował do:

```nginx
/foo
/fooo
/foo123
/foo/bar/index.html
...
```
Ponadto w danym kontekście można użyć wielu dyrektyw ```location```:
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
Nginx udostępnia również kilka modyfikatorów, które można używać w połączeniu z ```location```. Te modyfikatory wpływają na to, który blok location zostanie użyty, ponieważ każdy modyfikator ma przypisaną kolejność.

```nginx
=           - Dokładne dopasowanie
^~          - Preferencyjne dopasowanie
~ && ~*     - Dopasowanie za pomocą wyrażeń regularnych
bez modyfikatora - Prefiksowe dopasowanie
```
Nginx najpierw sprawdzi, czy są jakiekolwiek dokładne dopasowania. Jeśli nie znajdzie żadnego, sprawdzi preferencyjne. Jeśli to dopasowanie również zawiedzie, testowane będą dopasowania regex w kolejności ich pojawienia się. Jeśli wszystko inne zawiedzie, zostanie użyte ostatnie dopasowanie prefiksowe.

```nginx
location /match {
  return 200 'Prefiksowe dopasowanie: pasuje do wszystkiego, co zaczyna się od /match';
}

location ~* /match[0-9] {
  return 200 'Wrażliwe na wielkość liter dopasowanie za pomocą wyrażeń regularnych';
}

location ~ /MATCH[0-9] {
  return 200 'Dopasowanie wrażliwe na wielkość liter za pomocą wyrażeń regularnych';
}

location ^~ /match0 {
  return 200 'Preferencyjne dopasowanie';
}

location = /match {
  return 200 'Dokładne dopasowanie';
}
```
```nginx
/match     # => 'Dokładne dopasowanie'
/match0    # => 'Preferencyjne dopasowanie'
/match1    # => 'Wrażliwe na wielkość liter dopasowanie za pomocą wyrażeń regularnych'
/MATCH1    # => 'Dopasowanie wrażliwe na wielkość liter za pomocą wyrażeń regularnych'
/match-abc # => 'Prefiksowe dopasowanie: pasuje do wszystkiego, co zaczyna się od /match'

```

### Dyrektywa try_files

Ta dyrektywa spróbuje różnych ścieżek i zwróci tę, która zostanie znaleziona.
```nginx
try_files $uri index.html =404;
```
Tak więc dla ```/foo.html```, spróbuje zwrócić pliki w następującej kolejności:


1.   $uri ( /foo.html );
2.   index.html;
3.   Jeśli żaden nie zostanie znaleziony: 404.
