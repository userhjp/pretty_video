(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["PrettyVideo"] = factory();
	else
		root["PrettyVideo"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(2);
            var content = __webpack_require__(3);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
var ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(5);
var ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(6);
var ___CSS_LOADER_URL_IMPORT_1___ = __webpack_require__(7);
var ___CSS_LOADER_URL_IMPORT_2___ = __webpack_require__(8);
var ___CSS_LOADER_URL_IMPORT_3___ = __webpack_require__(9);
var ___CSS_LOADER_URL_IMPORT_4___ = __webpack_require__(10);
var ___CSS_LOADER_URL_IMPORT_5___ = __webpack_require__(11);
var ___CSS_LOADER_URL_IMPORT_6___ = __webpack_require__(12);
exports = ___CSS_LOADER_API_IMPORT___(false);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_6___);
// Module
exports.push([module.i, "body {\n  margin: 0;\n}\n.video_player {\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n}\n.video_player .p_video {\n  width: 100%;\n  height: 100%;\n  min-height: 220px;\n  display: block;\n  background: #000;\n  z-index: auto;\n}\n.video_player .p_controls {\n  display: flex;\n  position: absolute;\n  width: 100%;\n  height: 40px;\n  background-color: rgba(0, 16, 27, 0.7);\n  bottom: -40px;\n  transition: bottom 0.3s;\n  left: 0;\n  justify-content: space-between;\n  align-items: center;\n  z-index: 999;\n  /* 进度条 */\n}\n.video_player .p_controls .progress_bar {\n  position: absolute;\n  cursor: pointer;\n  top: -2px;\n  left: 0;\n  width: 100%;\n  height: 2px;\n  background-color: hsla(0, 0%, 100%, 0.35);\n  transition: height 0.15s linear, top 0.15s linear;\n}\n.video_player .p_controls .progress_bar .current_dot {\n  position: absolute;\n  opacity: 0;\n  z-index: 101;\n  top: 50%;\n  left: 0px;\n  width: 8px;\n  height: 8px;\n  background-color: #fff;\n  transform: translateY(-50%) translateX(-50%);\n  border-radius: 50%;\n  transition: height 0.15s linear, top 0.15s linear, width 0.15s linear;\n}\n.video_player .p_controls .progress_bar .current_progress {\n  width: 0px;\n  height: 100%;\n  position: relative;\n  z-index: 100;\n  background-color: #2d7dc2;\n}\n.video_player .p_controls .progress_bar .current_buffer {\n  z-index: 99;\n  width: 0;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  background-color: hsla(0, 0%, 100%, 0.35);\n}\n.video_player .p_controls .date_label {\n  position: absolute;\n  width: 48px;\n  height: 22px;\n  line-height: 20px;\n  top: -34px;\n  left: 0;\n  visibility: hidden;\n  font-size: 12px;\n  transform: translateX(-50%);\n  color: #fff;\n  text-align: center;\n  border-radius: 4px;\n  background-color: rgba(0, 16, 27, 0.7);\n}\n.video_player .p_controls .date_label::after {\n  content: '';\n  position: absolute;\n  bottom: -4px;\n  left: 50%;\n  transform: translateX(-50%);\n  width: 0;\n  height: 0;\n  border-top: 4px solid rgba(0, 16, 27, 0.7);\n  border-left: 4px solid transparent;\n  border-right: 4px solid transparent;\n}\n.video_player .p_controls .controls_left {\n  display: flex;\n  align-items: center;\n  margin-left: 16px;\n}\n.video_player .p_controls .controls_right {\n  display: flex;\n  z-index: 999;\n  align-items: center;\n  justify-content: flex-end;\n  /* 倍速 */\n  /* 音量 */\n}\n.video_player .p_controls .controls_right > * {\n  cursor: pointer;\n  margin-right: 14px;\n}\n.video_player .p_controls .controls_right .speed_bth {\n  position: relative;\n}\n.video_player .p_controls .controls_right .speed_bth .speed_li {\n  position: absolute;\n  display: none;\n  bottom: 0px;\n  width: 58px;\n  padding-bottom: 34px;\n  text-align: center;\n  color: #fff;\n  font-size: 14px;\n}\n.video_player .p_controls .controls_right .speed_bth .speed_li div {\n  cursor: pointer;\n  background-color: rgba(0, 16, 27, 0.7);\n  line-height: 22px;\n  margin-bottom: 1px;\n  border-radius: 2px;\n}\n.video_player .p_controls .controls_right .speed_bth .speed_li div.on {\n  color: #2d7dc2;\n}\n.video_player .p_controls .controls_right .speed_bth .speed_li div:hover {\n  color: #2d7dc2;\n}\n.video_player .p_controls .controls_right .speed_bth span {\n  cursor: pointer;\n  display: inline-block;\n  color: #fff;\n  text-align: center;\n  min-width: 40px;\n  padding: 0 10px;\n  line-height: 22px;\n  background-color: rgba(0, 0, 0, 0.35);\n  border-radius: 12px;\n  font-size: 15px;\n}\n.video_player .p_controls .controls_right .speed_bth:hover span {\n  background-color: #2d7dc2;\n}\n.video_player .p_controls .controls_right .speed_bth:hover .speed_li {\n  display: block;\n}\n.video_player .p_controls .controls_right .volume_bth {\n  position: relative;\n  display: flex;\n}\n.video_player .p_controls .controls_right .volume_bth .volume_con {\n  position: absolute;\n  display: none;\n  bottom: 0;\n  width: 34px;\n  height: 112px;\n  left: -8px;\n}\n.video_player .p_controls .controls_right .volume_bth .volume_con .volume_slider {\n  position: absolute;\n  text-align: center;\n  border-radius: 10px;\n  padding: 14px 14px;\n  background-color: rgba(0, 0, 0, 0.5);\n  right: -46px;\n  top: 0;\n  transform: rotate(-90deg);\n}\n.video_player .p_controls .controls_right .volume_bth:hover .volume_con {\n  display: block;\n}\n.video_player .p_controls .button_img {\n  width: 14px;\n  height: 14px;\n  box-sizing: border-box;\n  z-index: 9;\n}\n.video_player .p_controls .button_img.suspend {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size: cover;\n}\n.video_player .p_controls .button_img.sound {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n  background-size: cover;\n}\n.video_player .p_controls .button_img.mute {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n  background-size: cover;\n}\n.video_player .p_controls .button_img.full {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n  background-size: cover;\n}\n.video_player .p_controls .button_img.scale {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ");\n  background-size: cover;\n}\n.video_player .p_controls .time {\n  color: #fff;\n  padding-left: 10px;\n  font-size: 14px;\n}\n.video_player .button_img.play,\n.video_player .cover_img.play {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ");\n  background-size: cover;\n}\n.video_player .video_cover {\n  position: absolute;\n  display: none;\n  height: 100%;\n  width: 100%;\n  top: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.7);\n}\n.video_player .video_cover .cover_content {\n  width: 200px;\n  height: 200px;\n  overflow: auto;\n  position: absolute;\n  margin: auto;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n.video_player .video_cover .cover_content .cover_img {\n  width: 40px;\n  height: 40px;\n  box-sizing: border-box;\n}\n.video_player .video_cover .cover_content .cover_img.error {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ");\n  background-size: cover;\n}\n.video_player .video_cover .cover_content .tips_error {\n  margin-top: 8px;\n}\n.video_player .video_cover .cover_content .tips_text {\n  color: #fff;\n  font-size: 12px;\n  text-align: center;\n}\n.video_player .video_cover .cover_content .video_loading .spot {\n  width: 4px;\n  height: 4px;\n  border-radius: 2px;\n  background: #ffffff;\n  float: left;\n  margin: 8px 4px;\n  animation: spot linear 1s infinite;\n  -webkit-animation: spot linear 1s infinite;\n}\n.video_player .video_cover .cover_content .video_loading .spot:nth-child(1) {\n  animation-delay: 0s;\n}\n.video_player .video_cover .cover_content .video_loading .spot:nth-child(2) {\n  animation-delay: 0.15s;\n}\n.video_player .video_cover .cover_content .video_loading .spot:nth-child(3) {\n  animation-delay: 0.3s;\n}\n.video_player .video_cover .cover_content .video_loading .spot:nth-child(4) {\n  animation-delay: 0.45s;\n}\n.video_player .video_cover .cover_content .video_loading .spot:nth-child(5) {\n  animation-delay: 0.6s;\n}\n@keyframes spot {\n  0%,\n  60%,\n  100% {\n    transform: scale(1);\n  }\n  30% {\n    transform: scale(2.5);\n  }\n}\n@-webkit-keyframes spot {\n  0%,\n  60%,\n  100% {\n    transform: scale(1);\n  }\n  30% {\n    transform: scale(2.5);\n  }\n}\n.video_player.showControls .p_controls {\n  bottom: 0 !important;\n}\n.video_player.showControls .progress_bar .current_dot {\n  opacity: 1 !important;\n}\n.video_player.showControls .hover_cls.progress_bar {\n  height: 6px;\n}\n.video_player.showControls .hover_cls.progress_bar .current_dot {\n  width: 10px;\n  height: 10px;\n}\ninput[type=\"range\"] {\n  display: block;\n  -webkit-appearance: none;\n  background: -webkit-linear-gradient(#2d7dc2, #2d7dc2) no-repeat, #ddd;\n  /*设置左边颜色为#61bd12，右边颜色为#ddd*/\n  background-size: 75% 100%;\n  /*设置左右宽度比例*/\n  width: 100px;\n  height: 4px;\n  border-radius: 5px;\n  margin: 0 auto;\n  outline: 0;\n}\ninput[type=\"range\"]::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  background-color: #fff;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  cursor: pointer;\n  transition: 0.3s ease-in-out;\n}\ninput[type=\"range\"]::-webkit-slider-thumb:hover {\n  background-color: white;\n  border: 2px solid #49a9ee;\n}\ninput[type=\"range\"]::-webkit-slider-thumb:active {\n  transform: scale(1.6);\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, '\\n'), "\"");
  }

  return url;
};

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyBjbGFzcz0iaWNvbiIgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMC4wMHB4IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTI1Mi43NzAxNDk5NSA4Ny44MDU2OTkxN2M3OC4wOTI5OTI5MiAwIDE0MS4zOTgxMDAyOSA2My4zMDUxMDczNSAxNDEuMzk4MTAwMjggMTQxLjM5ODEwMDI2djU2NS41OTI0MDExNGMwIDc4LjA5Mjk5MjkyLTYzLjMwNTEwNzM1IDE0MS4zOTgxMDAyOS0xNDEuMzk4MTAwMjggMTQxLjM5ODEwMDI2cy0xNDEuMzk4MTAwMjktNjMuMzA1MTA3MzUtMTQxLjM5ODEwMDI4LTE0MS4zOTgxMDAyNlYyMjkuMjAzNzk5NDNjMC03OC4wOTI5OTI5MiA2My4zMDUxMDczNS0xNDEuMzk4MTAwMjkgMTQxLjM5ODEwMDI4LTE0MS4zOTgxMDAyNnogbTUxOC40NTk3MDAxIDBjNzguMDkyOTkyOTIgMCAxNDEuMzk4MTAwMjkgNjMuMzA1MTA3MzUgMTQxLjM5ODEwMDI4IDE0MS4zOTgxMDAyNnY1NjUuNTkyNDAxMTRjMCA3OC4wOTI5OTI5Mi02My4zMDUxMDczNSAxNDEuMzk4MTAwMjktMTQxLjM5ODEwMDI4IDE0MS4zOTgxMDAyNnMtMTQxLjM5ODEwMDI5LTYzLjMwNTEwNzM1LTE0MS4zOTgxMDAyOC0xNDEuMzk4MTAwMjZWMjI5LjIwMzc5OTQzYzAtNzguMDkyOTkyOTIgNjMuMzA1MTA3MzUtMTQxLjM5ODEwMDI5IDE0MS4zOTgxMDAyOC0xNDEuMzk4MTAwMjZ6IiAgLz48L3N2Zz4=");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyBjbGFzcz0iaWNvbiIgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMC4wMHB4IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTUyNi40MzIgOTI0LjA2NGMtMjAuOTYgMC00NC4xNi0xMi41NzYtNjguOTYtMzcuMzQ0TDI3NC43NTIgNzA0SDE5MmMtNTIuOTI4IDAtOTYtNDMuMDcyLTk2LTk2VjQxNmMwLTUyLjkyOCA0My4wNzItOTYgOTYtOTZoODIuNzUybDE4Mi42MjQtMTgyLjYyNGMyNC41NzYtMjQuNTc2IDQ3Ljc0NC0zNy4wMjQgNjguODY0LTM3LjAyNEM1NDkuMTg0IDEwMC4zNTIgNTc2IDExNiA1NzYgMTYwdjcwNGMwIDQ0LjM1Mi0yNi43MiA2MC4wNjQtNDkuNTY4IDYwLjA2NHpNNjg3LjU4NCA3MzAuMzY4YTMxLjg5OCAzMS44OTggMCAwIDEtMTguNjU2LTYuMDE2Yy0xNC4zMzYtMTAuMzA0LTE3LjYzMi0zMC4zMDQtNy4zMjgtNDQuNjcybDEyLjY3Mi0xNy4zNDRDNzA3LjM5MiA2MTcuNDQgNzM2IDU3OC42MjQgNzM2IDUxMmMwLTY5LjAyNC0yNS4zNDQtMTAyLjUyOC01Ny40NC0xNDQuOTI4LTUuNjY0LTcuNDU2LTExLjMyOC0xNS4wMDgtMTYuOTI4LTIyLjc4NC0xMC4zMDQtMTQuMzM2LTcuMDQtMzQuMzM2IDcuMzI4LTQ0LjY3MiAxNC4zNjgtMTAuMzY4IDM0LjMzNi03LjA0IDQ0LjY3MiA3LjMyOCA1LjI0OCA3LjMyOCAxMC42NTYgMTQuNDY0IDE1Ljk2OCAyMS41MDRDNzY0LjIyNCAzNzQuMjA4IDgwMCA0MjEuNTA0IDgwMCA1MTJjMCA4Ny42NDgtMzkuMzkyIDE0MS4xMi03NC4xNDQgMTg4LjMybC0xMi4yMjQgMTYuNzM2Yy02LjI3MiA4LjcwNC0xNi4wNjQgMTMuMzEyLTI2LjA0OCAxMy4zMTJ6IiAgLz48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNNzk2LjQ0OCA4MzkuMDA4YTMxLjkwNiAzMS45MDYgMCAwIDEtMjEuMDg4LTcuOTM2Yy0xMy4yOC0xMS42NDgtMTQuNjI0LTMxLjg3Mi0yLjk3Ni00NS4xNTJDODM2LjYwOCA3MTIuNjcyIDg5NiA2MjguODY0IDg5NiA1MTJzLTU5LjM5Mi0yMDAuNzA0LTEyMy42MTYtMjczLjg4OGMtMTEuNjQ4LTEzLjMxMi0xMC4zMDQtMzMuNTA0IDIuOTc2LTQ1LjE4NCAxMy4yMTYtMTEuNjQ4IDMzLjQ0LTEwLjMzNiA0NS4xNTIgMi45NDRDODg5LjQ3MiAyNzQuNTYgOTYwIDM3My42IDk2MCA1MTJzLTcwLjUyOCAyMzcuNDcyLTEzOS40ODggMzE2LjA5NmMtNi4zNjggNy4yMzItMTUuMiAxMC45MTItMjQuMDY0IDEwLjkxMnoiICAvPjwvc3ZnPg==");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyBjbGFzcz0iaWNvbiIgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMC4wMHB4IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTE5MiAzMjBjLTU0LjQgMC05NiA0MS42LTk2IDkyLjhWNjA4YzAgNTQuNCA0MS42IDk2IDk2IDk2aDgzLjJsMTgyLjQgMTg4LjhjMjIuNCAyMi40IDQ0LjggMzUuMiA2Ny4yIDM1LjIgNi40IDAgMTIuOCAwIDE5LjItMy4yIDE5LjItOS42IDMyLTI4LjggMzItNTEuMnYtMjI0TDIzMy42IDMyMEgxOTJ6IG03NTguNCA0ODkuNmwtNTcuNi01NC40QzkzNC40IDY4MS42IDk2MCA1OTguNCA5NjAgNTEyYzAtMTE1LjItNDEuNi0yMjcuMi0xMTguNC0zMTYuOC0xMi44LTEyLjgtMzItMTYtNDQuOC0zLjItMTIuOCAxMi44LTE2IDMyLTMuMiA0NC44IDY0IDc2LjggMTAyLjQgMTc2IDEwMi40IDI3NS4yIDAgNzAuNC0xOS4yIDEzNy42LTUxLjIgMTk1LjJMNzUyIDYxNy42YzkuNi0zNS4yIDE2LTcwLjQgMTYtMTA1LjYgMC03My42LTIyLjQtMTQ0LTY3LjItMjA0LjgtOS42LTE2LTI4LjgtMTkuMi00NC44LTYuNHMtMTkuMiAyOC44LTYuNCA0NC44YzM1LjIgNDggNTQuNCAxMDguOCA1NC40IDE2Ni40IDAgMTkuMi0zLjIgMzguNC02LjQgNTQuNEw1NzYgNDUxLjJWMTUzLjZjMC0yNS42LTEyLjgtNDQuOC0zMi01MS4yLTI1LjYtOS42LTU3LjYgMC04Ni40IDMyTDM1MiAyNDAgMjE0LjQgMTA1LjZjLTEyLjgtMTIuOC0zMi0xMi44LTQ0LjggMC0xMi44IDEyLjgtMTIuOCAzMiAwIDQ0LjhsNzM2IDcwNGM2LjQgNi40IDEyLjggOS42IDIyLjQgOS42IDkuNiAwIDE2LTMuMiAyMi40LTkuNiAxMi44LTEyLjggMTIuOC0zMiAwLTQ0Ljh6IiAgLz48L3N2Zz4=");

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyBjbGFzcz0iaWNvbiIgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMC4wMHB4IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTg1LjMzMzMzMyA2ODIuNjY2NjY3djEyOGExMjggMTI4IDAgMCAwIDEyOCAxMjhoMTI4YTQyLjY2NjY2NyA0Mi42NjY2NjcgMCAwIDAgMC04NS4zMzMzMzRIMjEzLjMzMzMzM2E0Mi42NjY2NjcgNDIuNjY2NjY3IDAgMCAxLTQyLjY2NjY2Ni00Mi42NjY2NjZ2LTEyOGE0Mi42NjY2NjcgNDIuNjY2NjY3IDAgMCAwLTg1LjMzMzMzNCAweiBtNTk3LjMzMzMzNCAyNTZoMTI4YTEyOCAxMjggMCAwIDAgMTI4LTEyOHYtMTI4YTQyLjY2NjY2NyA0Mi42NjY2NjcgMCAwIDAtODUuMzMzMzM0IDB2MTI4YTQyLjY2NjY2NyA0Mi42NjY2NjcgMCAwIDEtNDIuNjY2NjY2IDQyLjY2NjY2NmgtMTI4YTQyLjY2NjY2NyA0Mi42NjY2NjcgMCAwIDAgMCA4NS4zMzMzMzR6IG0yNTYtNTk3LjMzMzMzNFYyMTMuMzMzMzMzYTEyOCAxMjggMCAwIDAtMTI4LTEyOGgtMTI4YTQyLjY2NjY2NyA0Mi42NjY2NjcgMCAwIDAgMCA4NS4zMzMzMzRoMTI4YTQyLjY2NjY2NyA0Mi42NjY2NjcgMCAwIDEgNDIuNjY2NjY2IDQyLjY2NjY2NnYxMjhhNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDAgMCA4NS4zMzMzMzQgMHpNMzQxLjMzMzMzMyA4NS4zMzMzMzNIMjEzLjMzMzMzM2ExMjggMTI4IDAgMCAwLTEyOCAxMjh2MTI4YTQyLjY2NjY2NyA0Mi42NjY2NjcgMCAwIDAgODUuMzMzMzM0IDBWMjEzLjMzMzMzM2E0Mi42NjY2NjcgNDIuNjY2NjY3IDAgMCAxIDQyLjY2NjY2Ni00Mi42NjY2NjZoMTI4YTQyLjY2NjY2NyA0Mi42NjY2NjcgMCAwIDAgMC04NS4zMzMzMzR6IiAgLz48L3N2Zz4=");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,PHN2ZyB0PSIxNTgyMjczNDA4NzQ0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijg4NiIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxwYXRoIGQ9Ik03ODAuNDA4MTI0NzMgNjY1LjM2aDExNS4wMzY4NzVjMTAuNTk3NSAwIDE5LjYzMTI1MDI3IDMuNzUxODc1MjcgMjcuMTEyNTAwNTQgMTEuMjQ5OTk5NzMgNy41MjA2MjQ3NCA3LjUwMzc0OTczIDExLjI2MTI1MDI3IDE2LjUyNjI1MDI3IDExLjI2MTI0OTQ2IDI3LjA3ODc1MDU0IDAgMTAuNjY1LTMuNzQwNjI0NzMgMTkuNjg3NDk5NzMtMTEuMjY2ODc0NzMgMjcuMTkxMjQ5NDYtNy40NzU2MjUgNy40OTgxMjUyNy0xNi41MDkzNzUyNyAxMS4yNDk5OTk3My0yNy4xMDY4NzUyNyAxMS4yNTAwMDA1NGgtMTE1LjAzMTI0OTc0Yy0xMC41ODYyNTAyNyAwLTE5LjYzMTI1MDI3IDMuNzUxODc1MjctMjcuMTEyNDk5NzIgMTEuMjQ5OTk5NzQtNy41MjA2MjQ3NCA3LjUwMzc0OTczLTExLjI0OTk5OTczIDE2LjUyNjI1MDI3LTExLjI1MDAwMDU0IDI3LjA3MzEyNTI2djExNS4wOTg3NDk3M2MwIDEwLjU0Njg3NS0zLjc1MTg3NTI3IDE5LjU3NS0xMS4yNjEyNDk0NiAyNy4wNzMxMjUyNy03LjQ4Njg3NDczIDcuNDk4MTI1MjctMTYuNTI2MjUwMjcgMTEuMjQ5OTk5NzMtMjcuMTEyNTAwNTQgMTEuMjQ5OTk5NzMtMTAuNTc0OTk5NzMgMC0xOS42MzY4NzQ3My0zLjc1MTg3NTI3LTI3LjA4OTk5OTQ2LTExLjI0OTk5OTczLTcuNTM3NDk5NzItNy41MDM3NDk3My0xMS4yNjEyNTAyNy0xNi41MjYyNTAyNy0xMS4yNjEyNTAyOC0yNy4wNzMxMjUyN3YtMTE1LjA5ODc0OTczYzAtMzEuNzU4NzQ5OTkgMTEuMjE2MjQ5NzMtNTguODM3NDk5NzMgMzMuNjkzNzQ5NzQtODEuMzM3NSAyMi40NjYyNTAyNy0yMi41MDAwMDAyNyA0OS41NTYyNDk3My0zMy42Mzc1MDAyNyA4MS4zMzE4NzU1NC0zMy42Mzc1MDAyN2wwLjA1NjI0OTQ2LTAuMTEyNDk5NzN6TTMyMC4yNDkzNzUgOTAuMTI1YzEwLjU5MTg3NDczIDAgMTkuNjM2ODc0NzMgMy43NTE4NzUyNyAyNy4xMDY4NzUyNyAxMS4yNDk5OTk3MyA3LjUyMDYyNDc0IDcuNTAzNzQ5NzMgMTEuMjYxMjUwMjcgMTYuNTI2MjUwMjcgMTEuMjYxMjQ5NDUgMjcuMDczMTI1Mjd2MTE1LjA5ODc0OTczYzAgMzEuNzU4NzQ5OTktMTEuMjM4NzQ5OTkgNTguODM3NDk5NzMtMzMuNzA0OTk5NDUgODEuMzM3NS0yMi40NjYyNTAyNyAyMi41MDAwMDAyNy00OS41ODQzNzUyNyAzMy43NS04MS4zNDMxMjUyNyAzMy43NUgxMjguNTI2ODc0NzNjLTEwLjU3NDk5OTczIDAtMTkuNjMxMjUwMjctMy43NDYyNDk5OS0yNy4xMDY4NzQ0Ni0xMS4zNjI0OTk0Ni03LjUyMDYyNDc0LTcuMzg1NjI0NzMtMTEuMjQ5OTk5NzMtMTYuNDA4MTI1MjctMTEuMjUwMDAwNTQtMjcuMDczMTI1MjggMC0xMC41NTI1MDAyNyAzLjcyOTM3NS0xOS41NzUgMTEuMjUwMDAwNTQtMjcuMDc4NzQ5NzIgNy40ODEyNTAyNy03LjQ5ODEyNTI3IDE2LjUyNjI1MDI3LTExLjI0OTk5OTczIDI3LjExMjQ5OTczLTExLjI1MDAwMDU0aDExNS4wMzEyNDk3M2MxMC41OTc1IDAgMTkuNjMxMjUwMjctMy43NTE4NzUyNyAyNy4xMTI1MDA1NC0xMS4yNDk5OTk3NCA3LjUyMDYyNDc0LTcuNTAzNzQ5NzMgMTEuMjYxMjUwMjctMTYuNTI2MjUwMjcgMTEuMjYxMjQ5NDctMjcuMDczMTI1MjZWMTI4LjQ0ODEyNWMwLTEwLjU0Njg3NSAzLjcyMzc0OTczLTE5LjY4NzQ5OTczIDExLjI2MTI1MDI3LTI3LjA3MzEyNTI3IDcuNDgxMjUwMjctNy42MTYyNTAyNyAxNi41MTQ5OTk3My0xMS4yNDk5OTk3MyAyNy4wOTU2MjQ3Mi0xMS4yNDk5OTk3M2gtMC4wNDQ5OTk3M3pNMTI4LjUyNjg3NDczIDY2NS4zNkgyNDMuNTc1MDAwMjdjMzEuNzU4NzQ5OTkgMCA1OC44NzY4NzUgMTEuMjQ5OTk5NzMgODEuMzM3NSAzMy43NTU2MjUyNyAyMi40NzE4NzQ3MyAyMi4zODc0OTk3MyAzMy43MTA2MjQ3MyA0OS41Nzg3NDk5OSAzMy43MTA2MjQ3MyA4MS4zMzc1djExNC45NzQ5OTk0NmMwIDEwLjY3MDYyNTI3LTMuNzQwNjI0NzMgMTkuNjkzMTI1LTExLjI2MTI1MDI3IDI3LjE5Njg3NTU0LTcuNDY5OTk5NzMgNy40OTgxMjUyNy0xNi41MTQ5OTk3MyAxMS4yNDk5OTk3My0yNy4xMTI0OTk3MyAxMS4yNDk5OTk3My0xMC41NzQ5OTk3MyAwLTE5LjYzMTI1MDI3LTMuNzUxODc1MjctMjcuMDkwMDAwMjctMTEuMjQ5OTk5NzMtNy41Mzc0OTk3Mi03LjUwMzc0OTczLTExLjI2Njg3NDczLTE2LjUyNjI1MDI3LTExLjI2Njg3NDczLTI3LjE5MTI1MDI2di0xMTQuOTc1MDAwMjhjMC0xMC42NzA2MjUyNy0zLjczNTAwMDI3LTE5LjY5MzEyNS0xMS4yNzI1MDAwMS0yNy4wNzg3NDk3Mi03LjQ2NDM3NTI3LTcuNjE2MjUwMjctMTYuNDk4MTI0NzMtMTEuMzYyNTAwMjctMjcuMTA2ODc1MjYtMTEuMzYyNTAwMjdIMTI4LjQ3NjI0OTczYy0xMC41ODYyNTAyNyAwLTE5LjYzMTI1MDI3LTMuNjM5Mzc0NzMtMjcuMTAxMjUtMTEuMjU1NjI1MDEtNy41MjA2MjQ3NC03LjM4NTYyNDczLTExLjI0OTk5OTczLTE2LjUyNjI1MDI3LTExLjI0OTk5OTczLTI3LjA3MzEyNDQ2IDAtMTAuNTUyNTAwMjcgMy43MjkzNzUtMTkuNjg3NDk5NzMgMTEuMjQ5OTk5NzMtMjcuMDc4NzUwNTQgNy40NjQzNzUyNy03LjYxNjI1MDI3IDE2LjUxNDk5OTczLTExLjI0OTk5OTczIDI3LjA5NTYyNTU0LTExLjI0OTk5OTczaDAuMDU2MjQ5NDZ6TTcwMy43MjgxMjQ3MyA5MC4xMjVjMTAuNTk3NSAwIDE5LjY0MjUgMy43NTE4NzUyNyAyNy4xMTI1MDA1NCAxMS4yNDk5OTk3MyA3LjUyMDYyNDc0IDcuNTAzNzQ5NzMgMTEuMjU1NjI1IDE2LjUyNjI1MDI3IDExLjI1NTYyNSAyNy4wNzMxMjUyN3YxMTUuMDk4NzQ5NzNjMCAxMC41NDY4NzUgMy43NDA2MjQ3MyAxOS42ODc0OTk3MyAxMS4yNjY4NzQ3MyAyNy4wNzMxMjUyNiA3LjQ2NDM3NTI3IDcuNjE2MjUwMjcgMTYuNTIwNjI1IDExLjI0OTk5OTczIDI3LjEwNjg3NTI3IDExLjI0OTk5OTc0aDExNS4wMjU2MjQ0NmMxMC41OTE4NzQ3MyAwIDE5LjY0MjUgMy43NTE4NzUyNyAyNy4xMTI1MDA1NCAxMS4yNTAwMDA1NCA3LjUxNTAwMDI3IDcuNTAzNzQ5NzMgMTEuMjY2ODc0NzMgMTYuNTI2MjUwMjcgMTEuMjY2ODc0NzMgMjcuMTkxMjQ5NDYgMCAxMC41NTI1MDAyNy0zLjc1MTg3NTI3IDE5LjU3NS0xMS4yNjEyNTAyNyAyNy4wNzg3NTA1NC03LjQ4MTI1MDI3IDcuNDk4MTI1MjctMTYuNTI2MjUwMjcgMTEuMjQ5OTk5NzMtMjcuMTE4MTI1IDExLjI0OTk5OTczaC0xMTUuMDMxMjQ5NzNjLTMxLjc2OTk5OTczIDAtNTguODQ4NzUwMjctMTEuMjQ5OTk5NzMtODEuMzM3NS0zMy42Mzc1MDAyNy0yMi40ODMxMjUyNy0yMi41MDAwMDAyNy0zMy42OTM3NDk3My00OS41Nzg3NDk5OS0zMy42OTM3NDk3My04MS4zMzc1VjEyOC41NjA2MjQ3MWMwLTEwLjY2NSAzLjczNTAwMDI3LTE5LjY4NzQ5OTczIDExLjI0OTk5OTczLTI3LjA3MzEyNDQ0IDcuNDc1NjI1LTcuNjE2MjUwMjcgMTYuNTM3NS0xMS4yNDk5OTk3MyAyNy4xMTI0OTk3My0xMS4yNTAwMDA1NEw3MDMuNzMzNzQ5OTkgOTAuMTI1eiIgZmlsbD0iI2ZmZmZmZiIgcC1pZD0iODg3Ij48L3BhdGg+PC9zdmc+");

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyBjbGFzcz0iaWNvbiIgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMC4wMHB4IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTc5Mi43NTA4NjA2MyA0MTMuNDkxNDUxNjhDODc4LjY2Njg5NTg1IDQ2Ny44OTU2MzQzMSA4NzguNjIwNDA3MiA1NTYuMTMxNjgyMSA3OTIuNzUwODYwNjMgNjEwLjUwNjQyODIzTDMyMi4zOTQyODcyIDkwOC4zNDc5ODIzM0MyMzYuNDc4MjUyODEgOTYyLjc1MjE2NzQzIDE2Ni44Mjk1NDUzOCA5MjcuMzI3NzkxNjggMTY2LjgyOTU0NTM4IDgyOS4zNDM0MDkwNkwxNjYuODI5NTQ1MzggMTk0LjY1NDQ3MDg1QzE2Ni44Mjk1NDUzOCA5Ni42MTcyNjU2OSAyMzYuNTI0NzQxNDYgNjEuMjc1MTQ5ODEgMzIyLjM5NDI4NzIgMTE1LjY0OTg5NTEyTDc5Mi43NTA4NjA2MyA0MTMuNDkxNDUxNjggNzkyLjc1MDg2MDYzIDQxMy40OTE0NTE2OFoiICAvPjwvc3ZnPg==");

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTgyMTI5NDg1MTY0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjcyNDgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyIDk4MS4zMzMzMzNjMjU5LjIgMCA0NjkuMzMzMzMzLTIxMC4xMzMzMzMgNDY5LjMzMzMzMy00NjkuMzMzMzMzUzc3MS4yIDQyLjY2NjY2NyA1MTIgNDIuNjY2NjY3IDQyLjY2NjY2NyAyNTIuOCA0Mi42NjY2NjcgNTEyczIxMC4xMzMzMzMgNDY5LjMzMzMzMyA0NjkuMzMzMzMzIDQ2OS4zMzMzMzN6IG0wIDQyLjY2NjY2N0MyMjkuMjI2NjY3IDEwMjQgMCA3OTQuNzczMzMzIDAgNTEyUzIyOS4yMjY2NjcgMCA1MTIgMHM1MTIgMjI5LjIyNjY2NyA1MTIgNTEyLTIyOS4yMjY2NjcgNTEyLTUxMiA1MTJ6IiBwLWlkPSI3MjQ5IiBmaWxsPSIjZmZmZmZmIj48L3BhdGg+PHBhdGggZD0iTTcwNi44OCA3MjQuMjY2NjY3YTIxLjMzMzMzMyAyMS4zMzMzMzMgMCAxIDEtMzEuNjE2IDI4LjYyOTMzM0EyMTIuOTkyIDIxMi45OTIgMCAwIDAgNTE2LjczNiA2ODIuNjY2NjY3YTIxMy40NCAyMTMuNDQgMCAwIDAtMTI2Ljg5MDY2NyA0MS42IDIxLjMzMzMzMyAyMS4zMzMzMzMgMCAwIDEtMjUuMzIyNjY2LTM0LjMyNTMzNEEyNTYuMDg1MzMzIDI1Ni4wODUzMzMgMCAwIDEgNTE2LjcxNDY2NyA2NDBhMjU1LjYzNzMzMyAyNTUuNjM3MzMzIDAgMCAxIDE5MC4xNjUzMzMgODQuMjY2NjY3ek0zMzAuMzQ2NjY3IDQyNC41MzMzMzNsLTYwLjMzMDY2NyA2MC4zMzA2NjdhMjEuMzMzMzMzIDIxLjMzMzMzMyAwIDAgMS0zMC4xNjUzMzMtMzAuMTY1MzMzbDYwLjMzMDY2Ni02MC4zNTItNjAuMzMwNjY2LTYwLjMzMDY2N2EyMS4zMzMzMzMgMjEuMzMzMzMzIDAgMCAxIDMwLjE2NTMzMy0zMC4xNjUzMzNsNjAuMzMwNjY3IDYwLjMzMDY2NiA2MC4zNTItNjAuMzMwNjY2YTIxLjMzMzMzMyAyMS4zMzMzMzMgMCAxIDEgMzAuMTY1MzMzIDMwLjE2NTMzM2wtNjAuMzUyIDYwLjMzMDY2NyA2MC4zNTIgNjAuMzUyYTIxLjMzMzMzMyAyMS4zMzMzMzMgMCAxIDEtMzAuMTY1MzMzIDMwLjE2NTMzM2wtNjAuMzUyLTYwLjM1MnpNNjkzLjAxMzMzMyA0MjQuNTMzMzMzbC02MC4zMzA2NjYgNjAuMzMwNjY3YTIxLjMzMzMzMyAyMS4zMzMzMzMgMCAwIDEtMzAuMTY1MzM0LTMwLjE2NTMzM2w2MC4zMzA2NjctNjAuMzUyLTYwLjMzMDY2Ny02MC4zMzA2NjdhMjEuMzMzMzMzIDIxLjMzMzMzMyAwIDEgMSAzMC4xNjUzMzQtMzAuMTY1MzMzbDYwLjMzMDY2NiA2MC4zMzA2NjYgNjAuMzUyLTYwLjMzMDY2NmEyMS4zMzMzMzMgMjEuMzMzMzMzIDAgMSAxIDMwLjE2NTMzNCAzMC4xNjUzMzNsLTYwLjM1MiA2MC4zMzA2NjcgNjAuMzUyIDYwLjM1MmEyMS4zMzMzMzMgMjEuMzMzMzMzIDAgMSAxLTMwLjE2NTMzNCAzMC4xNjUzMzNsLTYwLjM1Mi02MC4zNTJ6IiBwLWlkPSI3MjUwIiBmaWxsPSIjZmZmZmZmIj48L3BhdGg+PC9zdmc+");

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/index.less
var src = __webpack_require__(1);

