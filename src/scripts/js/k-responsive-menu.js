/*
 * Project: k-responsiv-menu is a lightweight jQuery plugin to create responsive multi - level navigation menus with multi device support
 *  Author: Bao Nguyen
 *  License: MIT
 *  Website: http://baonguyenyam.github.io
 *  Version: 1.0.0
 */

;
(function ($, window, document, undefined) {
    var kA = 'kResponsiveMenu'

    function kaGlobal(element, options, type) {
        this.element = element
        this._name = kA
        this._defaults = $.fn.kResponsiveMenu.defaults
        this.options = $.extend({}, this._defaults, options)
        this.init()
    }

    $.extend(kaGlobal.prototype, {

        init: function () {
            this.bindEvents()
            this.onComplete()
        },
        destroy: function () {
            this.unbindEvents()
            this.element.removeData()
        },

        bindEvents: function () {
            var plugin = this
            this.element = $(this.element)
            var $e, $o, $d, $i, $p, $pw, $pp, $sl, $bd,
                getAttr = this.element.attr('k-responsive-menu')
            if (getAttr && getAttr.length > 0) {
                // Khai báo bởi Attr
                $e = this.element,
                    $o = $e.attr('k-menu-resize') ? isNaN($e.attr('k-menu-resize')) ? $e.attr('k-menu-resize') : parseInt($e.attr('k-menu-resize')) : this.options.resizeWidth,
                    $d = $e.attr('k-menu-type') ? $e.attr('k-menu-type').toLocaleLowerCase() : this.options.menuType,
                    $i = $e.attr('k-menu-icon') ? $e.attr('k-menu-icon').toLocaleLowerCase() : this.options.menuIcon,
                    $p = $e.attr('k-menu-push') ? $e.attr('k-menu-push').toLocaleLowerCase() : this.options.menuPush,
                    $pp = $e.attr('k-menu-position') ? $e.attr('k-menu-position').toLocaleLowerCase() : this.options.menuPushPosition,
                    $pw = $e.attr('k-menu-width') ? $e.attr('k-menu-width').toLocaleLowerCase() : this.options.menuPushWidth,
                    $sl = $e.attr('k-menu-speed') ? isNaN($e.attr('k-menu-speed')) ? $e.attr('k-menu-speed') : parseInt($e.attr('k-menu-speed')) : this.options.animationSpeed;
                $bd = $e.attr('k-menu-backdrop') ? Boolean($e.attr('k-menu-backdrop')) : this.options.menuBackDrop;
            } else {
                // Khai báo bởi JS
                $e = this.element,
                    $o = this.options.resizeWidth,
                    $d = this.options.menuType,
                    $i = this.options.menuIcon,
                    $p = this.options.menuPush,
                    $pp = this.options.menuPushPosition,
                    $pw = this.options.menuPushWidth,
                    $sl = this.options.animationSpeed,
                    $bd = this.options.menuBackDrop
            }
            // Add Class Default
            $e.addClass('k-responsive-menu')
            $e.addClass('k-menu-' + $d)

            // DO MENU 
            var nguyenApp = {
                resizeTimer: null,
                doBackDrop: function () {
                    if (!$bd) {} else {
                        $('body').append('<div class="k-menu-backdrop"></div>');
                    }
                },
                doMenuPush: function () {
                    // Hiển thị
                    // Left   => return 1
                    // Right    => return 2
                    return "left" === $p ? $p : "right" === $p ? $p : null
                },
                doMenuType: function () {
                    // Loại menu
                    // Accordion   => return 1
                    // Vertical    => return 2
                    // Horizontal  => return 3
                    return "accordion" === $d ? 1 : "vertical" === $d ? 2 : 3
                },
                doMenuSpeed: function () {
                    // Tốc độ chuyển đổi
                    // Number       => Return number 
                    // Slow, Fast   => Return string
                    return "number" == typeof $sl ? parseInt($sl) : "string" == typeof $sl ? $sl : void 0
                },
                doChangeMenu: function () {
                    // Kích thước sẽ thay đổi menu
                    // Number                         => Return number 
                    // 'xs', 'sm', 'md', 'lg', 'xl'   => Return number
                    if ("number" == typeof $o) return parseInt($o);
                    if ("string" == typeof $o) {
                        var o;
                        return o = "xs" === $o ? 0 : "sm" === $o ? 576 : "md" === $o ? 768 : "lg" === $o ? 992 : "xl" === $o ? 1200 : 0, parseInt(o)
                    }
                },
                menuBar: function () {
                    var __speed = this.doMenuSpeed(),
                        __type = this.doMenuType()
                    $i && 0 < $i.length && $(".k-menu-toggle").html($i);
                    var toggle = 0;
                    if (__type == 3 && this.doMenuPush()) {
                        $e.addClass('k-menu-push-' + this.doMenuPush())
                    }
                    $('.k-menu-toggle').on('click', function (event) {
                        event.preventDefault();
                        var el = $(this)
                        var getFather = $(this).attr('k-toggle-for')
                        if (toggle == 1) {
                            $(this).removeClass('active')
                            switchMenu(getFather, toggle, el)
                            toggle = 0;
                        } else {
                            $(this).addClass('active')
                            switchMenu(getFather, toggle, el)
                            toggle = 1;
                        }
                    });

                    var switchMenu = function (getFather, toggle, el) {
                        if (__type == 3) {
                            if ($p) {
                                $('.k-menu-backdrop').addClass('active').bind('click', function () {
                                    $(this).removeClass('active')
                                    $(el).removeClass('active')
                                    if ($p === 'right') {
                                        var n = $(getFather).css("right");
                                        $(getFather).animate({
                                            right: "-" + $pw,
                                        }, {
                                            duration: __speed,
                                            complete: function () {}
                                        })
                                    } else {
                                        var n = $(getFather).css("left");
                                        $(getFather).animate({
                                            left: "-" + $pw,
                                        }, {
                                            duration: __speed,
                                            complete: function () {}
                                        })
                                    }
                                    $(this).unbind()
                                })
                                if ($p === 'right') {
                                    var n = $(getFather).css("right");
                                    if (n != '0px') {
                                        $(getFather).animate({
                                            right: "0",
                                        }, {
                                            duration: __speed,
                                            complete: function () {}
                                        })
                                    } else {
                                        $(getFather).animate({
                                            right: "-" + $pw,
                                        }, {
                                            duration: __speed,
                                            complete: function () {}
                                        })
                                    }
                                } else {
                                    var n = $(getFather).css("left");
                                    if (n != '0px') {
                                        $(getFather).animate({
                                            left: "0",
                                        }, {
                                            duration: __speed,
                                            complete: function () {}
                                        })
                                    } else {
                                        $(getFather).animate({
                                            left: "-" + $pw,
                                        }, {
                                            duration: __speed,
                                            complete: function () {}
                                        })
                                    }
                                }
                            } else {
                                $(getFather).slideToggle(__speed)
                            }
                        }
                    }


                },
                doResponsiveMenu: function () {
                    var getchange = 0,
                        __type = this.doMenuType(),
                        __change = this.doChangeMenu();
                    getchange != __change && (getchange = __change);
                    if (__type == 3 && $p) {
                        $e.css({
                            "display": "block",
                            "position": $pp,
                            "width": $pw
                        })
                        if ($p === 'right') {
                            $e.css({
                                "right": "-" + $pw
                            })
                        } else {
                            $e.css({
                                "left": "-" + $pw
                            })
                        }
                    }
                    // Add or Remove Class on Screen
                    if ($(window).innerWidth() >= getchange) {
                        if (__type == 3) {
                            this.makeHorizontalPC()
                        }
                    } else {
                        if (__type == 3) {
                            this.makeHorizontalMobile()
                        }
                    }
                },
                makeHorizontalPC: function () {
                    this.doMapBack()
                    $e.removeClass('k-active').removeAttr('style')
                    $('.k-menu-bar').hide()
                },
                makeHorizontalMobile: function () {
                    this.doMapTo()
                    $e.addClass('k-active')
                    $('.k-menu-bar').show()
                },
                doMapTo: function () {
                    $('[k-menu-map-to]').each(function () {
                        var getTo = $(this).attr('k-menu-map-to')
                        $(getTo).html($(this).clone().removeAttr('k-menu-map-to').show())
                        $(this).hide()
                    })
                },
                doMapBack: function () {
                    $('[k-menu-map-to]').each(function () {
                        var getTo = $(this).attr('k-menu-map-to')
                        $(getTo).html('')
                        $(this).show()
                    })
                }
            }

            nguyenApp.menuBar()
            nguyenApp.doBackDrop()
            nguyenApp.doResponsiveMenu()

            plugin.element.on('click' + '.' + plugin._name, function () {
                plugin.onClick.call(plugin)
            })
            plugin.element.on('mouseover' + '.' + plugin._name, function () {
                plugin.onHover.call(plugin)
            })
            plugin.element.on('mouseleave' + '.' + plugin._name, function () {
                plugin.unHover.call(plugin)
            })
            $(window).resize(function () {
                nguyenApp.doResponsiveMenu()
                plugin.onResize.call(plugin)
                clearTimeout(nguyenApp.resizeTimer);
                nguyenApp.resizeTimer = setTimeout(function () {
                    plugin.onResizeEnd.call(plugin)
                }, 200);
            })
        },

        unbindEvents: function () {
            this.element.off('.' + this._name)
        },

        onResize: function () {
            var onResize = this.options.onResize
            if (typeof onResize === 'function') {
                onResize.call(this.element)
            }
        },

        onResizeEnd: function () {
            var onResizeEnd = this.options.onResizeEnd
            if (typeof onResizeEnd === 'function') {
                onResizeEnd.call(this.element)
            }
        },

        onClick: function () {
            var onClick = this.options.onClick

            if (typeof onClick === 'function') {
                onClick.call(this.element)
            }
        },

        onHover: function () {
            var onHover = this.options.onHover

            if (typeof onHover === 'function') {
                onHover.call(this.element)
            }
        },

        unHover: function () {
            var unHover = this.options.unHover

            if (typeof unHover === 'function') {
                unHover.call(this.element)
            }
        },

        onBegin: function () {
            var onBegin = this.options.onBegin

            if (typeof onBegin === 'function') {
                onBegin.call(this.element)
            }
        },

        onComplete: function () {
            var onComplete = this.options.onComplete

            if (typeof onComplete === 'function') {
                onComplete.call(this.element)
            }
        },

        onChange: function () {
            var onChange = this.options.onChange

            if (typeof onChange === 'function') {
                onChange.call(this.element)
            }
        }

    })

    // Click Toggle
    $.fn.clickToggle = function (a, b) {
        function cb() {
            [b, a][this._tog ^= 1].call(this)
        }
        return this.on('click', cb)
    }
    // Build MENU 

    $.fn.kResponsiveMenu = function (options) {
        this.each(function () {
            if (!$.data(this, 'kResponsiveMenu_' + kA)) {
                $.data(this, 'kResponsiveMenu_' + kA, new kaGlobal(this, options, 'initial'))
            }
        })
        return this
    }



    $.fn.kResponsiveMenu.defaults = {
        animationSpeed: 'slow', // slow, fast, 200
        resizeWidth: 768,
        menuType: 'horizontal', // horizontal, vertical, accordion
        menuPush: null, // right, left
        menuPushPosition: 'absolute', // fixed
        menuPushWidth: '100%', // px, %, rem
        menuBackDrop: false,
        menuIcon: null,
        onResize: null,
        onComplete: null,
        onChange: null,
        onClick: null,
        onBegin: null,
        onHover: null
    }
})(jQuery, window, document)