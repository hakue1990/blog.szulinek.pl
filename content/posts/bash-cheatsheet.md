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
description: "bash komendy"
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

## Jak zacząć pisać skrypty powłoki? 

Poniżej kilka idealnych stron aby zacząć przygodę z skryptami powłoki

[naucz się basha w y minut! ](https://learnxinyminutes.com/docs/bash/)

[Poradnik bash ](https://mywiki.wooledge.org/BashGuide)

[Bash dla hakera! ](https://web.archive.org/web/20230406205817/https://wiki.bash-hackers.org/)

### Przykłądowy skrypt
```bash
#!/usr/bin/env bash

name="John"
echo "Hello $name!"

```

### Zmienne

```bash
name="John"
echo $name  # see below
echo "$name"
echo "${name}!"

```
### Wykonanie warunkowe  

```bash

git commit && git push
git commit || echo "Commit failed"

```

### Warunki  

```bash
if [[ -z "$string" ]]; then
  echo "String is empty"
elif [[ -n "$string" ]]; then
  echo "String is not empty"
fi
```

### Typ string  
```bash
name="John"
echo "Hi $name"  #=> Hi John
echo 'Hi $name'  #=> Hi $name
fi
```
### Wykonanie poelceń powłoki  
```bash
echo "I'm in $(pwd)"
echo "I'm in `pwd`" 
```
### Strict mode  
```bash
set -euo pipefail
IFS=$'\n\t'

```
### Funkcje
```bash
get_name() {
  echo "John"
}

echo "You are $(get_name)"
```
#### Definicje funkcji
```bash


myfunc() {
    echo "hello $1"
}

# Same as above (alternate syntax)
function myfunc() {
    echo "hello $1"
}

myfunc "John"


```
#### Zwracanie wartości
```bash
myfunc() {
    local myresult='some value'
    echo "$myresult"
}

result=$(myfunc)
```
#### Argumenty funkcji
```bash
$# 	Number of arguments
$* 	All positional arguments (as a single word)
$@ 	All positional arguments (as separate strings)
$1 	First argument
$_ 	Last argument of the previous command

Note: $@ and $* must be quoted in order to perform as described. Otherwise, they do exactly the same thing (arguments as separate strings).

See Special parameters.
```
#### Błedy
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
### Rozwijanie nawiasów klamrowych
```bash
echo {A,B}.js

{A,B} 	Same as A B
{A,B}.js 	Same as A.js B.js
{1..5} 	Same as 1 2 3 4 5
```
### Rozwinięcia parametrów
#### Podstawy
```bash
name="John"
echo "${name}"
echo "${name/J/j}"    #=> "john" (substitution)
echo "${name:0:2}"    #=> "Jo" (slicing)
echo "${name::2}"     #=> "Jo" (slicing)
echo "${name::-1}"    #=> "Joh" (slicing)
echo "${name:(-1)}"   #=> "n" (slicing from right)
echo "${name:(-2):1}" #=> "h" (slicing from right)
echo "${food:-Cake}"  #=> $food or "Cake"

length=2
echo "${name:0:length}"  #=> "Jo"

```
[Zobacz: Rozwinięcia parametrów ](https://web.archive.org/web/20230408142504/https://wiki.bash-hackers.org/syntax/pe)

```bash
str="/path/to/foo.cpp"
echo "${str%.cpp}"    # /path/to/foo
echo "${str%.cpp}.o"  # /path/to/foo.o
echo "${str%/*}"      # /path/to

echo "${str##*.}"     # cpp (extension)
echo "${str##*/}"     # foo.cpp (basepath)

echo "${str#*/}"      # path/to/foo.cpp
echo "${str##*/}"     # foo.cpp

echo "${str/foo/bar}" # /path/to/bar.cpp

str="Hello world"
echo "${str:6:5}"   # "world"
echo "${str: -5:5}"  # "world"

src="/path/to/foo.cpp"
base=${src##*/}   #=> "foo.cpp" (basepath)
dir=${src%$base}  #=> "/path/to/" (dirpath)
```
###  Zastępowanie wartości zmiennej
#### lub ciągu znaków przez inne wewnątrz skryptu lub polecenia.
```bash
${foo%suffix} 	Remove suffix
${foo#prefix} 	Remove prefix
${foo%%suffix} 	Remove long suffix
${foo/%suffix} 	Remove long suffix
${foo##prefix} 	Remove long prefix
${foo/#prefix} 	Remove long prefix
${foo/from/to} 	Replace first match
${foo//from/to} 	Replace all
${foo/%from/to} 	Replace suffix
${foo/#from/to} 	Replace prefix
```
### Komentarze
```bash
# Pojedyńczy komentarz
: '
To jest 
komentarz 
wielu linii
'
```
### Substrings
```bash
${foo:0:3}
${foo:(-3):3}
```
### Length
```bash
${#foo} 	Length of $foo
```
### Domyślne wartośći
```bash
${foo:-val} 	$foo, or val if unset (or null)
${foo:=val} 	Set $foo to val if unset (or null)
${foo:+val} 	val if $foo is set (and not null)
${foo:?message} 	Show error message and exit if $foo is unset (or null)

Omitting the : removes the (non)nullity checks, e.g. ${foo-val} expands to val if unset otherwise $foo.
```
### Pętle
#### Pętla for
```bash
for i in /etc/rc.*; do
  echo "$i"
done
```
#### C like for loop
```bash
for ((i = 0 ; i < 100 ; i++)); do
  echo "$i"
done
```
#### Pętla while
 czytanie linii
```bash
while read -r line; do
  echo "$line"
done <file.txt
```
#### Forever
nieskonczona pętla
```bash
while true; do
  ···
done
```
#### Ranges
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