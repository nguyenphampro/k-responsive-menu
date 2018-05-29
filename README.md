##Demo 

k-responsive-menu is a lightweight jQuery plugin to create responsive multi-level navigation menus with multi device support

http://baonguyenyam.github.io/docs/k-responsive-menu/

---

#Install

***Via Bower:***
```
bower install --save k-responsive-menu 
```
___

#Run

***Auto:***

```js
$(document).ready(function() {
  $('.auto').kAnimation({
    ClassName: 'animated fadeInUp',
    Animation: [
      'fadeIn',
      'fadeOutUp',
    ],
    Delay: 1000,
    Forever: true,
    DelayForever: 3000
  });
});
```
***Click:***

```js
$(document).ready(function() {
  $('.click').kAnimation({
    ClassName: 'animated',
    Animation: 'fadeInUp',
    Type: 'Click',
    Forever: true,
    DelayForever: 100
  });
});
```

***Hover:***

```js
$(document).ready(function() {
  $('.hover').kAnimation({
    ClassName: 'animated',
    Animation: 'fadeInUp',
    Type: 'Hover',
    Forever: true,
    DelayForever: 100
  });
});
```

***Scroll:***

```js
$(document).ready(function() {
  $(".scroll").kAnimation({
    ClassName: 'animated',
    Animation: 'fadeInUp',
    Delay: 2000,
    ScrollLoop: true,
    Type: 'Scroll'
  });
});
```

***Event:***

```js
$(document).ready(function() {
  $('.events').kAnimation({
    ClassName: 'animated fadeInUp',
    Animation: [
      'fadeIn',
      'fadeOutUp',
    ],
    Delay: 1000,
    Forever: true,
    DelayForever: 3000,
    onComplete: function(){
      $(this).html('Text changed');
    },
    onClick: function(){
      alert('Clicked');
    },
    onChange: function(){
      console.log('onChange');
    },
    onBegin: function(){
      console.log('onBegin');
    },
    onHover: function(){
      alert('onHover');
    },
    unHover: function(){
      alert('unHover');
    }
  });
});
```

###Via HTML Tag

####HTML

```html
<p k-responsive-menu="animated fadeInUp" k-class="fadeIn, fadeOutUp" k-delay="1000" k-forever="true" k-delayforever="3000" k-type="Auto">Auto Animation </p>
```
```js
$('[k-Animation]').kAnimation();
```

## Licence

Copyright &copy; 2016 Bao Nguyen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

#### Bảo Nguyên
