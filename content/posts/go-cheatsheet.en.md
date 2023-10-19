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

Go, also known as Golang, is a programming language created by Google. It's an open-source language known for its exceptional performance and efficiency, making it ideal for developing server-side software, developer tools, and web applications. Thanks to its simplicity, Go is becoming increasingly popular for building scalable and high-performance web applications and microservices.

## Useful Links

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
## Variables

```go
var msg string
var msg = "Hello, world!"
var msg string = "Hello, world!"
var x, y int
var x, y int = 1, 2
var x, msg = 1, "Hello, world!"
msg = "Hello"

Declaration of a list

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

Constants can be character, string, boolean, or numeric values.
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
Arrays have a defined size
```go
// var numbers [5]int
numbers := [...]int{0, 0, 0, 0, 0}
```

### Slices
Slices have dynamic size unlike arrays
```go
slice := []int{2, 3, 4}

slice := []byte("Hello")

```

### Pointers
Pointers point to a memory location of a variable
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
A condition in an if statement can be preceded with a statement before a ;. Variables declared by the statement are only in scope until the end of the if.
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
### For Loop
```go
for count := 0; count <= 10; count++ {
  fmt.Println("My counter is at", count)
}
```
### For-Range Loop
```go
entry := []string{"Jack","John","Jones"}
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
### Multiple Return Types
```go
a, b := getMessage()

func getMessage() (a string, b string) {
  return "Hello", "World"
}
```
### Named Return Values

By defining the return value names in the signature, a return (no args) will return variables with those names.
```go
func split(sum int) (x, y int) {
  x = sum * 4 / 9
  y = sum - x
  return
}
```

## Packages

### Importing
```go
import "fmt"
import "math/rand"

import (
  "fmt"        // gives fmt.Println
  "math/rand"  // gives rand.Intn
)

```
Both cases are the same

### Aliases
```go

import r "math/rand"

r.Intn()

```
### Packages

Every package file has to start with package.

```go
package hello

```
### Exporting Names

Exported names begin with capital letters.
```go
func Hello () {
  ···
}
```
