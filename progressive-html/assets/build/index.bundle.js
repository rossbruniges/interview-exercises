/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"1":"styles"}[chunkId]||chunkId) + ".bundle.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _accordion = __webpack_require__(1);

	var _removeSection = __webpack_require__(2);

	var accordions = document.querySelectorAll('.accordion');

	for (var i = 0; i < accordions.length; i++) {
	    new _accordion.Accordion(accordions[i], '.accordion__item', '.accordion__trigger', '.accordion__content');
	    new _removeSection.RemoveSection(accordions[i], '.accordion__item');
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Accordion = exports.Accordion = function () {
	    function Accordion(parentElm, childCls, triggerCls, contentCls) {
	        var initOpen = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

	        _classCallCheck(this, Accordion);

	        this.parentElm = parentElm;
	        this.children = parentElm.querySelectorAll(childCls);
	        this.childCls = childCls;
	        this.triggerCls = triggerCls;
	        this.contentCls = contentCls;
	        this.open = initOpen;

	        this.init();
	    }

	    Accordion.prototype.animateSections = function animateSections(elm) {
	        var parent = elm.target.closest(this.childCls);
	        if (parseInt(parent.dataset.index, 10) !== this.open) {
	            this.children[this.open].dataset.open = false;
	            parent.dataset.open = true;
	            this.open = parseInt(parent.dataset.index, 10);
	        }
	    };

	    Accordion.prototype.init = function init() {
	        // using event delegation to only bind one click event to the document
	        // (not one for each list item - which there could be loads of)
	        this.parentElm.addEventListener('click', function (e) {
	            e.preventDefault();
	            this.animateSections(e);
	        }.bind(this));
	        // we've got a nodeList - so forEach won't work consistently - so going old school
	        for (var i = 0; i < this.children.length; i++) {
	            var child = this.children[i];
	            child.dataset.index = i;
	            // wrap each title in a button to allow keyboard accessibility
	            child.querySelector(this.triggerCls).innerHTML = '<button>' + child.querySelector(this.triggerCls).innerHTML + '</button>';
	            child.dataset.contentHeight = child.querySelector(this.contentCls).offsetHeight;
	            this.open !== i ? child.dataset.open = false : child.dataset.open = true;
	        }
	    };

	    return Accordion;
	}();

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RemoveSection = exports.RemoveSection = function () {
	    function RemoveSection(parentElm, sectionCls) {
	        _classCallCheck(this, RemoveSection);

	        this.parentElm = parentElm;
	        this.sectionCls = sectionCls;

	        this.init();
	    }

	    RemoveSection.prototype.deleteThis = function deleteThis(elm) {
	        var target = elm.target;
	        // only listen to clicks on the remove button element
	        if (target.nodeName === "BUTTON" && target.classList.contains('btn--remove')) {
	            this.parentElm.removeChild(target.closest(this.sectionCls));
	        }
	    };

	    RemoveSection.prototype.init = function init() {
	        var children = this.parentElm.querySelectorAll(this.sectionCls);
	        // using event delegation to only bind one click hander
	        // as nodes get removed we don't have to clean up any redundant click handlers
	        this.parentElm.addEventListener('click', function (e) {
	            e.preventDefault();
	            this.deleteThis(e);
	        }.bind(this));
	        for (var i = 0; i < children.length; i++) {
	            var button = document.createElement('button');
	            button.innerText = 'Remove section';
	            button.classList.add('btn', 'btn--remove');
	            children[i].appendChild(button);
	        }
	    };

	    return RemoveSection;
	}();

/***/ }
/******/ ]);