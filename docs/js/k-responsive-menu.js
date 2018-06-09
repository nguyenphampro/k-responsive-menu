'use strict';

;; /*
   $$$$$$$\   $$$$$$\   $$$$$$\  $$\   $$\  $$$$$$\  $$\   $$\ $$\     $$\ $$$$$$$$\ $$\   $$\
   $$  __$$\ $$  __$$\ $$  __$$\ $$$\  $$ |$$  __$$\ $$ |  $$ |\$$\   $$  |$$  _____|$$$\  $$ |
   $$ |  $$ |$$ /  $$ |$$ /  $$ |$$$$\ $$ |$$ /  \__|$$ |  $$ | \$$\ $$  / $$ |      $$$$\ $$ |
   $$$$$$$\ |$$$$$$$$ |$$ |  $$ |$$ $$\$$ |$$ |$$$$\ $$ |  $$ |  \$$$$  /  $$$$$\    $$ $$\$$ |
   $$  __$$\ $$  __$$ |$$ |  $$ |$$ \$$$$ |$$ |\_$$ |$$ |  $$ |   \$$  /   $$  __|   $$ \$$$$ |
   $$ |  $$ |$$ |  $$ |$$ |  $$ |$$ |\$$$ |$$ |  $$ |$$ |  $$ |    $$ |    $$ |      $$ |\$$$ |
   $$$$$$$  |$$ |  $$ | $$$$$$  |$$ | \$$ |\$$$$$$  |\$$$$$$  |    $$ |    $$$$$$$$\ $$ | \$$ |
   \_______/ \__|  \__| \______/ \__|  \__| \______/  \______/     \__|    \________|\__|  \__|
   Name: K-Responsive-Menu
   URL: https: //baonguyenyam.github.io/k-responsive-menu/
   Coding by: Bao Nguyen
   Tel: 0.96.96.89.89.3
   Email: baonguyenyam@gmail.com
   URL: fb.com/pham.nguyen.bao.nguyen,
   baonguyenyam.github.io
   baonguyenyam.blogspot.com
   * Project: k-responsive-menu is a lightweight jQuery plugin to create responsive multi - level navigation menus with multi device support
   *  Author: Bao Nguyen
   *  License: MIT
   *  Website: http://baonguyenyam.github.io
   *  Version: 4.0.1
   */

