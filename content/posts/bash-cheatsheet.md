---
title: "Bash Cheatsheet"
date: 2023-07-21T21:22:03+02:00
draft: false
author: ["Adam"]
cover:
    image: img/bash.webp
    alt: 'bash'

tags: ["tech","www","bash"] 
categories: ["www","tech","bash"]
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "Zacznij pisać skrypty powłoki"
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

## Co to Jest Bash ?

Bash to tzw. powłoka systemu Linux. To nic innego jak program, który umożliwia nam komunikację z systemem. Są różne powłoki dla systemu Linux ale Bash jest zdecydowanie najpopularniejszy. Dla niezliczonej ilości użytkowników jest on podstawowym narzędziem pracy. 

## Co mogę zrobić za pomocą powłoski systemu BASH ?

Wszystko! Łatwiej byłoby napisać czego się nie da zrobić.

Pomyśl o dowolnym zadaniu, które w systemie Linux zajmuje sporo czasu. I pomyśl teraz, że to zadanie możesz łatwo zautomatyzować za pomocą Bash.

Za pomocą skryptów Bash możesz na przykład:

* pisać własne komendy
* wykonywać obliczenia
* operacje na plikach
* automatyzować zadania

I wiele więcej :) 

Popatrzmy na prosty przykład. Wyobraź sobie, że często zmieniasz nazwy plików w katalogu. Ręczna zmian nazw przy dużej ilości plików jest pracochłonna. Wystarczy napisać prosty skrypt, który będzie to robił automatycznie. Będzie w stanie w parę sekund zmienić nazwy tysięcy plików.

Jeśli nauczysz się podstaw skryptowania to praca w Linuxie będzie po prostu łatwiejsza, szybsza i dużo przyjemniejsza.


## Jak zacząć pisać skrypty powłoki?

Poniżej kilka idealnych stron, aby zacząć przygodę z skryptami powłoki:

