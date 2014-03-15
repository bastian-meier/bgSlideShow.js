bgSlideShow.js
==============

tiny background slideshow without dependencies and **less than 3kb filesize**
It works with css-classes you define yourself, so it is very flexible.
You can use:

* Fullsize background-images
* tiled background-images
* background-color
* css3 background-gradients
* . . .

## Demo
[demo](http://bastian-meier.github.io/bgSlideShow.js/)

## Usage

include the js and the css files
```html
<link href="BgSlideShow.min.css" rel="stylesheet" />
<script src="BgSlideShow.min.js"></script>
```

define your background-classes, for example
```css
.bg-image{
    background: url(img/bg-image.jpg);
    background-size: cover;
}

.bg-css3-gradient{
    background: #f0b7a1; /* Old browsers */
    background: -moz-linear-gradient(-45deg, #f0b7a1 0%, #8c3310 50%, #752201 51%, #bf6e4e 100%); /* FF3.6+ */
    background: -webkit-gradient(linear, left top, right bottom, color-stop(0%,#f0b7a1), color-stop(50%,#8c3310), color-stop(51%,#752201), color-stop(100%,#bf6e4e)); /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(-45deg, #f0b7a1 0%,#8c3310 50%,#752201 51%,#bf6e4e 100%); /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(-45deg, #f0b7a1 0%,#8c3310 50%,#752201 51%,#bf6e4e 100%); /* Opera 11.10+ */
    background: -ms-linear-gradient(-45deg, #f0b7a1 0%,#8c3310 50%,#752201 51%,#bf6e4e 100%); /* IE10+ */
    background: linear-gradient(135deg, #f0b7a1 0%,#8c3310 50%,#752201 51%,#bf6e4e 100%); /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f0b7a1', endColorstr='#bf6e4e',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}

.bg-image-repeat{
    background: url(img/bg-image-repeat.jpg);
    background-repeat: repeat;
}

.bg-color{
    background-color: #3B3627;
}
```

tell BgSlideShow.js what to do
* **className**: the name of the background-class you defined
* **duration**: how long the class should be active (in ms)
```js
var bg = new BgSlideShow([
    {className: 'bg-image', duration: 4000},
    {className: 'bg-color', duration: 4000},
    {className: 'bg-css3-gradient', duration: 4000}
]);
```

you can also add a single object
```js
var bg = new BgSlideShow();
bg.addAnimation({className: 'bg-image-repeat', duration: 4000});
```

## License
BgSlideShow.js is licensed under the MIT license. (http://opensource.org/licenses/MIT)