/*global chrome, console */

(function () {
	"use strict";
	var stopPicking = function () {};

	chrome.extension.sendMessage('options', function (options) {
		var keysDown = {},
			keys =  options.keys || [16, 17, 69];
		document.addEventListener('keydown', function (ev) {
			if (keys.indexOf(ev.keyCode) > -1) {
				keysDown[ev.keyCode] = true;
				for (var k in keys) {
					if (!keysDown[keys[k]]) {
						return;
					}
				}
				startPicking();
			}
			if (ev.keyCode === 27) {
				stopPicking();
			}
		});
		document.addEventListener('keyup', function (ev) {
			if (keys.indexOf(ev.keyCode) > -1) {
				keysDown[ev.keyCode] = false;
			}
		});
	});

	function startPicking() {
		var elt;
		stopPicking = function () {
			document.removeEventListener('click', click, true);
			document.body.removeEventListener('mouseover', over);
			document.body.removeEventListener('mouseout', out);
			if (elt) {
				elt.classList.remove('__fullscreen-element-selected');
			}
		};
		var click = function (ev) {
			stopPicking();
			elt = ev.target;
			elt.classList.remove('__fullscreen-element-selected');
			var cssText = elt.style.cssText;
			elt.addEventListener('webkitfullscreenchange', function(e) {
				setTimeout(function () {
					if (document.webkitIsFullScreen) {
						elt.style.cssText = '';
						elt.style.float = 'none';
					} else {
						elt.style.cssText = cssText;
					}
				}, 50);
			}, true);
			elt.webkitRequestFullScreen();
			ev.preventDefault();
			return false;
		};
		var over = function (ev) {
			elt = ev.target;
			elt.classList.add('__fullscreen-element-selected');
		};
		var out = function (ev) {
			elt = ev.target;
			elt.classList.remove('__fullscreen-element-selected');
		};
		document.addEventListener('click', click, true);
		document.body.addEventListener('mouseover', over);
		document.body.addEventListener('mouseout', out);

	}
})();