- [Naucz się basha w y minut!](https://learnxinyminutes.com/docs/bash/)
- [Poradnik bash](https://mywiki.wooledge.org/BashGuide)
- [Bash dla hakera!](https://web.archive.org/web/20230406205817/https://wiki.bash-hackers.org/)

## Przykładowy skrypt

```bash
#!/usr/bin/env bash

name="John"
echo "Hello $name!"
```

## Zmienne

```bash
name="John"
echo $name       # see below
echo "$name"
echo "${name}!"
```

## Wykonanie warunkowe

```bash
git commit && git push
git commit || echo "Commit failed"
```

## Warunki

```bash
if [[ -z "$string" ]]; then
  echo "String is empty"
elif [[ -n "$string" ]]; then
  echo "String is not empty"
fi
```

## Typ string

```bash
name="John"
echo "Hi $name"  #=> Hi John
echo 'Hi $name'  #=> Hi $name
```

## Wykonanie poleceń powłoki

```bash
echo "I'm in $(pwd)"
echo "I'm in `pwd`" 
```

## Strict mode

```bash
set -euo pipefail
IFS=$'\n\t'
```

## Funkcje

```bash
get_name() {
  echo "John"
}

echo "You are $(get_name)"
```

## Definicje funkcji

```bash
myfunc() {
    echo "hello $1"
}

# To samo, ale inny zapis
function myfunc() {
    echo "hello $1"
}

myfunc "John"
```

## Zwracanie wartości

```bash
myfunc() {
    local myresult='some value'
    echo "$myresult"
}

result=$(myfunc)
```

## Argumenty funkcji

```bash
$# 	# Liczba argumentów
$* 	# Wszystkie argumenty pozycyjne (jako jedno słowo)
$@ 	# Wszystkie argumenty pozycyjne (jako oddzielne ciągi znaków)
$1 	# Pierwszy argument
$_ 	# Ostatni argument poprzedniego polecenia
${PIPESTATUS[n]} 	# Wartość zwrócona przez polecenia w potoku (tablica)
```

## Błędy

```bash
myfunc() {
  return 1
}

if myfunc; then
  echo "success"
else
  echo "failure"
fi
```

## Rozwijanie nawiasów klamrowych

```bash
echo {A,B}.js

{A,B}    # To samo co A B
{A,B}.js    # To samo co A.js B.js
{1..5}    # To samo co 1 2 3 4 5
```

## Rozwinięcia parametrów

```bash
name="John"
echo "${name}"
echo "${name/J/j}"    #=> "john" (zamiana)
echo "${name:0:2}"    #=> "Jo" (wycinanie)
echo "${name::2}"     #=> "Jo" (wycinanie)
echo "${name::-1}"    #=> "Joh" (wycinanie)
echo "${name:(-1)}"   #=> "n" (wycinanie od prawej strony)
echo "${name:(-2):1}" #=> "h" (wycinanie od prawej strony)
echo "${food:-Cake}"  #=> $food lub "Cake"

length=2
echo "${name:0:length}"  #=> "Jo"
```
[Zobacz: Rozwinięcia parametrów](https://web.archive.org/web/20230408142504/https://wiki.bash-hackers.org/syntax/pe)

```bash
str="/path/to/foo.cpp"
echo "${str%.cpp}"    # /path/to/foo
echo "${str%.cpp}.o"  # /path/to/foo.o
echo "${str%/*}"      # /path/to

echo "${str##*.}"     # cpp (rozszerzenie)
echo "${str##*/}"     # foo.cpp (bazowa nazwa)

echo "${str#*/}"      # path/to/foo.cpp
echo "${str##*/}"     # foo.cpp

echo "${str/foo/bar}" # /path/to/bar.cpp

str="Hello world"
echo "${str:6:5}"   # "world"
echo "${str: -5:5}"  # "world"

src="/path/to/foo.cpp"
base=${src##*/}   #=> "foo.cpp" (bazowa nazwa)
dir=${src%$base}  #=> "/path/to/" (ścieżka)

```

## Zastępowanie wartości zmiennych

```bash
${foo%suffix}    # Usunięcie sufiksu
${foo#prefix}    # Usunięcie prefiksu
${foo%%suffix}    # Usunięcie długiego sufiksu
${foo/%suffix}    # Usunięcie długiego sufiksu
${foo##prefix}    # Usunięcie długiego prefiksu
${foo/#prefix}    # Usunięcie długiego prefiksu
${foo/from/to}    # Zamiana pierwszego dopasowania
${foo//from/to}    # Zamiana wszystkich dopasowań
${foo/%from/to}    # Zamiana sufiksu
${foo/#from/to}    # Zamiana prefiksu
```

## Komentarze

```bash
# Po

jedynczy komentarz
: '
To jest
komentarz
wielu linii
'
```

## Substrings

```bash
${foo:0:3}
${foo:(-3):3}
```

## Długość

```bash
${#foo}    # Długość zmiennej $foo
```

## Domyślne wartości

```bash
${foo:-val}    # $foo lub val, jeśli nieustawiony (lub pusty)
${foo:=val}    # Ustaw $foo na val, jeśli nieustawiony (lub pusty)
${foo:+val}    # val, jeśli $foo jest ustawiony (i niepusty)
${foo:?message}    # Wyświetl komunikat o błędzie i zakończ, jeśli $foo jest nieustawiony (lub pusty)

Użycie dwukropka (:), usuwa sprawdzanie (nie)ustawienia, np. ${foo-val} zwróci val, jeśli $foo jest nieustawiony, w przeciwnym razie $foo.
```

## Pętle
### Pętla for

```bash
for i in /etc/rc.*; do
  echo "$i"
done
```

### Pętla for jak w języku C

```bash
for ((i = 0 ; i < 100 ; i++)); do
  echo "$i"
done
```

### Pętla while czytająca linie

```bash
while read -r line; do
  echo "$line"
done <file.txt
```

### Nieskończona pętla

```bash
while true; do
  ···
done
```

### Zakresy

```bash
for i in {1..5}; do
    echo "Welcome $i"
done
```

```bash
for i in {5..50..5}; do
    echo "Welcome $i"
done
```

## Warunki

```bash
[[ -z STRING ]]    # Pusty ciąg znaków
[[ -n STRING ]]    # Niepusty ciąg znaków
[[ STRING == STRING ]]    # Równa się
[[ STRING != STRING ]]    # Nie równa się
[[ NUM -eq NUM ]]    # Równa się
[[ NUM -ne NUM ]]    # Nie równa się
[[ NUM -lt NUM ]]    # Mniejsze niż
[[ NUM -le NUM ]]    # Mniejsze lub równe
[[ NUM -gt NUM ]]    # Większe niż
[[ NUM -ge NUM ]]    # Większe lub równe
[[ STRING =~ STRING ]]    # Dopasowanie wyrażenia regularnego
(( NUM < NUM ))    # Warunki liczbowe
[[ -o noclobber ]]    # Jeśli opcja OPTIONNAME jest włączona
[[ ! EXPR ]]    # Negacja
[[ X && Y ]]    # I
[[ X || Y ]]    # Lub
```

## Warunki na plikach

```bash
[[ -e FILE ]]    # Istnieje
[[ -r FILE ]]    # Możliwe do odczytu
[[ -h FILE ]]    # Slink
[[ -d FILE ]]    # Katalog
[[ -w FILE ]]    # Możliwe do zapisu
[[ -s FILE ]]    # Rozmiar jest > 0 bajtów
[[ -f FILE ]]    # Plik
[[ -x FILE ]]    # Wykonywalny
[[ FILE1 -nt FILE2 ]]    # 1 jest nowszy niż 2
[[ FILE1 -ot FILE2 ]]    # 2 jest nowszy niż 1
[[ FILE1 -ef FILE2 ]]    # Te same pliki
```

## Przykłady warunków

```bash
# String
if [[ -z "$string" ]]; then
  echo "String is empty"
elif [[ -n "$string" ]]; then
  echo "String is not empty"
else
  echo "This never happens"
fi

# Combinations
if [[ X && Y ]]; then
  ...
fi

# Equal
if [[ "$A" == "$B" ]]

# Regex
if [[ "A" =~ . ]]

if (( $a < $b )); then
   echo "$a is smaller than $b"
fi

if [[ -e "file.txt" ]]; then
  echo "file exists"
fi

```

## Tablice
### Deklaracje

```bash
Fruits=('Apple' 'Banana' 'Orange')

Fruits[0]="Apple"
Fruits[1]="Banana"
Fruits[2]="Orange"
```

### Praca z tablicami

```bash
echo "${Fruits[0]}"           # Element #0
echo "${Fruits[-1]}"          # Ostatni element
echo "${Fruits[@]}"           # Wszystkie elementy, oddzielone spacją
echo "${#Fruits[@]}"          # Liczba elementów
echo "${#Fruits}"             # Długość pierwszego elementu
echo "${#Fruits[3]}"          # Długość N-tego elementu
echo "${Fruits[@]:3:2}"       # Zakres (od pozycji 3, długość 2)
echo "${!Fruits[@]}"          # Klucze wszystkich elementów, oddzielone spacją
```

### Operacje na tablicach

```bash
Fruits=("${Fruits[@]}" "Watermelon")    # Dodaj
Fruits+=('Watermelon')                  # To samo, dodaj
Fruits=( "${Fruits[@]/Ap*/}" )          # Usuń według dopasowania wyrażenia regularnego
unset Fruits[2]                         # Usuń jeden element
Fruits=("${Fruits[@]}")                 # Duplikuj
Fruits=("${Fruits[@]}" "${Veggies[@]}") # Połącz dwie tablice
lines=(`cat "logfile"`)                 # Odczytaj z pliku
```

### Iteracja po tablicy

```bash
for i in "${arrayName[@]}"; do
  echo "$i"
done
```

## Słowniki
### Deklaracje

```bash
declare -A sounds

sounds[dog]="bark"
sounds[cow]="moo"
sounds[bird]="tweet"
sounds[wolf]="howl"
```

Deklaruje dźwięk jako obiekt słownika (czyli tablicy asocjacyjnej).

### Praca ze słownikami

```bash
echo "${sounds[dog]}"    # Dźwięk ps

a
echo "${sounds[@]}"      # Wszystkie wartości
echo "${!sounds[@]}"     # Wszystkie klucze
echo "${#sounds[@]}"     # Liczba elementów
unset sounds[dog]        # Usuń klucz psa
```

### Iteracja po słowniku

```bash
# Iteracja po wartościach
for val in "${sounds[@]}"; do
  echo "$val"
done

# Iteracja po kluczach
for key in "${!sounds[@]}"; do
  echo "$key"
done
```

## Opcje
```bash
set -o noclobber    # Unikaj nadpisywania plików (echo "hi" > foo)
set -o errexit      # Wyjdź po błędzie, unikając kaskadowych błędów
set -o pipefail     # Wyświetl ukryte błędy
set -o nounset      # Ujawnia nieustawione zmienne
```

## Globalne opcje
```bash
shopt -s nullglob      # Nie pasujące globs są usuwane ('*.foo' => '')
shopt -s failglob      # Nie pasujące globs generują błędy
shopt -s nocaseglob    # Wielkość liter w globs ignorowana
shopt -s dotglob       # Wilcardy pasują do plików z kropką ("*.sh" => ".foo.sh")
shopt -s globstar      # Pozwala na ** dla rekurencyjnych dopasowań ('lib/**/*.rb' => 'lib/a/b/c.rb')
```

Ustaw `GLOBIGNORE` jako dwukropkowo oddzieloną listę wzorców do pominięcia w dopasowaniach globalnych.

## Obliczenia numeryczne
```bash
$((a + 200))      # Dodaj 200 do $a

$(($RANDOM%200))  # Losowa liczba od 0 do 199

declare -i count  # Deklaruj zmienną jako liczbę całkowitą
count+=1          # Inkrementuj zmienną count
```

## Podpowłoki (subshells)
```bash
(cd somedir; echo "Teraz jestem w: $PWD")
pwd  # Nadal w pierwszym katalogu
```

## Sprawdzanie polecenia
```bash
command -V cd
#=> "cd to funkcja/alias/cokolwiek"
```

## Trap errors
```bash
trap 'echo Błąd w linii $LINENO' ERR

lub

traperr() {
  echo "BŁĄD: ${BASH_SOURCE[1]} w linii ${BASH_LINENO[0]}"
}

set -o errtrace
trap traperr ERR
```

## Case/switch
```bash
case "$1" in
  start | up)
    vagrant up
    ;;

  *)
    echo "Użycie: $0 {start|stop|ssh}"
    ;;
esac
```

## Źródło względne
```bash
source "${0%/*}/../share/foo.sh"
```

## Pobieranie opcji
```bash
while [[ "$1" =~ ^- && ! "$1" == "--" ]]; do case $1 in
  -V | --version )
    echo "$version"
    exit
    ;;
  -s | --string )
    shift; string=$1
    ;;
  -f | --flag )
    flag=1
    ;;
esac; shift; done
if [[ "$1" == '--' ]]; then shift; fi
```

## Heredoc
```bash
cat <<END
hello world
END
```

## Odczytywanie wejścia
```bash
echo -n "Czy kontynuować? [y/n]: "
read -r ans
echo "$ans"

Opcja -r wyłącza specjalne znaczenie odwrotnego ukośnika.
```

## Specjalne zmienne
```bash
$?    # Status wyjścia ostatniego zadania
$!    # PID ostatniego zadania w tle (tło)
$$    # PID powłoki (aktualnego skryptu)
$0    # Nazwa pliku aktualnego skryptu
$_    # Ostatni argument poprzedniego polecenia
${PIPESTATUS[n]}    # Wartość zwrócona przez potokowe polecenia (tablica)
```

Zobacz Specjalne parametry.

## Powrót do poprzedniego katalogu
```bash
pwd    # /home/user/foo
cd bar/
pwd    # /home/user/foo/bar
cd -
pwd    # /home/user/foo
```

## Sprawdzanie wyniku polecenia
```bash
if ping -c 1 google.com; then
  echo "Wydaje się, że masz działające połączenie internetowe"
fi
```

## Sprawdzanie za pomocą grep
```bash
if grep -q 'foo' ~/.bash_history; then
  echo "W przeszłości wpisałeś 'foo'"
fi
```

<!-- ![a](/img/about.jpg) -->