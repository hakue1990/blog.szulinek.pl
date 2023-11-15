---
title: "Jak wyświetlić hasło do Wifi?"
date: 2023-11-14T18:47:37+01:00
draft: false
cover:
    image: img/post-images/wifi-post.png
    alt: 'wifi'
tags: ["web","toturial"] 
categories: ["web","toturial"] 
showToc: true
TocOpen: false
hidemeta: false
comments: false
description: "Jak wyświetlić hasło do Wifi?"
#canonicalURL: "https://canonical.url/to/page"
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

## Na windowsie
Jeśli twój system operacyjny to Windows

### czym jest CMD?

CMD to narzędzie do tłumaczenia poleceń w systemie Windows. System operacyjny Windows posiada narzędzie do tłumaczenia poleceń o nazwie CMD, które jest używane do tworzenia osadzonych odwołań. Większość tych poleceń korzysta z dokumentów i plików wsadowych do automatyzacji zadań, wykonywania zadań administracyjnych na wysokim poziomie oraz rozwiązywania problemów związanych z systemem Windows.

Windows Command Processor to oficjalna nazwa wiersza polecenia, znana również jako command shell, cmd prompt lub poprzez swoją nazwę pliku, cmd.exe.

### Otwórz CMD jako administrator

Następnie wpisz komendę:
```
netsh wlan show profile name="Network name" key=clear
```
i zatwierdź enterem.

Hasło do Wi-Fi zostanie wyświetlone w polu oznaczonym jako "Key Content" w sekcji "Security Settings"

## w Mac OS

W systemie operacyjnym Mac OS możemy znaleźć hasła do zapisanych sieci Wi-Fi, korzystając z terminala.

### Otwórz terminal

Następnie wpisz:
```
security find-generic-password -wa "Nazwa-sieci-WiFi"
```
i zatwierdz hasłem.

metoda działa tylko dla sieci, które wcześniej były zapisane na twoim urządzeniu. 

## Na Linuxie

### Otwórz terminal
Następnie wpisz:
```
sudo cat  /etc/NetworkManager/system-connections/* | grep psk
```
Podobnie jak w przypadku MacOSa i Windowsa - zadziała to tylko wtedy gdy urządzenie było wcześniej połączone z tą siecią.

## Wnioski

Ludzie mogą być zapominalscy, ale od teraz nie musisz martwić się o zapamiętywanie swoich haseł do Wi-Fi. Będziesz w stanie odzyskać hasło do Wi-Fi z dowolnego systemu operacyjnego Windows/Mac/Linux.
