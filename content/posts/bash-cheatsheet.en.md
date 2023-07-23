---
title: "Bash Cheatsheet"
date: 2023-07-21T21:22:03+02:00
draft: false
author: ["Adam"]
cover:
    image: img/blog/bash.webp
    alt: 'bash'

tags: ["tech","www","bash"] 
categories: ["www","tech","bash"]
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "Start writting shell scripts!"
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

## What is Bash?

Bash is a so-called Linux shell. It is nothing more than a program that allows us to communicate with the system. There are various shells for the Linux system, but Bash is by far the most popular. For countless users, it is a fundamental tool for their work.

## What can I do with the BASH shell?

Everything! It would be easier to list what you cannot do.

Think of any task that takes a lot of time in the Linux system. Now, imagine that you can easily automate that task using Bash.

With Bash scripts, you can, for example:

* Create your own commands
* Perform calculations
* Manipulate files
* Automate tasks

And much more :)
## How to start writing shell scripts?

Below are a few excellent resources to begin your journey with shell scripts:

- [Learn Bash in Y Minutes!](https://learnxinyminutes.com/docs/bash/)
- [Bash Guide](https://mywiki.wooledge.org/BashGuide)
- [Bash for Hackers!](https://web.archive.org/web/20230406205817/https://wiki.bash-hackers.org/)

## Sample script

```bash
#!/usr/bin/env bash

name="John"
echo "Hello $name!"
```

## Variables

```bash
name="John"
echo $name       # see below
echo "$name"
echo "${name}!"
```

## Conditional Execution

```bash
git commit && git push
git commit || echo "Commit failed"
```

## Conditions

```bash
if [[ -z "$string" ]]; then
  echo "String is empty"
elif [[ -n "$string" ]]; then
  echo "String is not empty"
fi
```

## String types

```bash
name="John"
echo "Hi $name"  #=> Hi John
echo 'Hi $name'  #=> Hi $name
```

## Command Substitution

```bash
echo "I'm in $(pwd)"
echo "I'm in `pwd`" 
```

## Strict Mode

```bash
set -euo pipefail
IFS=$'\n\t'
```

## Functions

```bash
get_name() {
  echo "John"
}

echo "You are $(get_name)"
```

## Function Definitions

```bash
myfunc() {
    echo "hello $1"
}

# Same, but a different syntax
function myfunc() {
    echo "hello $1"
}

myfunc "John"
```

## Returning Values

```bash
myfunc() {
    local myresult='some value'
    echo "$myresult"
}

result=$(myfunc)
```

## Function Arguments

```bash
$# 	# Number of arguments
$* 	# All positional parameters as a single word
$@ 	# All positional parameters as separate strings
$1 	# The first argument
$_ 	# The last argument of the previous command
${PIPESTATUS[n]} 	# An array containing the exit status of each command in the pipeline
```

## Errors

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

## Brace Expansion

```bash
echo {A,B}.js

{A,B}    # Same as A B
{A,B}.js    # Same as A.js B.js
{1..5}    # Same as 1 2 3 4 5
```

## Parameter Expansion

```bash
name="John"
echo "${name}"
echo "${name/J/j}"    #=> "john" (replace)
echo "${name:0:2}"    #=> "Jo" (substring)
echo "${name::2}"     #=> "Jo" (substring)
echo "${name::-1}"    #=> "Joh" (substring)
echo "${name:(-1)}"   #=> "n" (substring from the right)
echo "${name:(-2):1}" #=> "h" (substring from the right)
echo "${food:-Cake}"  #=> $food or "Cake"

length=2
echo "${name:0:length}"  #=> "Jo"
```
[See: Parameter Expansion](https://web.archive.org/web/20230408142504/https://wiki.bash-hackers.org/syntax/pe)

```bash
str="/path/to/foo.cpp"
echo "${str%.cpp}"    # /path/to/foo
echo "${str%.cpp}.o"  # /path/to/foo.o
echo "${str%/*}"      # /path/to

echo "${str##*.}"     # cpp (extension)
echo "${str##*/}"     # foo.cpp (base name)

echo "${str#*/}"      # path/to/foo.cpp
echo "${str##*/}"     # foo.cpp

echo "${str/foo/bar}" # /path/to/bar.cpp

str="Hello world"
echo "${str:6:5}"   # "world"
echo "${str: -5:5}"  # "world"

src="/path/to/foo.cpp"
base=${src##*/}   #=> "foo.cpp" (base name)
dir=${src%$base}  #=> "/path/to/" (directory path)
```

## Variable Replacement

```bash
${foo%suffix}    # Remove suffix
${foo#prefix}    # Remove prefix
${foo%%suffix}    # Remove long suffix
${foo/%suffix}    # Remove long suffix
${foo##prefix}    # Remove long prefix
${foo/#prefix}    # Remove long prefix
${foo/from/to}    # Replace first match
${foo//from/to}    # Replace all matches
${foo/%from/to}    # Replace suffix
${foo/#from/to}    # Replace prefix
```

## Comments

```bash
# Single line comment
: '
This is
a multi-line
comment
'
```

## Substrings

```bash
${foo:0:3}
${foo:(-3):3}
```

## Length

```bash
${#foo}    # Length of $foo
```

## Default Values

```bash
${foo:-val}    # $foo or val if unset (or empty)
${foo:=val}    # Set $foo to val if unset (or empty)
${foo:+val}    # val if $foo is set (and not empty)
${foo:?message}    # Display error message and exit if $foo is unset (or empty)

Using colon (:), removes the checking (un)set, e.g. ${foo-val} will return val if $foo is unset, otherwise $foo.
```

## Loops

### For loop

```bash
for i in /etc/rc.*; do
  echo "$i"
done
```

### C-style for loop

```bash
for ((i = 0 ; i < 100 ; i++)); do
  echo "$i"
done
```

### Read lines in a loop

```bash
while read -r line; do
  echo "$line"
done <file.txt
```

### Infinite loop

```bash
while true; do
  ···
done
```

### Ranges

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

## Conditions

```bash
[[ -z STRING ]]    # Empty string
[[ -n STRING ]]    # Non-empty string
[[ STRING == STRING ]]    # Equal
[[ STRING != STRING ]]    # Not equal
[[ NUM -eq NUM ]]    # Equal
[[ NUM -ne NUM ]]    # Not equal
[[ NUM -lt NUM ]]    # Less than
[[ NUM -le NUM ]]    # Less than or equal
[[ NUM -gt NUM ]]    # Greater than
[[ NUM -ge NUM ]]

    # Greater than or equal
[[ STRING =~ STRING ]]    # Regular expression match
(( NUM < NUM ))    # Numeric conditions
[[ -o noclobber ]]    # If option OPTIONNAME is set
[[ ! EXPR ]]    # Negation
[[ X && Y ]]    # AND
[[ X || Y ]]    # OR
```

## File Conditions

```bash
[[ -e FILE ]]    # Exists
[[ -r FILE ]]    # Readable
[[ -h FILE ]]    # Symbolic link
[[ -d FILE ]]    # Directory
[[ -w FILE ]]    # Writable
[[ -s FILE ]]    # Size is greater than zero
[[ -f FILE ]]    # File
[[ -x FILE ]]    # Executable
[[ FILE1 -nt FILE2 ]]    # FILE1 is newer than FILE2
[[ FILE1 -ot FILE2 ]]    # FILE2 is newer than FILE1
[[ FILE1 -ef FILE2 ]]    # Same files
```

## Example Conditions

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

## Arrays
### Declarations

```bash
Fruits=('Apple' 'Banana' 'Orange')

Fruits[0]="Apple"
Fruits[1]="Banana"
Fruits[2]="Orange"
```

### Working with Arrays

```bash
echo "${Fruits[0]}"           # Element #0
echo "${Fruits[-1]}"          # Last element
echo "${Fruits[@]}"           # All elements, space-separated
echo "${#Fruits[@]}"          # Number of elements
echo "${#Fruits}"             # Length of first element
echo "${#Fruits[3]}"          # Length of the Nth element
echo "${Fruits[@]:3:2}"       # Range (starting from position 3, length 2)
echo "${!Fruits[@]}"          # Keys of all elements, space-separated
```

### Array Operations

```bash
Fruits=("${Fruits[@]}" "Watermelon")    # Add
Fruits+=('Watermelon')                  # Same, add
Fruits=( "${Fruits[@]/Ap*/}" )          # Remove by regex match
unset Fruits[2]                         # Remove one element
Fruits=("${Fruits[@]}")                 # Duplicate
Fruits=("${Fruits[@]}" "${Veggies[@]}") # Merge two arrays
lines=(`cat "logfile"`)                 # Read from file
```

### Iterating over an Array

```bash
for i in "${arrayName[@]}"; do
  echo "$i"
done
```

## Dictionaries (Associative Arrays)
### Declarations

```bash
declare -A sounds

sounds[dog]="bark"
sounds[cow]="moo"
sounds[bird]="tweet"
sounds[wolf]="howl"
```

Declares "sounds" as a dictionary (associative array).

### Working with Dictionaries

```bash
echo "${sounds[dog]}"    # Dog sound

echo "${sounds[@]}"      # All values
echo "${!sounds[@]}"     # All keys
echo "${#sounds[@]}"     # Number of elements
unset sounds[dog]        # Remove dog key
```

### Iterating over a Dictionary

```bash
# Iterate over values
for val in "${sounds[@]}"; do
  echo "$val"
done

# Iterate over keys
for key in "${!sounds[@]}"; do
  echo "$key"
done
```

## Options
```bash
set -o noclobber    # Avoid overwriting files (echo "hi" > foo)
set -o errexit      # Exit on error, avoiding cascading errors
set -o pipefail     # Show hidden errors
set -o nounset      # Treat unset variables as errors
```

## Global Options
```bash
shopt -s nullglob      # Non-matching globs are removed ('*.foo' => '')
shopt -s failglob      # Non-matching globs cause errors
shopt -s nocaseglob    # Case-insensitive globs
shopt -s dotglob       # Wildcards match files with dots ("*.sh" => ".foo.sh")
shopt -s globstar      # Allows ** for recursive matches ('lib/**/*.rb' => 'lib/a/b/c.rb')
```

Set `GLOBIGNORE` as a colon-separated list of patterns to be excluded from globbing.

## Numeric Calculations
```bash
$((a + 200))      # Add 200 to $a

$(($RANDOM%200))  # Random number from 0 to 199

declare -i count  # Declare a variable as an integer
count+=1          # Increment the count variable
```

## Subshells
```bash
(pwd; echo "Now I am in: $PWD")
pwd  # Still in the original directory
```

## Checking Command Existence
```bash
command -V cd
#=> "cd is a function/alias/something"
```

## Trap Errors
```bash
trap 'echo Error at line $LINENO' ERR

or

traperr() {
  echo "ERROR: ${BASH_SOURCE[1]} in line ${BASH_LINENO[0]}"
}

set -o errtrace
trap traperr ERR
```

## Case/Switch
```bash
case "$1" in
  start | up)
    vagrant up
    ;;

  *)
    echo "Usage: $0 {start|stop|ssh}"
    ;;
esac
```

## Relative Sourcing
```bash
source "${0%/*}/../share/foo.sh"
```

## Getting Options
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

## Here Document
```bash
cat <<END
hello world
END
```

## Reading Input
```bash
echo -n "Continue? [y/n]: "
read -r ans
echo "$ans"

The -r option disables the special meaning of the backslash.
```

## Special Variables
```bash
$?    # Exit status of the last command
$!    # PID of the last background command
$$    # PID of the shell (current script)
$0    # Name of the current script
$_    # Last argument of the previous command
${PIPESTATUS

[n]}    # An array containing the exit status of each command in the pipeline
```

See Special Parameters.

## Return to Previous Directory
```bash
pwd    # /home/user/foo
cd bar/
pwd    # /home/user/foo/bar
cd -
pwd    # /home/user/foo
```

## Checking Command Results
```bash
if ping -c 1 google.com; then
  echo "Seems like you have a working internet connection"
fi
```

## Checking with grep
```bash
if grep -q 'foo' ~/.bash_history; then
  echo "You typed 'foo' in the past"
fi
```