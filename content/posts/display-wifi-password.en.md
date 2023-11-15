---
title: "How to display Wifi password?"
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
description: "How to display Wifi pass?"
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
## On Windows
If your operating system is Windows

### What is CMD?

CMD is a command-line translation tool in the Windows operating system. Windows OS has a command-line translation tool called CMD, which is used to create embedded references. Most of those commands use batch documents and files to automate tasks, perform high-level administrative tasks, and troubleshoot or resolve certain Windows issues.

Windows Command Processor is the official name of the command prompt, also known as command shell, cmd prompt, or by its file name, cmd.exe.

### Open CMD as Administrator

Then type the command:
```md
netsh wlan show profile name="Network name" key=clear
```
and press Enter.

The Wi-Fi password will be displayed in a field labeled "Key Content" in the "Security Settings" section.

## On Mac OS

In the Mac OS operating system, we can find passwords for saved Wi-Fi networks using the terminal.

### Open the Terminal

Then type:
```md
security find-generic-password -wa "Wi-Fi-Network-Name"
```
and confirm with your password.

This method works only for networks that were previously saved on your device.

## On Linux

### Open the Terminal

Then type:
```md
sudo cat /etc/NetworkManager/system-connections/* | grep psk
```
Similar to MacOS and Windows, this will work only if the device was previously connected to the network.

## Conclusions

People can be forgetful, but from now on, you don't have to worry about remembering your Wi-Fi passwords. You'll be able to recover your Wi-Fi password from any Windows/Mac/Linux operating system.