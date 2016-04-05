# PinchZoom.js

This is a small, vanilla JS library to make an DOM object zoomable via a pinch gesture. It will only scale the given
object and not influence any other DOM object. It keeps all other browser default behaviour.

It was made to work around the missing ``position: device-fixed`` as proposed by
[PPK](http://www.quirksmode.org/blog/archives/2010/12/the_fifth_posit.html). The 
[demo](http://cosmocode.github.io/pinchzoom) shows how it can be used to
create a device fixed header, while still having a scrollable and zoomable content area.

## Usage

The PinchZoom function expects a DOM object as a first parameter - that node needs to be in a scrollable container. That
can be the document body itself (like in the demo) or any other DOM node. Be sure to explicitly set ''overflow: auto''
on that node or you will have problems in iOS 9!

Your document should disable all Browser zooming gestures:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
```

A second parameter is optional you can use it to set the minimum and maximum scale:

```javascript
PinchZoom(document.getElementById('content', {minScale: 0.5, maxScale: 3}); 
```

You can also set a ``debug`` function which will be passed the internal input object - to see what the current state
is. See the demo for an example.

## License (MIT)

Copyright (c) 2016 Andreas Gohr, CosmoCode GmbH <gohr@cosmocode.de>


Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions
of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.