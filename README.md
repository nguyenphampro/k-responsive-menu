# Demo 

k-responsive-menu is a lightweight jQuery plugin to create responsive multi-level navigation menus with multi device support

http://baonguyenyam.github.io/k-responsive-menu/

---

# Install

***Via Bower:***
```
bower install --save k-responsive-menu 
```
___

***Install:***

```html
<link rel="stylesheet" type="text/css" href="bower_components/k-responsive-menu/dist/css/k-responsive-menu.css">
```

```html
<script src="bower_components/k-responsive-menu/dist/js/k-responsive-menu.js"></script>
```

***JS:***

```js
$(document).ready(function() {
  $('#demoResAllInOneMenu').kResponsiveMenu({
    animationSpeed: 'slow', // slow, fast, 200
    resizeWidth: 800, // 'xs', 'sm', 'md', 'lg', 'xl', 480,
    menuIcon: '<i class="fa fa-bars"></i>'
  });
});
```
***HTML:***

```html
<header class="bg-light">
  <div class="k-menu-bar container">
    <div id="logo" class="mr-auto"></div>
    <button k-toggle-for="#demoResAllInOneMenu" class="k-menu-toggle navbar-toggler">MENU</button>
  </div>
  <div id="demoResAllInOneMenu" class="container">
    <div k-menu-map-to="#logo" class="k-logo navbar-brand">LOGO</div>
    <ul class="nav">
      <li class="nav-item"><a href="#" class="nav-link">About us</a></li>
      <li class="nav-item"><a href="#" class="nav-link">Services</a></li>
      <li class="nav-item dropdown"><a id="navbarDropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="nav-link dropdown-toggle">Dropdown</a>
        <div aria-labelledby="navbarDropdown" class="dropdown-menu"><a href="#" class="dropdown-item">Action</a><a href="#" class="dropdown-item">Another action</a>
          <div class="dropdown-divider"></div><a href="#" class="dropdown-item">Something else here</a>
        </div>
      </li>
      <li class="nav-item"><a href="#" class="nav-link">Shop</a></li>
      <li class="nav-item"><a href="#" class="nav-link">Contact us</a></li>
    </ul>
  </div>
</header>
```


## Licence

Copyright &copy; 2018 Bao Nguyen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

#### Bảo Nguyên
