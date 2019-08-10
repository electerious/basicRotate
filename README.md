# basicRotate

[![Dependencies](https://david-dm.org/electerious/basicrotate.svg)](https://david-dm.org/electerious/basicrotate.svg#info=dependencies) [![Donate via PayPal](https://img.shields.io/badge/paypal-donate-009cde.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CYKBESW577YWE)

Rotate throw a set of 360 degree images using your mouse or finger.

## Contents

- [Demos](#demos)
- [Features](#features)
- [Requirements](#requirements)
- [Setup](#setup)
- [Usage](#usage)
- [API](#api)
- [Instance API](#instance-api)
- [Options](#options)

## Demos

| Name | Description | Link |
|:-----------|:------------|:------------|
| Default | Includes most features. | [Try it on CodePen](http://codepen.io/electerious/pen/GjpXRX) |

## Features

- Works in all modern browsers and IE11 ([with polyfills](#requirements))
- Supports any kind of images
- Zero dependencies
- CommonJS and AMD support
- Simple JS API

## Requirements

basicRotate depends on the following browser APIs:

- [Node​List​.prototype​.for​Each](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach)
- [Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite)
- [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

Some of these APIs are capable of being polyfilled in older browsers. Check the linked resources above to determine if you must polyfill to achieve your desired level of browser support.

## Setup

We recommend installing basicRotate using [npm](https://npmjs.com) or [yarn](https://yarnpkg.com).

```sh
npm install basicrotate
```

```sh
yarn add basicrotate
```

Include the CSS file in the `head` tag and the JS file at the end of your `body` tag…

```html
<link rel="stylesheet" href="dist/basicRotate.min.css">
```

```html
<script src="dist/basicRotate.min.js"></script>
```

…or skip the JS file and use basicRotate as a module:

```js
const basicRotate = require('basicrotate')
```

```js
import * as basicRotate from 'basicrotate'
```

## Usage

Create an element filled with equal-sized images. Add the `basicRotate` class and initialize basicRotate using the `basicRotate.create` function. That's it!

```html
<div class="basicRotate">
	<img src="1.jpg">
	<img src="2.jpg">
	<img src="3.jpg">
	<!-- ... -->
</div>
```

```js
basicRotate.create(document.querySelector('.basicRotate'))
```

## API

### .create(elem, opts)

Creates a new basicRotate instance.

Be sure to assign your instance to a variable. Using your instance, you can…

* …get the current image index.
* …jump back and forward.
* …goto a specific image.

Examples:

```js
const instance = basicRotate.create(document.querySelector('#rotate'))
```

```js
const instance = basicRotate.create(document.querySelector('#rotate'), {
	index: 1,
	tolerance: 5
})
```

```js
const instance = basicRotate.create(document.querySelector('#rotate'), {
	beforeChange: (instance, newIndex, oldIndex) => console.log('beforeChange', instance, newIndex, oldIndex),
	afterChange: (instance, newIndex, oldIndex) => console.log('afterChange', instance, newIndex, oldIndex)
})
```

Parameters:

- `elem` `{Node}` The DOM element/node which contains all images.
- `opts` `{?Object}` An object of [options](#options).

Returns:

- `{Object}` The created instance.

## Instance API

Each basicRotate instance has a handful of handy functions. Below are all of them along with a short description.

### .current()

Returns the current image index.

Example:

```js
const current = instance.current()
```

Returns:

- `{Number}` Current image index.

### .goto(newIndex)

Navigates to an image by index and executes the beforeChange and afterChange callback functions.

Example:

```js
instance.goto(0)
```

Parameters:

- `newIndex` `{Number}` Index of the image to be displayed.

### .prev()

Navigates to the previous image and executes the beforeChange and afterChange callback functions.

Example:

```js
instance.prev()
```

### .next()

Navigates to the next image and executes the beforeChange and afterChange callback functions.

Example:

```js
instance.next()
```

## Options

The option object can include the following properties:

```js
{
	/*
	 * Initial image.
	 */
	index: 0,
	/*
	 * Rotate image by dragging.
	 */
	draggable: true,
	/*
	 * Dragging tolerance.
	 * Small number (1) = Very sensitive = Fast.
	 * Large number (∞) = Very insensitive = Slow.
	 */
	tolerance: 10,
	/*
	 * Dragging direction.
	 * x (or basicRotate.DIRECTION_X) = Detect movements on the x-axis.
	 * y (or basicRotate.DIRECTION_Y) = Detect movements on the y-axis.
	 */
	index: 'x',
	/*
	 * Callback functions.
	 * Returning false will stop the caller function and prevent the image from changing.
	 */
	beforeChange: (instance, newIndex, oldIndex) => {},
	afterChange: (instance, newIndex, oldIndex) => {}
}
```