// CONCATENATED MODULE: ./src/utils/index.ts
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Utils = /*#__PURE__*/function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, [{
    key: "hasClass",

    /**
     * 判断class是否存在
     * @param obj dom对象
     * @param cls class名称
     */
    value: function hasClass(obj, cls) {
      return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }
    /**
     * 添加class
     * @param obj dom对象
     * @param cls class
     */

  }, {
    key: "addClass",
    value: function addClass(obj, cls) {
      if (!this.hasClass(obj, cls)) obj.className += " " + cls;
    }
    /**
     * 删除class
     * @param obj dom对象
     * @param cls class
     */

  }, {
    key: "removeClass",
    value: function removeClass(obj, cls) {
      if (this.hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
      }
    }
    /**
     * 切换class 有则删除，无则添加
     * @param obj dom对象
     * @param cls class
     */

  }, {
    key: "toggleClass",
    value: function toggleClass(obj, cls) {
      if (this.hasClass(obj, cls)) {
        if (this.hasClass(obj, cls)) {
          this.removeClass(obj, cls);
        } else {
          this.addClass(obj, cls);
        }
      }
    }
    /** 是否是PC端 */

  }, {
    key: "isPC",
    value: function isPC() {
      var userAgentInfo = navigator.userAgent;
      var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']; // 判断用户代理头信息

      var flag = true;

      for (var i in Agents) {
        if (userAgentInfo.indexOf(Agents[i]) !== -1) {
          flag = false;
          break;
        }
      }

      return flag; // true为pc端，false为非pc端
    }
    /** 时间秒转换为时分秒 
     * @param value 秒
    */

  }, {
    key: "formatSeconds",
    value: function formatSeconds(value) {
      var secondTime = parseInt(value); // 秒

      var minuteTime = 0; // 分

      var hourTime = 0; // 小时

      if (secondTime >= 60) {
        minuteTime = Math.floor(secondTime / 60);
        secondTime = Math.floor(secondTime % 60);

        if (minuteTime >= 60) {
          hourTime = Math.floor(minuteTime / 60);
          minuteTime = Math.floor(minuteTime % 60);
        }
      }

      var joinDate = "".concat(this.PrefixInteger(minuteTime), ":").concat(this.PrefixInteger(secondTime));
      if (hourTime > 0 || value >= 3600) joinDate = "".concat(this.PrefixInteger(hourTime), ":").concat(joinDate);
      return joinDate;
    }
    /**
     * utils 数字向下取整
     * @param num 数字
     * @param len 长度
     */

  }, {
    key: "PrefixInteger",
    value: function PrefixInteger(num) {
      var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
      num = isNaN(num) ? 0 : Math.floor(num); // 向下取整

      return (Array(len).join('0') + num).slice(-len);
    }
  }]);

  return Utils;
}();

