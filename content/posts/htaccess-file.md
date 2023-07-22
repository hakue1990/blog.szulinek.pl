---
title: "plik .htaccess"
date: 2023-06-27T20:39:16+02:00
draft: false
cover:
    image: img/apache-web-server-logo.webp
    alt: 'this is an alt!'

tags: ["Tech","www","hosting",".htaccess"] 
categories: ["hosting","Tech","apache2"]
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "Przydatne reguły pliku .htaccess"
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

## Czym jest plik .htaccess ?

 to nic innego jak plik konfiguracyjny używany przez serwer Apache do definiowania i modyfikowania zachowań witryny. Może zawierać reguły przekierowań, uwierzytelniania, blokowania dostępu oraz inne instrukcje dotyczące zarządzania witryną. Plik .htaccess znajduje się w głównym katalogu witryny lub w poszczególnych podkatalogach i jest używany do wprowadzania zmian w konfiguracji serwera bez potrzeby dostępu do głównego pliku konfiguracyjnego.

##  Oto kilka przydatnych reguł .htaccess:

### 1. **Rewriterule**: 
Pozwala na przepisywanie adresów URL w celu bardziej czytelnego i przyjaznego dla użytkownika formatu. Można używać go do tworzenia uproszczonych adresów URL lub przekierowywania ruchu na inne strony.

Przykładem reguły `RewriteRule` może być przekierowanie uproszczonego adresu URL na docelowy plik lub stronę. Na przykład:

   ```markdown
   RewriteEngine On
   RewriteRule ^products/(\d+)$ product.php?id=$1 [L]
   ```

   Powyższa reguła przepisuje adres URL `example.com/products/123` na `example.com/product.php?id=123`, gdzie `123` to identyfikator produktu.

### 2. **Redirect**: 
Służy do przekierowania użytkowników z jednego adresu URL na inny. Przydatne, gdy strona została przeniesiona lub zmieniła swoją strukturę.

Przykładem reguły `Redirect` może być przekierowanie z jednego adresu URL na inny. Na przykład:

   ```markdown
   Redirect 301 /old-page.html /new-page.html
   ```

   Powyższa reguła przekierowuje każde żądanie dla `example.com/old-page.html` na `example.com/new-page.html` z kodem odpowiedzi 301, wskazującym na trwałe przekierowanie.

### 3. **Deny/Allow**: 
Pozwala na blokowanie lub zezwalanie na dostęp do konkretnych katalogów lub plików na serwerze. Można ustawić ograniczenia dla określonych adresów IP lub zakresów IP.

Przykładem reguł `Deny` i `Allow` może być blokada dostępu do określonego katalogu na podstawie adresu IP. Na przykład:

   ```markdown
   Deny from 192.168.0.1
   Allow from all
   ```

   Powyższe reguły blokują dostęp do katalogu dla użytkowników z adresu IP `192.168.0.1`, ale pozwalają na dostęp dla wszystkich innych użytkowników.

### 4. **Expires/Header**: 
Pozwala na ustawienie daty wygaśnięcia dla określonych typów plików na serwerze, co pozwala na lepsze zarządzanie pamięcią podręczną przeglądarki. Można ustawić nagłówki, takie jak Cache-Control czy Last-Modified.

Przykładem reguły `ExpiresByType` i `Header` może być ustawienie daty wygaśnięcia dla plików typu `text/css` na 7 dni. Na przykład:

   ```markdown
   ExpiresByType text/css "access plus 7 days"
   Header set Cache-Control "public"
   ```

   Powyższe reguły ustawiają datę wygaśnięcia dla plików CSS na 7 dni od momentu pobrania i ustawiają nagłówek `Cache-Control` na "public", zezwalając na przechowywanie w pamięci podręcznej przeglądarki.

### 5. **AuthType/AuthName/Require**: 
Służą do tworzenia zabezpieczeń dla katalogów lub stron za pomocą uwierzytelniania HTTP. Można tworzyć użytkowników i hasła, które będą wymagane do dostępu.

Przykładem reguł `AuthType`, `AuthName` i `Require` może być tworzenie zabezpieczonego katalogu wymagającego uwierzytelnienia. Na przykład:

   ```markdown
   AuthType Basic
   AuthName "Restricted Area"
   AuthUserFile /path/to/.htpasswd
   Require valid-user
   ```

   Powyższe reguły wymagają uwierzytelnienia dla dostępu do danego katalogu. Użytkownicy muszą wprowadzić prawidłowe dane uwierzytelniające, które są przechowywane w pliku `.htpasswd`.

### 6. **ErrorDocument**: 
Pozwala na dostosowanie stron błędów, które są wyświetlane, gdy serwer napotka problem, na przykład błąd 404 (strona nie znaleziona). Można przekierować użytkownika na inną stronę lub wyświetlić własną treść błędu.

To tylko kilka przykładów reguł .htaccess. Ważne jest, aby zrozumieć, że .htaccess to plik konfiguracyjny serwera Apache, który pozwala na dostosowanie zachowań serwera. Reguły .htaccess mogą być bardzo potężne i warto dobrze poznać dokumentację Apache przed ich stosowaniem.

Przykładem reguły `ErrorDocument` może być dostosowanie strony błędu 404 (strona nie znaleziona). Na przykład:

   ```markdown
   ErrorDocument 404 /error-pages/404.html
   ```

   Powyższa reguła przekierowuje użytkowników na stronę `example.com/error-pages/404.html`, gdy napotkają błąd 404.

To tylko przykładowe reguły .htaccess. Zawsze należy dostosować je do własnych potrzeb i upewnić się, że są zgodne z wymaganiami serwera i aplikacji.






