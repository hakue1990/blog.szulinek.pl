---
title: "Go Cheatsheet"
date: 2023-10-19T20:37:55+02:00
draft: true
author: ["Adam"]
cover:
    image: img/post-images/Go-cheatsheet.png
    alt: 'docker'
tags: ["go","cheatsheet"] 
categories: ["go","cheatsheet"]  
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "Go cheatsheet"
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
---
## Wprowadzenie

Go, znany także jako Golang, to język programowania stworzony przez Google. Jest językiem open source, cechującym się wyjątkową wydajnością i efektywnością - jest idealny do tworzenia oprogramowania serwerowego, narzędzi deweloperskich oraz aplikacji internetowych. Dzięki swojej prostocie, Go jest coraz bardziej popularny w tworzeniu skalowalnych i wydajnych aplikacji webowych oraz mikrousług.

## Przydatne linki

### [A Tour of Go](https://go.dev/tour/welcome/1) 
### [Go repl](https://replit.com/languages/go) 
### [Go Lang wiki](https://github.com/golang/go/wiki/)

## Hello World!

```go
package main

import "fmt"

func main() {
  message := greetMe("world")
  fmt.Println(message)
}

func greetMe(name string) string {
  return "Hello, " + name + "!"
}

$ go build
```
## Zmienne

```go
var msg string
var msg = "Hello, world!"
var msg string = "Hello, world!"
var x, y int
var x, y int = 1, 2
var x, msg = 1, "Hello, world!"
msg = "Hello"

Deklaracja listy

var (
  x int
  y = 20
  z int = 30
  d, e = 40, "Hello"
  f, g string
)

msg := "Hello"
x, msg := 1, "Hello"
```
## Stałe

Stałe mogą przyjmować wartości znakowe, tekstowe, logiczne lub numeryczne.
```go
const Phi = 1.618
const Size int64 = 1024
const x, y = 1, 2
const (
  Pi = 3.14
  E  = 2.718
)
const (
  Sunday = iota
  Monday
  Tuesday
  Wednesday
  Thursday
  Friday
  Saturday
)
```
## Podstawowe typy danych

### String

```go
str := "Hello"

str := `Multiline
string`

```
### Number
```go
num := 3          // int
num := 3.         // float64
num := 3 + 4i     // complex128
num := byte('a')  // byte (alias for uint8)
```
#### inne typy liczbowe
```go
var u uint = 7        // uint (unsigned)
var p float32 = 22.7  // 32-bit float
```
### Arrays
tablice mają zdefiniowany rozmiar
```go
// var numbers [5]int
numbers := [...]int{0, 0, 0, 0, 0}
```

### Slices [ Wycinki ]
wycinki mają dynamiczną wielkość w przeciwieństwie do tablic
```go
slice := []int{2, 3, 4}

slice := []byte("Hello")

```

### Pointers
Wskaźniki wskazują na lokalizację pamięci zmiennej
```go
func main () {
  b := *getPointer()
  fmt.Println("Value is", b)
}
 

func getPointer () (myPointer *int) {
  a := 234
  return &a
}
 

a := new(int)
*a = 234
```
### Konwersje typów
```go
i := 2
f := float64(i)
u := uint(i)
```
## Kontrola przepływu

### Warunki
```go
if day == "sunday" || day == "saturday" {
  rest()
} else if day == "monday" && isTired() {
  groan()
} else {
  work()
}
```
### Statements in if
Warunek w instrukcji if może być poprzedzony instrukcją przed średnikiem (;). Zmienne zadeklarowane w tej instrukcji są w zakresie tylko do momentu zakończenia instrukcji if.
```go
if _, err := doThing(); err != nil {
  fmt.Println("Uh oh")
}

```
### Switch
```go
switch day {
  case "sunday":
    // cases don't "fall through" by default!
    fallthrough

  case "saturday":
    rest()

  default:
    work()
}

```
### Pętla For
```go
for count := 0; count <= 10; count++ {
  fmt.Println("My counter is at", count)
}
```
### Pętla For-Range 
```go
entry := []string{"Jack","John","Jones"}
for i, val := range entry {
  fmt.Printf("At position %d, the character %s is present\n", i, val)
}
```
### Pętla While
```go
n := 0
x := 42
for n != x {
  n := guess()
}
```
## Funckje

W Go funkcje są obiektami pierwszej klasy.
### Lambdas
```go
myfunc := func() bool {
  return x > 10000
}

```
### Wiele typów zwracanych
```go
a, b := getMessage()

func getMessage() (a string, b string) {
  return "Hello", "World"
}
```
### Nazwane wartości zwracane

Poprzez zdefiniowanie nazw wartości zwracanych w sygnaturze funkcji, zwrócenie (bez argumentów) spowoduje zwrócenie zmiennych o tych nazwach.
```go
func split(sum int) (x, y int) {
  x = sum * 4 / 9
  y = sum - x
  return
}
```

## Paczki

### Importowanie

```go
import "fmt"
import "math/rand"

import (
  "fmt"        // gives fmt.Println
  "math/rand"  // gives rand.Intn
)

```
oba przypadki są takie same

### Aliasy
```go

import r "math/rand"

r.Intn()

```
### Paczki

Każdy plik pakietu musi zaczynać się od słowa kluczowego 'package'.

```go
package hello


```

### Eksporotwanie nazw

Nazwy eksportowane zaczynają się od wielkich liter.
```go
func Hello () {
  ···
}
```