/* harmony default export */ var utils = (new Utils());
// CONCATENATED MODULE: ./src/index.ts
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function src_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function src_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function src_createClass(Constructor, protoProps, staticProps) { if (protoProps) src_defineProperties(Constructor.prototype, protoProps); if (staticProps) src_defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var src_PrettyVideo = /*#__PURE__*/function () {
  /** 容器 */

  /** video播放器 */

  /** 控制条 */

  /** 音量滑动按钮 */

  /** 进度条容器 */

  /** 缓冲进度条 */

  /** 进度条当前进度 */

  /** 进度条拖动点按钮 */

  /** 当前鼠标位置提示label */

  /** 当前播放时间进度 */

  /** 倍速列表 */

  /** 倍速按钮 */

  /** 播放按钮 */
  // 全屏状态
  // 进度条是否拖动中，防止拖动时候视频正常播放更新进度条
  // 当前视频播放音量 0 - 1
  // 监听事件列表
  // 开始加载 | 加载完成 | 播放中 | 暂停中 | 缓冲中 | 缓冲就绪 | 播放完毕 | 错误
  function PrettyVideo() {
    var _this = this;

    src_classCallCheck(this, PrettyVideo);

    _defineProperty(this, "containerElemelt", void 0);

    _defineProperty(this, "videoElement", void 0);

    _defineProperty(this, "controlsElement", void 0);

    _defineProperty(this, "volumesliderElement", void 0);

    _defineProperty(this, "progressElement", void 0);

    _defineProperty(this, "progressBufferElement", void 0);

    _defineProperty(this, "currentSpElement", void 0);

    _defineProperty(this, "dotElement", void 0);

    _defineProperty(this, "dateLabelElement", void 0);

    _defineProperty(this, "timeElement", void 0);

    _defineProperty(this, "speedListElement", void 0);

    _defineProperty(this, "speedBtnElement", void 0);

    _defineProperty(this, "playBtnElement", void 0);

    _defineProperty(this, "config", {
      autoplay: false,
      autoHideControls: true,
      isFastForward: true,
      hideFullScreen: false,
      controls: true,
      loop: false,
      preload: 'auto'
    });

    _defineProperty(this, "isFullscreen", false);

    _defineProperty(this, "isMove", false);

    _defineProperty(this, "currentvolum", 1);

    _defineProperty(this, "envents", {});

    _defineProperty(this, "reload", function () {
      return _this.videoElement.load();
    });

    _defineProperty(this, "play", function () {
      return _this.videoElement.play();
    });

    _defineProperty(this, "pause", function () {
      return _this.videoElement.pause();
    });

    _defineProperty(this, "videoHtml", "\n      <div class=\"video_player showControls\" id=\"video_container\">\n        <video id=\"_pretty_video\" class=\"p_video\" width=\"100%\">\n            \u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301Video\u64AD\u653E\u5668\n        </video>\n        <div id=\"video_controls\" style=\"display: none;\"></div>\n        <div class=\"video_cover\" id=\"v_error\">\n            <div class=\"cover_content\">\n                <div class=\"cover_img error\"></div>\n                <div class=\"tips_text tips_error\">\u8D44\u6E90\u52A0\u8F7D\u5931\u8D25~</div>\n            </div>\n        </div>\n        <div class=\"video_cover\" id=\"v_play\">\n            <div class=\"cover_content\">\n                <div class=\"cover_img play play_btn\"></div>\n            </div>\n        </div>\n        <div class=\"video_cover\" id=\"v_waiting\">\n            <div class=\"cover_content\">\n                <div class=\"video_loading\">\n                    <div>\n                        <div class=\"spot\"></div>\n                        <div class=\"spot\"></div>\n                        <div class=\"spot\"></div>\n                        <div class=\"spot\"></div>\n                        <div class=\"spot\"></div>\n                    </div>\n                    <div class=\"tips_text\">\u7F13\u51B2\u4E2D...</div>\n                </div>\n            </div>\n        </div>\n    </div>\n    ");

    _defineProperty(this, "controlsHtml", "\n      <div class=\"p_controls\">\n        <span class=\"date_label\">00:00</span>\n        <div id=\"progress\" class=\"progress_bar\">\n            <div class=\"current_progress\"></div>\n            <div class=\"current_buffer\"></div>\n            <i class=\"current_dot\"></i>\n        </div>\n        <div class=\"controls_left\">\n            <i class=\"button_img play play_btn\"></i>\n            <div class=\"time\"></div>\n        </div>\n        <div class=\"controls_right\">\n            <!-- \u97F3\u91CF -->\n            <div class=\"volume_bth\">\n                <div class=\"volume_con\">\n                    <div class=\"volume_slider\">\n                        <input id=\"volumeslider\" type='range' min=\"0\" max=\"1\" step=\"0.01\" value=\"0.8\"/>\n                    </div>\n                </div>\n                <i id=\"volume_img\" class=\"button_img sound\"></i>\n            </div>\n            <!-- \u500D\u901F -->\n            <div class=\"speed_bth\">\n                <div id=\"speed_con\" class=\"speed_li\">\n                    <div>2.0x</div>\n                    <div>1.5x</div>\n                    <div>1.2x</div>\n                    <div class=\"on\">1.0x</div>\n                    <div>0.5x</div>\n                </div>\n                <span id=\"speed_btn\">1.0x</span>\n            </div>\n            <!-- \u5168\u5C4F -->\n            <i id=\"v_fullscreen\" class=\"button_img full\"></i>\n        </div>\n      </div>\n     \n    ");
  }

  src_createClass(PrettyVideo, [{
    key: "init",
    value: function init(el, config) {
      try {
        var videoContainer = typeof el === 'string' ? document.getElementById(el) : el;
        if (!videoContainer) throw new Error("无效的dom元素，请在页面加载完成后初始化播放器。");
        videoContainer.innerHTML = this.videoHtml;
        this.containerElemelt = videoContainer.querySelector('#video_container');
        ;
        this.videoElement = videoContainer.querySelector('#_pretty_video');
        this.controlsElement = videoContainer.querySelector('#video_controls');
        this.controlsElement.innerHTML = this.controlsHtml;
        this.progressElement = videoContainer.querySelector('#progress');
        this.currentSpElement = this.progressElement.querySelector('.current_progress');
        this.progressBufferElement = this.progressElement.querySelector('.current_buffer');
        this.dotElement = this.progressElement.querySelector('.current_dot');
        this.volumesliderElement = videoContainer.querySelector('#volumeslider');
        this.dateLabelElement = videoContainer.querySelector('.date_label');
        this.timeElement = videoContainer.querySelector('.time');
        this.speedListElement = videoContainer.querySelector('#speed_con').children;
        this.speedBtnElement = videoContainer.querySelector('#speed_btn');
        this.playBtnElement = videoContainer.querySelectorAll('.play_btn');
        this.setupConfig(config);
        this.setUrl({
          src: config.src,
          poster: config.poster
        });
        this.initEvent();
      } catch (error) {
        console.error(error);
      }
    }
    /**
     * 获取总视频时长和当前播放进度
     */

  }, {
    key: "getDuration",
    value: function getDuration() {
      var _this$videoElement, _this$videoElement2, _this$videoElement3, _this$videoElement4;

      var currentSecond = ((_this$videoElement = this.videoElement) === null || _this$videoElement === void 0 ? void 0 : _this$videoElement.currentTime) || 0; // 当前播放时长 单位：秒

      var durationSecond = ((_this$videoElement2 = this.videoElement) === null || _this$videoElement2 === void 0 ? void 0 : _this$videoElement2.duration) || 0; // 总时长 单位：秒
      // 转换格式HH:mm:ss  HH如果有的话才展示 否则展示mm:ss

      var currentText = utils.formatSeconds(((_this$videoElement3 = this.videoElement) === null || _this$videoElement3 === void 0 ? void 0 : _this$videoElement3.currentTime) || 0);
      var durationText = utils.formatSeconds(((_this$videoElement4 = this.videoElement) === null || _this$videoElement4 === void 0 ? void 0 : _this$videoElement4.duration) || 0);
      return {
        currentSecond: currentSecond,
        durationSecond: durationSecond,
        currentText: currentText,
        durationText: durationText
      };
    }
    /** 播放器配置 */

  }, {
    key: "setupConfig",
    value: function setupConfig(newConfig) {
      this.config = _objectSpread(_objectSpread({}, this.config), newConfig);
      this.videoElement.autoplay = this.config.autoplay ? true : false;
      this.videoElement.loop = this.config.loop ? true : false;
      this.videoElement.preload = this.config.preload;
      this.initControls();
    }
    /** 播放地址 */

  }, {
    key: "setUrl",
    value: function setUrl(object) {
      if (!this.videoElement) throw new Error("请先初始化播放器!");
      this.videoElement.src = object.src || '';
      this.videoElement.poster = object.poster || '';
    }
    /** 重新加载视频 */

  }, {
    key: "isPause",

    /** 是否暂停状态 */
    value: function isPause() {
      return this.videoElement.paused;
    }
    /** 暂停播放 */

  }, {
    key: "setPlaybackRate",

    /** 设置倍速 */
    value: function setPlaybackRate(e) {
      this.speedBtnElement.innerText = e;
      this.videoElement.playbackRate = parseFloat(e);
    }
    /** 设置音量 */

  }, {
    key: "setVolum",
    value: function setVolum(value) {
      value = parseFloat(value);
      this.videoElement.volume = value;
      this.volumesliderElement.style.backgroundSize = "".concat(value * 100, "% 100%");
      /*设置左右宽度比例*/

      var volume_bth = this.containerElemelt.querySelector('#volume_img');

      if (value && volume_bth) {
        volume_bth.classList.remove('mute');
      } else {
        volume_bth.classList.add('mute');
      }
    }
    /** 销毁video */

  }, {
    key: "dispose",
    value: function dispose() {
      this.containerElemelt.innerHTML = '';
    }
    /**
     * 监听事件
     * @param eventName 事件名称
     * @param callback 回调
     */

  }, {
    key: "on",
    value: function on(eventName, callback) {
      this.envents[eventName] = callback;
    }
    /**
     * 取消事件监听
     */

  }, {
    key: "unOn",
    value: function unOn(eventName) {
      delete this.envents[eventName];
    }
    /** 全屏 */

  }, {
    key: "fullscreen",
    value: function fullscreen() {
      var fullScreenElement = this.containerElemelt;

      if (this.isFullscreen) {
        if (document['exitFullscreen']) {
          document['exitFullscreen']();
        } else if (document['webkitCancelFullScreen']) {
          document['webkitCancelFullScreen']();
        } else if (document['mozCancelFullScreen']) {
          document['mozCancelFullScreen']();
        } else if (document['msExitFullscreen']) {
          document['msExitFullscreen']();
        } else {
          return;
        }

        this.isFullscreen = false;
      } else {
        var requestMethod = fullScreenElement.requestFullScreen || fullScreenElement.webkitRequestFullScreen || fullScreenElement.mozRequestFullScreen || fullScreenElement.msRequestFullscreen;

        if (requestMethod) {
          requestMethod.call(fullScreenElement);
          this.isFullscreen = true;
        } else {
          alert('该浏览器不支持全屏');
        }
      }
    }
    /** 设置播放按钮状态 */

  }, {
    key: "changePlayBtn",
    value: function changePlayBtn() {
      var _iterator = _createForOfIteratorHelper(this.playBtnElement),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var el = _step.value;

          if (this.isPause()) {
            utils.removeClass(el, 'suspend');
          } else {
            utils.addClass(el, 'suspend');
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    /** 更新当前状态 */

  }, {
    key: "setState",
    value: function setState(state) {
      if (typeof this.envents[state] === 'function') {
        this.envents[state]({
          type: 'state'
        });
      }

      ;
      this.changePlayBtn();
      var video_cover = this.containerElemelt.getElementsByClassName('video_cover');

      var _iterator2 = _createForOfIteratorHelper(video_cover),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var cover = _step2.value;
          cover.style.display = 'none';
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      switch (state) {
        case 'error':
          this.containerElemelt.querySelector('#v_error').style.display = 'block';
          break;

        case 'play':
        case 'ended':
        case 'canplay':
        case 'pause':
          this.containerElemelt.querySelector('#v_play').style.display = 'block';
          break;

        case 'loadstart':
        case 'waiting':
          this.containerElemelt.querySelector('#v_waiting').style.display = 'block';
          break;

        case 'seeked':
          this.containerElemelt.querySelector('#v_waiting').style.display = 'none';

        default:
          break;
      }

      console.log(state);
    }
    /** 获取进度条宽度，存在旋转屏幕导致宽度不一致，实时获取 */

  }, {
    key: "getProgressWidth",
    value: function getProgressWidth() {
      return this.progressElement.clientWidth;
    }
    /** 根据当前X位置计算当前时间进度 */

  }, {
    key: "getCurrentLocationTime",
    value: function getCurrentLocationTime(position) {
      var maxWidth = this.getProgressWidth(); // 进度总长度，进度条-按钮

      if (position > maxWidth) position = maxWidth;
      var slitherCurrentTime = position / maxWidth * this.videoElement.duration; // 当前拖动进度位置时间

      var currentTime = "".concat(utils.formatSeconds(slitherCurrentTime)); // 当前播放进度- 分:秒

      return currentTime;
    }
    /** 视频当前播放进度/进度条样式 */

  }, {
    key: "setDuration",
    value: function setDuration(position) {
      var currentTime = this.getCurrentLocationTime(position);
      var duration = utils.formatSeconds(this.videoElement.duration); // 视频总长度- 分:秒

      this.timeElement.innerHTML = "".concat(currentTime, " / ").concat(duration);
      this.currentSpElement.style.width = position + 'px';
      this.dotElement.style.left = position + 'px';
    }
    /** 初始化控制条 */

  }, {
    key: "initControls",
    value: function initControls() {
      var _this2 = this;

      var controls = this.controlsElement;

      if (!this.config.controls) {
        return controls.style.display = 'none';
      }

      var video = this.videoElement;
      var isPc = utils.isPC(); // pc端 和移动端事件区分

      var touchstart = isPc ? 'mousedown' : 'touchstart'; // 鼠标按下/触摸

      var touchmove = isPc ? 'mousemove' : 'touchmove'; // 开始移动/拖动

      var touchend = isPc ? 'mouseup' : 'touchend'; // 松开/手指移开

      /** 倍速列表点击事件 */

      var _iterator3 = _createForOfIteratorHelper(this.speedListElement),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var i = _step3.value;
          i.addEventListener('click', function (e) {
            var _iterator4 = _createForOfIteratorHelper(_this2.speedListElement),
                _step4;

            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var el = _step4.value;
                el.classList.remove("on");
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }

            e.target.classList.add("on");

            _this2.setPlaybackRate(e.target.innerText);
          });
        }
        /** 全屏按钮点击 */

      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      this.containerElemelt.querySelector('#v_fullscreen').addEventListener('click', function (e) {
        _this2.fullscreen();

        if (_this2.isFullscreen) {
          utils.addClass(e.target, 'scale');
        } else {
          utils.removeClass(e.target, 'scale');
        }
      });
      /** 进度条变粗大 */

      var progressHover = function progressHover(isHover) {
        if (!_this2.config.isFastForward) return;

        if (isHover) {
          utils.addClass(_this2.progressElement, 'hover_cls');
        } else {
          utils.removeClass(_this2.progressElement, 'hover_cls');
        }
      };
      /** 改变label位置 */


      var showmoveLabel = function showmoveLabel(clientX) {
        if (clientX < 0) clientX = 0;
        _this2.dateLabelElement.innerText = _this2.getCurrentLocationTime(clientX);
        var minLeft = _this2.dateLabelElement.clientWidth / 2;
        var maxRight = _this2.progressElement.clientWidth - minLeft;
        if (clientX < minLeft) clientX = minLeft; // 防止被遮掩

        if (clientX > maxRight) clientX = maxRight;
        _this2.dateLabelElement.style.left = clientX + 'px';
        _this2.dateLabelElement.style.visibility = 'visible';
      };

      var hidemoveLabel = function hidemoveLabel() {
        _this2.dateLabelElement.style.visibility = 'hidden';
      }; // 进度条开始拖动


      this.dotElement.addEventListener(touchstart, function (event) {
        if (!_this2.config.isFastForward) return;
        event.preventDefault(); // 这里处理移动端进度条焦点变化

        if (!isPc) {
          progressHover(true);
        }

        var maxWidth = _this2.getProgressWidth(); // 如果这个元素的位置内只有一个手指


        if (isPc || event.targetTouches.length === 1) {
          var touch = isPc ? event : event.targetTouches[0]; // 把元素放在手指所在的位置

          var disX = touch.clientX - _this2.dotElement.offsetLeft;

          var getPosition = function getPosition(e) {
            var l = e.clientX - disX;

            if (l < 0) {
              l = 0;
            }

            if (l > maxWidth) {
              l = maxWidth;
            }

            return l;
          };

          var position = getPosition(touch);
          if (!isPc) showmoveLabel(position); // 开始拖动

          var move = function move(e) {
            _this2.isMove = true;
            var touch2 = isPc ? e : e.targetTouches[0];
            var position = getPosition(touch2);

            _this2.setDuration(position);

            showmoveLabel(position);
          }; // 如果浏览器下，需要全局监听拖动


          var dotElmt = isPc ? window : _this2.dotElement; // 拖动完成 删除事件

          var chend = function chend(e) {
            // 拖动完成更新播放器时间
            var touch2 = isPc ? e : e.changedTouches[0];
            var position = getPosition(touch2); // 更新视频实际播放时间

            video.currentTime = position / maxWidth * video.duration;
            _this2.isMove = false;

            if (!isPc) {
              // 这里处理移动端进度条变化
              progressHover(false);
              hidemoveLabel();
            }

            dotElmt.removeEventListener(touchmove, move);
            dotElmt.removeEventListener(touchend, chend);
          };

          dotElmt.addEventListener(touchmove, move);
          dotElmt.addEventListener(touchend, chend);
        }
      }, false);
      var timeout = null; // 实现效果，pc端鼠标移入视频显示控制条，3秒无操作隐藏控制条
      // 移动端触摸视频时展示控制条, 3秒无操作隐藏控制条

      var showControls = function showControls() {
        clearTimeout(timeout);
        utils.addClass(_this2.containerElemelt, 'showControls');
      };

      var hideControls = function hideControls() {
        timeout = setTimeout(function () {
          utils.removeClass(_this2.containerElemelt, 'showControls');
        }, 4000);
      };

      var onmouseover = function onmouseover(e) {
        showControls();
        hideControls();
      };

      if (isPc) {
        // 鼠标在容器移动时候触发显示
        this.containerElemelt.addEventListener('mousemove', onmouseover); // 当鼠标移动到控制条上，取消隐藏，一直显示

        this.controlsElement.addEventListener('mouseenter', function (e) {
          _this2.containerElemelt.removeEventListener('mousemove', onmouseover);

          showControls();
        }); // 鼠标移开

        this.controlsElement.addEventListener('mouseleave', function (e) {
          _this2.containerElemelt.addEventListener('mousemove', onmouseover);

          hideControls();
        }); // PC端点击音量按钮禁音

        this.containerElemelt.querySelector('#volume_img').addEventListener('click', function (e) {
          var val = parseFloat(_this2.volumesliderElement.value) > 0 ? 0.0 : _this2.currentvolum;
          _this2.volumesliderElement.value = val;

          _this2.setVolum(val);
        }); ///进度条控制样式 mouseover mouseout：鼠标移入子元素时会重复触发所以使用mouseenter mouseleave
        // PC端鼠标移入控制条变粗变大

        this.progressElement.addEventListener('mouseenter', function (e) {
          return progressHover(true);
        }); // 鼠标移开

        this.progressElement.addEventListener('mouseleave', function (e) {
          progressHover(false);
          hidemoveLabel();
        }); // 鼠标移动

        this.progressElement.addEventListener('mousemove', function (e) {
          return showmoveLabel(e.clientX);
        });
      } else {
        this.containerElemelt.ontouchstart = showControls;
        this.containerElemelt.ontouchend = hideControls;
      } // 阻止事件冒泡到点击进度条


      this.dotElement.onmousedown = function (event) {
        return event.stopPropagation();
      }; // 鼠标按下时候，跳转进度


      this.progressElement.onmousedown = function (event) {
        if (!_this2.config.isFastForward) return;

        var maxWidth = _this2.getProgressWidth();

        var layerX = event.layerX;

        if (layerX > maxWidth) {
          layerX = maxWidth;
        }

        video.currentTime = layerX / maxWidth * video.duration; // 计算出点击的位置在总时间里面占多少。

        _this2.setDuration(layerX);
      }; // 音量拖动事件


      this.volumesliderElement.oninput = function (e) {
        e.stopPropagation();
        var value = e.target.value;
        _this2.currentvolum = value;

        _this2.setVolum(value);
      };
    }
    /** 监听video事件 */

  }, {
    key: "initEvent",
    value: function initEvent() {
      var _this3 = this;

      var video = this.videoElement;
      var ua = navigator.userAgent.toLocaleLowerCase(); // x5内核

      if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
        video.setAttribute('x5-video-player-fullscreen', 'true'); // 进入全屏通知

        video.setAttribute('x-webkit-airplay', 'true'); // 设置允许设备播放
        // video.setAttribute('x5-playsinline', 'true'); // 设置android在微信中内联播放视频 这是坑微信无法正常横屏

        video.setAttribute('x5-video-player-type', 'h5'); // 关闭同层X5内核播放器    x5-video-player-type='h5' 启用Ｈ5同层播放器

        video.setAttribute('x5-video-orientation', 'landscape|portrait'); // 控制横竖屏 可选值： landscape 横屏, portraint竖屏  默认值：portraint
        // 进入全屏

        video.addEventListener('x5videoenterfullscreen', function () {
          var btnEl = _this3.containerElemelt.querySelector('#v_fullscreen');

          utils.addClass(btnEl, 'scale');
        }, false); // 退出全屏时

        video.addEventListener('x5videoexitfullscreen', function () {
          var btnEl = _this3.containerElemelt.querySelector('#v_fullscreen');

          utils.removeClass(btnEl, 'scale');
        }, false);
      } else {
        // ios端
        video.setAttribute('webkit-playsinline', 'true'); // // 设置ios在微信中内联播放视频 ios9

        video.setAttribute('playsinline', 'true'); // 设置ios在微信中内联播放视频 ios10/ios11
      }
      /** 播放按钮点击 */


      var _iterator5 = _createForOfIteratorHelper(this.playBtnElement),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var el = _step5.value;
          el.addEventListener('click', function (e) {
            if (_this3.isPause()) {
              _this3.play();
            } else {
              _this3.pause();
            }
          });
        } // 右键

      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      this.containerElemelt.oncontextmenu = function (e) {
        //鼠标点的坐标
        var oX = e.layerX;
        var oY = e.layerY; //菜单出现后的位置
        // menu.style.display = "block";
        // menu.style.left = oX + "px";
        // menu.style.top = oY + "px";
        //阻止浏览器默认事件

        return false; //一般点击右键会出现浏览器默认的右键菜单，写了这句代码就可以阻止该默认事件。
      }; // 双击播放器暂停，移动端无双击事件，用两次点击时间模拟 300 毫秒2次点击为双击


      var clickTime = 0;
      video.addEventListener('click', function () {
        var nowTime = new Date().getTime();

        if (nowTime - clickTime < 300) {
          if (_this3.isPause()) {
            _this3.play();
          } else {
            _this3.pause();
          }
        }

        clickTime = nowTime;
      }); // loadstart：视频查找。当浏览器开始寻找指定的音频/视频时触发，也就是当加载过程开始时

      video.addEventListener('loadstart', function (e) {
        return _this3.setState('loadstart');
      }); // durationchange：时长变化。当指定的音频/视频的时长数据发生变化时触发，加载后，时长由 NaN 变为音频/视频的实际时长

      video.addEventListener('durationchange', function (e) {
        var maxWidth = _this3.getProgressWidth();

        _this3.setDuration(video.currentTime / video.duration * maxWidth);
      }); // loadedmetadata ：元数据加载。当指定的音频/视频的元数据已加载时触发，元数据包括：时长、尺寸（仅视频）以及文本轨道

      video.addEventListener('loadedmetadata', function (e) {
        _this3.setState('loadedmetadata');

        _this3.controlsElement.style.display = 'block';
        console.log('视频的元数据已加载');
      }); // loadeddata：视频下载监听。当当前帧的数据已加载，但没有足够的数据来播放指定音频/视频的下一帧时触发
      // video.addEventListener('loadeddata', (e) => {
      //   console.log('提示当前帧的数据是可用的');
      //   this.setState('loadeddata');
      // });
      // progress：浏览器下载监听。当浏览器正在下载指定的音频/视频时触发

      video.addEventListener('progress', function (e) {
        var buffered = e.target.buffered;

        if (buffered.length) {
          var loaded = 100 * buffered.end(0) / e.target.duration;
          _this3.progressBufferElement.style.width = loaded + '%';
        }
      }); // canplay：可播放监听。当浏览器能够开始播放指定的音频/视频时触发

      video.addEventListener('canplay', function (e) {
        return _this3.setState('canplay');
      }); // canplaythrough：可流畅播放。当浏览器预计能够在不停下来进行缓冲的情况下持续播放指定的音频/视频时触发

      video.addEventListener('canplaythrough', function (e) {
        _this3.setState('canplaythrough');
      }); // play：播放监听

      video.addEventListener('play', function (e) {
        return _this3.setState('play');
      }); // pause：暂停监听

      video.addEventListener('pause', function (e) {
        return _this3.setState('pause');
      }); // seeking：查找开始。当用户开始移动/跳跃到音频/视频中新的位置时触发
      // video.addEventListener('seeking', (e) => {
      //   console.log('开始移动进度条');
      // });
      // // seeked：查找结束。当用户已经移动/跳跃到视频中新的位置时触发

      video.addEventListener('seeked', function (e) {
        return _this3.setState('seeked');
      }); // waiting：视频加载等待。当视频由于需要缓冲下一帧而停止，等待时触发

      video.addEventListener('waiting', function (e) {
        return _this3.setState('waiting');
      }); // playing：当视频在已因缓冲而暂停或停止后已就绪时触发

      video.addEventListener('playing', function (e) {
        return _this3.setState('playing');
      }); // timeupdate：目前的播放位置已更改时，播放时间更新

      video.addEventListener('timeupdate', function (e) {
        if (!_this3.isMove) {
          // 防止拖动进度条时候更新
          var maxWidth = _this3.getProgressWidth();

          _this3.setDuration(video.currentTime / video.duration * maxWidth);
        }
      }); // ended：播放结束

      video.addEventListener('ended', function (e) {
        _this3.setState('ended');

        _this3.containerElemelt.getElementsByClassName('play_btn')[0].classList.remove('suspend');
      }); // error：播放错误

      video.addEventListener('error', function (e) {
        return _this3.setState('error');
      }); // volumechange：当音量更改时
      // video.addEventListener('volumechange', (e) => {
      //   console.log('音量更改');
      // });
      // stalled：当浏览器尝试获取媒体数据，但数据不可用时
      // video.addEventListener('stalled', (e) => {
      //   console.log('媒体数据不可用');
      // });
      // ratechange：当视频的播放速度已更改时
      // video.addEventListener('ratechange', (e) => {
      //   console.log('ratechange');
      // });
    } // 播放器element

  }]);

  return PrettyVideo;
}();

/* harmony default export */ var src_0 = __webpack_exports__["default"] = (src_PrettyVideo);

/***/ })
/******/ ])["default"];
});