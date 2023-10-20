---
title: "Go Cheatsheet"
date: 2023-10-19T20:38:06+02:00
draft: false
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
## Introduction

Go, also known as Golang, is a programming language created by Google. It is an open-source language known for its exceptional performance and efficiency. It is ideal for building server-side software, developer tools, and web applications. Due to its simplicity, Go is becoming increasingly popular for creating scalable and efficient web applications and microservices.

## Useful Links

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

## Variables

```go
var msg string
var msg = "Hello, world!"
var msg string = "Hello, world!"
var x, y int
var x, y int = 1, 2
var x, msg = 1, "Hello, world!"
msg = "Hello"

// Declaration with list
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

## Constants

Constants can take numerical, string, logical, or numeric values.

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

## Basic Data Types

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

#### Other Numeric Types

```go
var u uint = 7        // uint (unsigned)
var p float32 = 22.7  // 32-bit float
```

### Arrays

Arrays have a defined size.

```go
// var numbers [5]int
numbers := [...]int{0, 0, 0, 0, 0}
```

### Slices

Slices have dynamic size, unlike arrays.

```go
slice := []int{2, 3, 4}

slice := []byte("Hello")
```

### Pointers

Pointers point to the memory location of a variable.

```go
func main() {
  b := *getPointer()
  fmt.Println("Value is", b)
}

func getPointer() (myPointer *int) {
  a := 234
  return &a
}

a := new(int)
*a = 234
```

### Type Conversions

```go
i := 2
f := float64(i)
u := uint(i)
```

## Flow Control

### Conditions

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

A condition in an if statement can be preceded by a statement before the semicolon. Variables declared in this statement are only in scope until the end of the if statement.

```go
if _, err := doThing(); err != nil {
  fmt.Println("Uh oh")
}
```

### Switch Statement

```go
switch day {
  case "sunday":
    // Cases don't "fall through" by default!
    fallthrough

  case "saturday":
    rest()

  default:
    work()
}
```

### For Loop

```go
for count := 0; count <= 10; count++ {
  fmt.Println("My counter is at", count)
}
```

### For-Range Loop

```go
entry := []string{"Jack", "John", "Jones"}
for i, val := range entry {
  fmt.Printf("At position %d, the character %s is present\n", i, val)
}
```

### While Loop

```go
n := 0
x := 42
for n != x {
  n := guess()
}
```

## Functions

In Go, functions are first-class objects.

### Lambdas

```go
myfunc := func() bool {
  return x > 10000
}
```

### Multiple Return Values

```go
a, b := getMessage()

func getMessage() (a string, b string) {
  return "Hello", "World"
}
```

### Named Return Values

By defining named return values in a

 function signature, returning without arguments will return the variables with those names.

```go
func split(sum int) (x, y int) {
  x = sum * 4 / 9
  y = sum - x
  return
}
```

## Packages

### Imports

```go
import "fmt"
import "math/rand"

import (
  "fmt"        // gives fmt.Println
  "math/rand"  // gives rand.Intn
)
```

Both cases are equivalent.

### Aliases

```go
import r "math/rand"

r.Intn()
```

### Packages

Every package file must start with the 'package' keyword.

```go
package hello
```

### Exported Names

Exported names start with capital letters.

```go
func Hello() {
  ···
}
```

## Concurrency

### Goroutines

Channels are concurrency-safe communication objects used in Goroutines.

```go
func main() {
  // A "channel"
  ch := make(chan string)

  // Start concurrent routines
  go push("Moe", ch)
  go push("Larry", ch)
  go push("Curly", ch)

  // Read 3 results
  // (Since our goroutines are concurrent,
  // the order isn't guaranteed!)
  fmt.Println(<-ch, <-ch, <-ch)
}

func push(name string, ch chan string) {
  msg := "Hey, " + name
  ch <- msg
}
```

### Buffered Channels

Buffered channels limit the amount of messages they can hold.

```go
ch := make(chan int, 2)
ch <- 1
ch <- 2
ch <- 3
// fatal error:
// all goroutines are asleep - deadlock!
```

### Closing Channels

```go
ch <- 1
ch <- 2
ch <- 3
close(ch)
```

Iterates across a channel until it's closed.

```go
for i := range ch {
  ···
}
```

Closed if ok == false.

```go
v, ok := <-ch
```

### WaitGroup

```go
import "sync"

func main() {
  var wg sync.WaitGroup

  for _, item := range itemList {
    // Increment WaitGroup Counter
    wg.Add(1)
    go doOperation(&wg, item)
  }
  // Wait for goroutines to finish
  wg.Wait()
}

func doOperation(wg *sync.WaitGroup, item string) {
  defer wg.Done()
  // do operation on item
  // ...
}
```

WaitGroup waits for a collection of goroutines to finish. The main goroutine calls Add to set the number of goroutines to wait for. The goroutine calls wg.Done() when it finishes. See: WaitGroup.

## Error Control

### Defer

Defer runs a function until the surrounding function returns. The arguments are evaluated immediately, but the function call is delayed until later.

```go
func main() {
  defer fmt.Println("Done")
  fmt.Println("Working...")
}
```

### Deferring Functions

```go
func main() {
  defer func() {
    fmt.Println("Done")
  }()
  fmt.Println("Working...")
}
```

Lambdas (anonymous functions) are better suited for defer blocks.

```go
func main() {
  var d = int64(0)
  defer func(d *int64) {
    fmt.Printf("& %v Unix Sec\n", *d)
  }(&d)
  fmt.Print("Done ")
  d = time.Now().Unix()
}
```

The defer func uses the current value of d, unless we use a pointer to get the final value at the end of the main.

## Structs

### Defining

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

### Literals

```go
v := Vertex{X: 1, Y: 2}

// Field names can be omitted
v := Vertex{1, 2}

// Y is implicit
v := Vertex{X: 1}
```

### Using Pointers with Structs

```go
v := &Vertex{1, 2}
v.X = 2
```

Doing v.X is the same as doing (*v).X when v is a pointer.

## Methods

### Receivers

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

There are no classes, but you can define functions with receivers.

### Mutations

```go
func (v *Vertex) Scale(f float64) {
  v.X = v.X * f
  v.Y = v.Y * f
}

v := Vertex{6, 12}
v.Scale(0.5)
// `v` is updated
```

By defining your receiver as a pointer (*Vertex), you can do mutations.

## Interfaces

### Basic Interface

```go
type Shape interface {
  Area() float64
  Perimeter() float64
}
```

### Struct

```go
type Rectangle struct {
  Length, Width float64
}
```

The Rectangle struct implicitly implements the Shape interface by implementing all of its methods.

### Methods

```go
func (r Rectangle) Area() float64 {
  return r.Length * r.Width
}

func (r Rectangle) Perimeter() float64 {
  return 2 * (r.Length + r.Width)
}
```

The methods defined in the Shape interface are implemented in the Rectangle.

### Example of an Interface

```go
func main() {
  var r Shape = Rectangle{Length: 3, Width: 4}
  fmt.Printf("Type of r: %T, Area: %v, Perimeter: %v.", r, r.Area(), r.Perimeter())
}
```