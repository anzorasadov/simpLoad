simpLoad.js
========

## Description
A simple, universal AJAX spinner that just needs to know when to start. Here's a [demo](http://anzorasadov.github.com/simpLoad/).


## Instructions

#### 1. Download
Simply add [simpLoad.js](https://github.com/anzorasadov/simpLoad/blob/master/simpLoad.js) to your Project after jQuery. No additional CSS or images needed.

#### 2. Initialize
Select an element (or multiple elements), that you want to apply the simpLoad spinner to and perform the "start" command like this:
```
$('#myElement').simpLoad('start');
```
To stop the spinner just replace 'start' with 'stop':
```
$('#myElement').simpLoad('stop');
```