;;
(function ($, window, document, undefined) {
	var kA = 'kResponsiveMenu';
	function kaGlobal(element, options, type) {
		this.element = element;
		this._name = kA;
		this._defaults = $.fn.kResponsiveMenu.defaults;
		this.options = $.extend({}, this._defaults, options);
		this.init();
	}

	$.extend(kaGlobal.prototype, {

		init: function init() {
			this.bindEvents();
			this.onComplete();
		},
		destroy: function destroy() {
			this.element = $(this.element);
			$(this.element).off('kResponsiveMenu_' + this._name);
			$(this.element).removeData('kResponsiveMenu_' + this._name);
		},

		bindEvents: function bindEvents() {
			var plugin = this;
			this.element = $(this.element);
			var $e,
			    $o,
			    $d,
			    $i,
			    $p,
			    $pw,
			    $pp,
			    $sl,
			    $bd,
			    $mf,
			    toggle = 0,
			    getAttr = this.element.attr('k-responsive-menu');
			if (getAttr && getAttr.length > 0) {
				// Khai báo bởi Attr
				$e = this.element, $o = $e.attr('k-menu-resize') ? isNaN($e.attr('k-menu-resize')) ? $e.attr('k-menu-resize') : parseInt($e.attr('k-menu-resize')) : this.options.resizeWidth, $d = $e.attr('k-menu-type') ? $e.attr('k-menu-type').toLocaleLowerCase() : this.options.menuType, $i = $e.attr('k-menu-icon') ? $e.attr('k-menu-icon').toLocaleLowerCase() : this.options.menuIcon, $p = $e.attr('k-menu-push') ? $e.attr('k-menu-push').toLocaleLowerCase() : this.options.menuPush, $pp = $e.attr('k-menu-position') ? $e.attr('k-menu-position').toLocaleLowerCase() : this.options.menuPushPosition, $pw = $e.attr('k-menu-width') ? $e.attr('k-menu-width').toLocaleLowerCase() : this.options.menuPushWidth, $sl = $e.attr('k-menu-speed') ? isNaN($e.attr('k-menu-speed')) ? $e.attr('k-menu-speed') : parseInt($e.attr('k-menu-speed')) : this.options.animationSpeed;
				$bd = $e.attr('k-menu-backdrop') ? Boolean($e.attr('k-menu-backdrop')) : this.options.menuBackDrop;
				$mf = $e.attr('k-menu-float') ? Boolean($e.attr('k-menu-float')) : this.options.menuFloat;
			} else {
				// Khai báo bởi JS
				$e = this.element, $o = this.options.resizeWidth, $d = this.options.menuType, $i = this.options.menuIcon, $p = this.options.menuPush, $pp = this.options.menuPushPosition, $pw = this.options.menuPushWidth, $sl = this.options.animationSpeed, $bd = this.options.menuBackDrop, $mf = this.options.menuFloat;
			}
			// Add Class Default
			$e.addClass('k-responsive-menu');
			$e.addClass('k-menu-' + $d);

			// DO MENU
			var nguyenApp = {
				resizeTimer: null,
				doBackDrop: function doBackDrop() {
					if (!$bd) {} else {
						$($e).append('<div class="k-menu-backdrop"></div>');
						if (this.doMenuPush() === 'left') {
							$('.k-menu-backdrop').css({
								"left": 0
							});
						} else if (this.doMenuPush() === 'right') {
							$('.k-menu-backdrop').css({
								"right": 0
							});
						}
					}
				},
				doMenuPush: function doMenuPush() {
					// Hiển thị
					// Left   => return 1
					// Right    => return 2
					return "left" === $p ? $p : "right" === $p ? $p : null;
				},
				doMenuType: function doMenuType() {
					// Loại menu
					// Accordion   => return 1
					// Vertical    => return 2
					// Horizontal  => return 3
					return "accordion" === $d ? 1 : "vertical" === $d ? 2 : 3;
				},
				doMenuSpeed: function doMenuSpeed() {
					// Tốc độ chuyển đổi
					// Number       => Return number
					// Slow, Fast   => Return string
					return "number" == typeof $sl ? parseInt($sl) : "string" == typeof $sl ? $sl : void 0;
				},
				doChangeMenu: function doChangeMenu() {
					// Kích thước sẽ thay đổi menu
					// Number                         => Return number
					// 'xs', 'sm', 'md', 'lg', 'xl'   => Return number
					if ("number" == typeof $o) return parseInt($o);
					if ("string" == typeof $o) {
						var o;
						return o = "xs" === $o ? 0 : "sm" === $o ? 576 : "md" === $o ? 768 : "lg" === $o ? 992 : "xl" === $o ? 1200 : 0, parseInt(o);
					}
				},
				menuBar: function menuBar() {
					var __speed = this.doMenuSpeed(),
					    __type = this.doMenuType();
					$i && 0 < $i.length && $(".k-button-toggle").html($i);
					if ((__type == 3 || __type == 2) && this.doMenuPush()) {
						$e.addClass('k-menu-push-' + this.doMenuPush());
					}
					$('.k-button-toggle').on('click', function (event) {
						plugin.onBegin.call(plugin);
						event.preventDefault();
						var el = $(this);
						var getFather = $(this).attr('k-toggle-for');
						if (toggle == 1) {
							$(this).removeClass('active', __speed);
							switchMenu(getFather, toggle, el);
							toggle = 0;
						} else {
							$(this).addClass('active', __speed);
							switchMenu(getFather, toggle, el);
							toggle = 1;
						}
						plugin.onChange.call(plugin);
					});
					var switchMenu = function switchMenu(getFather, toggle, el) {
						if (__type == 3 || __type == 2) {
							if ($p) {
								if ($p === 'right') {
									if (!$mf) {
										var n = $('body').css("transform");
										if (n === '' || n === 'none') {
											$(getFather).addClass('k-expand');
											$('body').animate({ now: $pw }, {
												duration: __speed,
												step: function step(now, fx) {
													$(this).css('transform', 'translateX(-' + now + 'px)');
												},
												complete: function complete() {}
											});
										} else {
											$('body').animate({ now: 0 }, {
												duration: __speed,
												step: function step(now, fx) {
													$(this).css('transform', 'translateX(-' + now + 'px)');
												},
												complete: function complete() {
													$(this).css('transform', '');
													$(getFather).removeClass('k-expand');
												}
											});
										}
									} else {
										var n = $(getFather).css("right");
										if (n != '0px') {
											$(getFather).addClass('k-expand');
											$(getFather).animate({
												right: "0"
											}, {
												duration: __speed,
												complete: function complete() {}
											});
											$('.k-menu-backdrop').animate({
												right: $pw
											}, {
												duration: __speed,
												complete: function complete() {}
											});
										} else {
											$(getFather).animate({
												right: "-" + $pw
											}, {
												duration: __speed,
												complete: function complete() {
													$(getFather).removeClass('k-expand');
												}
											});
											$('.k-menu-backdrop').animate({
												right: 0
											}, {
												duration: __speed,
												complete: function complete() {}
											});
										}
									}
								} else {
									if (!$mf) {
										var n = $('body').css("transform");
										if (n === '' || n === 'none') {
											$(getFather).addClass('k-expand');
											$('body').animate({ now: $pw }, {
												duration: __speed,
												step: function step(now, fx) {
													$(this).css('transform', 'translateX(' + now + 'px)');
												},
												complete: function complete() {}
											});
										} else {
											$('body').animate({ now: 0 }, {
												duration: __speed,
												step: function step(now, fx) {
													$(this).css('transform', 'translateX(' + now + 'px)');
												},
												complete: function complete() {
													$(this).css('transform', '');
													$(getFather).removeClass('k-expand');
												}
											});
										}
									} else {
										var n = $(getFather).css("left");
										if (n != '0px') {
											$(getFather).addClass('k-expand');
											$(getFather).animate({
												left: "0"
											}, {
												duration: __speed,
												complete: function complete() {}
											});
											$('.k-menu-backdrop').animate({
												left: $pw
											}, {
												duration: __speed,
												complete: function complete() {}
											});
										} else {
											$(getFather).animate({
												left: "-" + $pw
											}, {
												duration: __speed,
												complete: function complete() {
													$(getFather).removeClass('k-expand');
												}
											});
											$('.k-menu-backdrop').animate({
												left: 0
											}, {
												duration: __speed,
												complete: function complete() {}
											});
										}
									}
								}
							} else {
								$(getFather).slideToggle(__speed);
							}
						}
					};
				},
				doResponsiveMenu: function doResponsiveMenu() {
					var getchange = 0,
					    __type = this.doMenuType(),
					    __change = this.doChangeMenu(),
					    __speed = this.doMenuSpeed();
					getchange != __change && (getchange = __change);
					if ((__type == 3 || __type == 2) && $p) {
						$e.css({
							"position": $pp,
							"width": $pw
						});
						if ($p === 'right') {
							$e.css({
								"right": "-" + $pw
							});
						} else {
							$e.css({
								"left": "-" + $pw
							});
						}
					}
					// Add or Remove Class on Screen
					if ($(window).innerWidth() >= getchange) {
						if (__type == 3 || __type == 2) {
							this.makeHorizontalPC();
						}
					} else {
						if (__type == 3 || __type == 2) {
							this.makeHorizontalMobile();
						}
					}
				},
				makeHorizontalPC: function makeHorizontalPC() {
					this.doMapBack();
					$e.removeClass('k-active-mobile').removeAttr('style').addClass('k-active-pc');
					$('.k-menu-bar').removeClass('active');
					$('.k-menu-backdrop').removeClass('active');
				},
				makeHorizontalMobile: function makeHorizontalMobile() {
					this.doMapTo();
					$e.addClass('k-active-mobile').removeClass('k-active-pc');
					$('.k-menu-bar').addClass('active');
					$('.k-menu-backdrop').addClass('active');
				},
				doMapTo: function doMapTo() {
					$('[k-menu-map-to]').each(function () {
						var getTo = $(this).attr('k-menu-map-to');
						$(getTo).html($(this).clone().removeAttr('k-menu-map-to').show());
						$(this).hide();
					});
				},
				doMapBack: function doMapBack() {
					$('[k-menu-map-to]').each(function () {
						var getTo = $(this).attr('k-menu-map-to');
						$(getTo).html('');
						$(this).show();
					});
				},
				doreSetMenuBackDrop: function doreSetMenuBackDrop() {
					$('.k-menu-backdrop').each(function () {
						$(this).click(function () {
							var getbtn = $(this).parents('.k-responsive-menu').attr('id');
							$('[k-toggle-for="#' + getbtn + '"]').trigger('click');
							toggle = 0;
						});
					});
				}
			};

			nguyenApp.menuBar();
			nguyenApp.doBackDrop();
			nguyenApp.doreSetMenuBackDrop();
			nguyenApp.doResponsiveMenu();

			plugin.element.on('click' + '.' + plugin._name, function () {
				plugin.onClick.call(plugin);
			});
			plugin.element.on('mouseover' + '.' + plugin._name, function () {
				plugin.onHover.call(plugin);
			});
			plugin.element.on('mouseleave' + '.' + plugin._name, function () {
				plugin.unHover.call(plugin);
			});
			$(window).resize(function () {
				nguyenApp.doResponsiveMenu();
				$('body').css('transform', '');
				$('.k-responsive-menu').removeClass('k-expand');
				plugin.onResize.call(plugin);
				clearTimeout(nguyenApp.resizeTimer);
				nguyenApp.resizeTimer = setTimeout(function () {
					plugin.onResizeEnd.call(plugin);
				}, 200);
				plugin.onChange.call(plugin);
			});
		},

		onResize: function onResize() {
			var onResize = this.options.onResize;
			if (typeof onResize === 'function') {
				onResize.call(this.element);
			}
		},

		onResizeEnd: function onResizeEnd() {
			var onResizeEnd = this.options.onResizeEnd;
			if (typeof onResizeEnd === 'function') {
				onResizeEnd.call(this.element);
			}
		},

		onClick: function onClick() {
			var onClick = this.options.onClick;
			if (typeof onClick === 'function') {
				onClick.call(this.element);
			}
		},

		onHover: function onHover() {
			var onHover = this.options.onHover;

			if (typeof onHover === 'function') {
				onHover.call(this.element);
			}
		},

		unHover: function unHover() {
			var unHover = this.options.unHover;

			if (typeof unHover === 'function') {
				unHover.call(this.element);
			}
		},

		onBegin: function onBegin() {
			var onBegin = this.options.onBegin;
			if (typeof onBegin === 'function') {
				onBegin.call(this.element);
			}
		},

		onComplete: function onComplete() {
			$(window).trigger('resize');
			var onComplete = this.options.onComplete;

			if (typeof onComplete === 'function') {
				onComplete.call(this.element);
			}
		},

		onChange: function onChange() {
			var onChange = this.options.onChange;
			if (typeof onChange === 'function') {
				onChange.call(this.element);
			}
		}

	});

	// Build MENU

	$.fn.kResponsiveMenu = function (options) {
		this.each(function () {
			if (!$.data(this, 'kResponsiveMenu_' + kA)) {
				$.data(this, 'kResponsiveMenu_' + kA, new kaGlobal(this, options, 'initial'));
			}
		});
		return this;
	};

	$.fn.kResponsiveMenu.destroy = function () {
		kaGlobal.prototype.destroy();
	};

	$.fn.kResponsiveMenu.defaults = {
		animationSpeed: 'slow', // slow, fast, 200
		resizeWidth: 768,
		menuType: 'toggle', // horizontal, vertical, toggle
		menuPush: null, // right, left
		menuPushPosition: 'absolute', // fixed
		menuPushWidth: '100%', // px, %, rem
		menuBackDrop: false,
		menuFloat: true,
		menuIcon: null,
		onResize: null,
		onComplete: null,
		onChange: null,
		onClick: null,
		onBegin: null,
		onHover: null
	};
})(jQuery, window, document);;
//# sourceMappingURL=k-responsive-menu.js.map
