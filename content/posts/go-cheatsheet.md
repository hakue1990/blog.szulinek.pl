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

Go, znany także jako Golang, to język programowania stworzony przez Google. Jest to język open source charakteryzujący się wyjątkową wydajnością i efektywnością. Jest idealny do tworzenia oprogramowania serwerowego, narzędzi dla programistów i aplikacji internetowych. Ze względu na swoją prostotę, Go zyskuje coraz większą popularność w tworzeniu skalowalnych i wydajnych aplikacji internetowych oraz mikrousług.

## Przydatne linki

- [A Tour of Go](https://go.dev/tour/welcome/1)
- [Go repl](https://replit.com/languages/go)
- [Go Lang wiki](https://github.com/golang/go/wiki/)

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
```

```sh
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

// Deklaracja listy
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

Stałe mogą przyjmować wartości liczbowe, tekstowe, logiczne lub numeryczne.

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

### Liczby

```go
num := 3          // int
num := 3.         // float64
num := 3 + 4i     // complex128
num := byte('a')  // byte (alias for uint8)
```

### Inne typy liczbowe

```go
var u uint = 7        // uint (bez znaku)
var p float32 = 22.7  // float 32-bitowy
```

### Tablice

Tablice mają zdefiniowany rozmiar.

```go
// var numbers [5]int
numbers := [...]int{0, 0, 0, 0, 0}
```

### Wycinki (Slices)

Wycinki mają dynamiczną wielkość w przeciwieństwie do tablic.

```go
slice := []int{2, 3, 4}

slice := []byte("Hello")
```

### Wskaźniki

Wskaźniki wskazują na lokalizację w pamięci zmiennej.

```go
func main() {
  b := *getPointer()
  fmt.Println("Wartość to", b)
}

func getPointer() *int {
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
if day == "niedziela" || day == "sobota" {
  odpocznij()
} else if day == "poniedziałek" && jestesZmęczony() {
  jęk()
} else {
  pracuj()
}
```

### Instrukcje w warunkach

Warunek w instrukcji "if" może być poprzedzony instrukcją przed średnikiem (;). Zmienne zadeklarowane w tej instrukcji są dostępne tylko w jej zakresie.

```go
if _, err := zrobCos(); err != nil {
  fmt.Println("Ups!")
}
```

### Instrukcja "switch"

```go
switch day {
  case "niedziela":
    // przypadki nie "przechodzą" domyślnie
    fallthrough

  case "sobota":
    odpocznij()

  default:
    pracuj()
}
```

### Pętla "for"

```go
for count := 0; count <= 10; count++ {
  fmt.Println("Licznik wynosi", count)
}
```

### Pętla "for" z zakresem (for-range)

```go
entry := []string{"Jack", "John", "Jones"}
for i, val := range entry {
  fmt.Printf("Na pozycji %d znajduje się postać %s\n", i, val)
}
```

### Pętla "while"

```go
n := 0
x := 42
for n != x {
  n := zgadnij()
}
```

## Funkcje

W języku Go, funkcje są obiektami pierwszej klasy.

### Lambdy

```go
myfunc := func() bool {
  return x > 10000
}
```

### Wiele wartości zwracanych

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
  "fmt"        // daje fmt.Println
  "math/rand"  // daje rand.Intn
)
```

Oba przypadki są takie same.

### Aliasy

```go
import r "math/rand"

r.Intn()
```

### Paczki

Każdy plik paczki musi zaczynać się od słowa kluczowego 'package'.

```go
package hello
```

###

 Eksportowanie nazw

Nazwy eksportowane zaczynają się od wielkich liter.

```go
func Hello() {
  ···
}
```

## Współbieżność

### Goroutines

Kanały są bezpiecznymi obiektami komunikacji używanymi w gorutynach.

```go
func main() {
  // Kanał
  ch := make(chan string)

  // Rozpocznij gorutyny równolegle
  go push("Moe", ch)
  go push("Larry", ch)
  go push("Curly", ch)

  // Odczytaj 3 wyniki
  // (Ponieważ nasze gorutyny są równoległe,
  // kolejność nie jest gwarantowana!)
  fmt.Println(<-ch, <-ch, <-ch)
}
 
func push(name string, ch chan string) {
  msg := "Hej, " + name
  ch <- msg
}
```

### Kanały buforowane

Kanały buforowane ograniczają ilość wiadomości, które mogą przechowywać.

```go
ch := make(chan int, 2)
ch <- 1
ch <- 2
ch <- 3
// błąd krytyczny:
// wszystkie gorutyny są uśpione - deadlock!
```

### Zamykanie kanałów

```go
ch <- 1
ch <- 2
ch <- 3
close(ch)
```

Iteruje przez kanał do momentu jego zamknięcia.

```go
for i := range ch {
  ···
}
```

Kanał jest zamknięty, jeśli ok == false.

```go
v, ok := <-ch
```

### WaitGroup

```go
import "sync"

func main() {
  var wg sync.WaitGroup
  
  for _, item := range itemList {
    // Zwiększ licznik WaitGroup
    wg.Add(1)
    go doOperation(&wg, item)
  }
  // Czekaj, aż gorutyny zakończą pracę
  wg.Wait()
}

func doOperation(wg *sync.WaitGroup, item string) {
  defer wg.Done()
  // Wykonaj operację na elemencie
  // ...
}
```

WaitGroup oczekuje na zakończenie zbioru gorutyn. Główna gorutyna wywołuje metodę Add, aby ustawić liczbę gorutyn, na które ma czekać. Każda gorutyna wywołuje wg.Done() po zakończeniu swojej pracy.

## Kontrola błędów

### Defer

"Defer" w języku Go jest mechanizmem, który pozwala na opóźnione wykonanie funkcji do momentu zakończenia otaczającej ją funkcji. Argumenty są ewaluowane natychmiast, ale samo wywołanie funkcji jest opóźnione do późniejszego czasu.

```go
func main() {
  defer fmt.Println("Gotowe")
  fmt.Println("Pracuję...")
}
```

### Funkcje opóźnione

```go
func main() {
  defer func() {
    fmt.Println("Gotowe")
  }()
  fmt.Println("Pracuję...")
}
```

Lambdy (anonimowe funkcje) są lepiej dostosowane do bloków "defer".

```go
func main() {
  var d = int64(0)
  defer func(d *int64) {
    fmt.Printf("& %v Unix Sec\n", *d)
  }(&d)
  fmt.Print("Gotowe ")
  d = time.Now().Unix()
}
```

Blok "defer" używa aktualnej wartości zmiennej "d", chyba że użyjemy wskaźnika, aby uzyskać ostateczną wartość na końcu funkcji "main".

## Struktury

### Definiowanie

```go
type Vertex struct {
  X int
  Y int
}

func main() {
  v := Vertex{1, 2}
  v.X = 4
  fmt.Println(v.X, v.Y)
}
```

### Literały

```go
v := Vertex{X: 1, Y: 2}

// Nazwy pól mogą być pominięte
v := Vertex{1, 2}

// Pole Y jest domyślne
v := Vertex{X: 1}
```

### Używanie wskaźników do struktur

```go
v := &Vertex{1, 2}
v.X = 2
```

Odpowiednie wyrażenie v.X jest takie samo jak (*v).X, gdy v jest wskaźnikiem.

## Metody

### Odbiorcy

```go
type Vertex struct {
  X, Y float64
}

func (v Vertex) Abs() float64 {
  return math.Sqrt(v.X * v.X + v.Y * v.Y)
}

v := Vertex{1, 2}
v.Abs()
```

W języku Go nie ma klas, ale można definiować funkcje z odbiorcami.

### Mutacje

```go
func (v *Vertex) Scale(f float64) {
  v.X = v.X * f
  v.Y = v.Y * f
}

v := Vertex{6, 12}
v.Scale(0.5)
// `v` zostanie zaktualizowane
```

Poprzez zdefiniowanie odbiorcy jako wskaźnika (*Vertex), można dokonywać mutacji danych.

## Interfejsy

### Podstawowy interfejs

```go
type Shape interface {
  Area() float64
  Perimeter() float64
}
```

### Struktury

```go
type Rectangle struct {
  Length, Width float64
}
```

Struktura Rectangle implementuje interfejs Shape w sposób domyślny, poprzez zaimplementowanie wszystkich jego metod.

### Metody

```go
func (r Rectangle) Area() float64 {
  return r.Length * r.Width
}

func (r Rectangle) Perimeter() float64 {
  return 2 * (r.Length + r.Width)
}
```

Metody zdefiniowane w interfejsie Shape są zaimplementowane w strukturze Rectangle.

### Przykład interfejsu

```go
func main() {
  var r Shape = Rectangle{Length: 3, Width: 4}
  fmt.Printf("Typ r: %T, Pole: %v, Obwód: %v.", r, r.Area(), r.Perimeter())
}
```