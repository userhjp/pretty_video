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
exports.push([module.i, "body {\n  margin: 0;\n}\n.video_player {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  overflow: hidden;\n}\n.video_player .p_video {\n  width: 100%;\n  height: 100%;\n  display: block;\n  background: #000;\n  z-index: 9;\n}\n.video_player .p_controls {\n  display: flex;\n  position: absolute;\n  width: 100%;\n  height: 40px;\n  background-color: rgba(0, 16, 27, 0.6);\n  bottom: -40px;\n  transition: bottom 0.3s;\n  left: 0;\n  justify-content: space-between;\n  align-items: center;\n  z-index: 999;\n  /* 进度条 */\n}\n.video_player .p_controls .progress_bar {\n  position: absolute;\n  cursor: pointer;\n  top: -2px;\n  left: 0;\n  width: 100%;\n  height: 2px;\n  background-color: hsla(0, 0%, 100%, 0.35);\n  transition: height 0.15s linear, top 0.15s linear;\n}\n.video_player .p_controls .progress_bar .current_dot {\n  position: absolute;\n  opacity: 0;\n  z-index: 101;\n  top: 50%;\n  left: 0px;\n  padding: 5px;\n  background-color: #fff;\n  transform: translateY(-50%) translateX(-50%);\n  border-radius: 50%;\n  transition: padding 0.15s linear, top 0.15s linear, width 0.15s linear;\n}\n.video_player .p_controls .progress_bar .current_progress {\n  width: 0px;\n  height: 100%;\n  position: relative;\n  z-index: 100;\n  background-color: #2d7dc2;\n}\n.video_player .p_controls .progress_bar .current_buffer {\n  z-index: 99;\n  width: 0;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  background-color: hsla(0, 0%, 100%, 0.35);\n}\n.video_player .p_controls .date_label {\n  position: absolute;\n  width: 48px;\n  height: 22px;\n  line-height: 20px;\n  top: -34px;\n  left: 0;\n  visibility: hidden;\n  font-size: 12px;\n  transform: translateX(-50%);\n  color: #fff;\n  text-align: center;\n  border-radius: 4px;\n  background-color: rgba(0, 16, 27, 0.7);\n}\n.video_player .p_controls .date_label::after {\n  content: '';\n  position: absolute;\n  bottom: -4px;\n  left: 50%;\n  transform: translateX(-50%);\n  width: 0;\n  height: 0;\n  border-top: 4px solid rgba(0, 16, 27, 0.7);\n  border-left: 4px solid transparent;\n  border-right: 4px solid transparent;\n}\n.video_player .p_controls .controls_left {\n  display: flex;\n  align-items: center;\n  margin-left: 16px;\n}\n.video_player .p_controls .controls_right {\n  display: flex;\n  z-index: 999;\n  align-items: center;\n  justify-content: flex-end;\n  /* 倍速 */\n  /* 音量 */\n}\n.video_player .p_controls .controls_right > * {\n  cursor: pointer;\n  margin-right: 14px;\n}\n.video_player .p_controls .controls_right .speed_bth {\n  position: relative;\n}\n.video_player .p_controls .controls_right .speed_bth:active {\n  background-color: none;\n}\n.video_player .p_controls .controls_right .speed_bth .speed_li {\n  position: absolute;\n  display: none;\n  bottom: 0px;\n  width: 100%;\n  padding-bottom: 34px;\n  text-align: center;\n  color: #fff;\n  font-size: 14px;\n}\n.video_player .p_controls .controls_right .speed_bth .speed_li div {\n  cursor: pointer;\n  background-color: rgba(0, 16, 27, 0.7);\n  line-height: 22px;\n  margin-bottom: 1px;\n  border-radius: 2px;\n}\n.video_player .p_controls .controls_right .speed_bth .speed_li div.on {\n  color: #2d7dc2;\n}\n.video_player .p_controls .controls_right .speed_bth .speed_li div:hover {\n  color: #2d7dc2;\n}\n.video_player .p_controls .controls_right .speed_bth span {\n  cursor: pointer;\n  display: inline-block;\n  color: #fff;\n  text-align: center;\n  min-width: 40px;\n  padding: 0 10px;\n  line-height: 22px;\n  border-radius: 12px;\n  font-size: 15px;\n}\n.video_player .p_controls .controls_right .speed_bth:hover .speed_li {\n  display: block;\n}\n.video_player .p_controls .controls_right .volume_bth {\n  position: relative;\n  display: flex;\n}\n.video_player .p_controls .controls_right .volume_bth .volume_con {\n  position: absolute;\n  display: none;\n  bottom: 0;\n  width: 34px;\n  height: 112px;\n  left: -8px;\n}\n.video_player .p_controls .controls_right .volume_bth .volume_con .volume_slider {\n  position: absolute;\n  text-align: center;\n  border-radius: 10px;\n  padding: 14px 14px;\n  background-color: rgba(0, 0, 0, 0.5);\n  right: -46px;\n  top: 0;\n  transform: rotate(-90deg);\n}\n.video_player .p_controls .controls_right .volume_bth:hover .volume_con {\n  display: block;\n}\n.video_player .p_controls .button_img {\n  width: 14px;\n  height: 14px;\n  box-sizing: border-box;\n  z-index: 9;\n}\n.video_player .p_controls .button_img.suspend {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size: cover;\n}\n.video_player .p_controls .button_img.sound {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n  background-size: cover;\n}\n.video_player .p_controls .button_img.mute {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n  background-size: cover;\n}\n.video_player .p_controls .button_img.full {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n  background-size: cover;\n}\n.video_player .p_controls .button_img.scale {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ");\n  background-size: cover;\n}\n.video_player .p_controls .time {\n  color: #fff;\n  padding-left: 10px;\n  font-size: 14px;\n}\n.video_player .button_img.play,\n.video_player .cover_img.play {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ");\n  background-size: cover;\n}\n.video_player .video_cover {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  top: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.7);\n  z-index: 999;\n}\n.video_player .video_cover .cover_content {\n  width: 100px;\n  height: 100px;\n  z-index: 999;\n  overflow: auto;\n  position: absolute;\n  margin: auto;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n.video_player .video_cover .cover_content .cover_img {\n  width: 40px;\n  height: 40px;\n  box-sizing: border-box;\n}\n.video_player .video_cover .cover_content .cover_img.error {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ");\n  background-size: cover;\n}\n.video_player .video_cover .cover_content .tips_error {\n  margin-top: 8px;\n}\n.video_player .video_cover .cover_content .tips_text {\n  color: #fff;\n  font-size: 12px;\n  text-align: center;\n}\n.video_player .video_cover .cover_content .video_loading .spot {\n  width: 4px;\n  height: 4px;\n  border-radius: 2px;\n  background: #ffffff;\n  float: left;\n  margin: 8px 4px;\n  animation: spot linear 1s infinite;\n  -webkit-animation: spot linear 1s infinite;\n}\n.video_player .video_cover .cover_content .video_loading .spot:nth-child(1) {\n  animation-delay: 0s;\n}\n.video_player .video_cover .cover_content .video_loading .spot:nth-child(2) {\n  animation-delay: 0.15s;\n}\n.video_player .video_cover .cover_content .video_loading .spot:nth-child(3) {\n  animation-delay: 0.3s;\n}\n.video_player .video_cover .cover_content .video_loading .spot:nth-child(4) {\n  animation-delay: 0.45s;\n}\n.video_player .video_cover .cover_content .video_loading .spot:nth-child(5) {\n  animation-delay: 0.6s;\n}\n@keyframes spot {\n  0%,\n  60%,\n  100% {\n    transform: scale(1);\n  }\n  30% {\n    transform: scale(2.5);\n  }\n}\n@-webkit-keyframes spot {\n  0%,\n  60%,\n  100% {\n    transform: scale(1);\n  }\n  30% {\n    transform: scale(2.5);\n  }\n}\n.p_controls.showControls {\n  bottom: 0 !important;\n}\n.p_controls.showControls .progress_bar .current_dot {\n  opacity: 1 !important;\n}\n.p_controls.showControls .hover_cls.progress_bar {\n  height: 6px;\n}\n.p_controls.showControls .hover_cls.progress_bar .current_dot {\n  padding: 8px;\n}\ninput[type=\"range\"] {\n  display: block;\n  -webkit-appearance: none;\n  background: -webkit-linear-gradient(#2d7dc2, #2d7dc2) no-repeat, #ddd;\n  /*设置左边颜色为#61bd12，右边颜色为#ddd*/\n  background-size: 75% 100%;\n  /*设置左右宽度比例*/\n  width: 100px;\n  height: 4px;\n  border-radius: 5px;\n  margin: 0 auto;\n  outline: 0;\n}\ninput[type=\"range\"]::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  background-color: #fff;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  cursor: pointer;\n  transition: 0.3s ease-in-out;\n}\ninput[type=\"range\"]::-webkit-slider-thumb:hover {\n  background-color: white;\n  border: 2px solid #49a9ee;\n}\ninput[type=\"range\"]::-webkit-slider-thumb:active {\n  transform: scale(1.6);\n}\n", ""]);
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
/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTk0MTExMDg1MjI4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjYwOTYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNODg0LjM5MiA5NzAuMzMzSDY3MS44ODdjLTIzLjAxIDAtNDEuNjY2LTE4LjY1Ni00MS42NjYtNDEuNjY2IDAtMjMuMDExIDE4LjY1Ni00MS42NjcgNDEuNjY2LTQxLjY2N2gyMTIuNTA1VjY5MS4xNThjMC0yMy4wMSAxOC42NTYtNDEuNjY2IDQxLjY2Ni00MS42NjYgMjMuMDExIDAgNDEuNjY3IDE4LjY1NiA0MS42NjcgNDEuNjY2Vjg4N2MwIDQ1Ljk1OS0zNy4zOTUgODMuMzMzLTgzLjMzMyA4My4zMzN6IG0tNTQxLjY2NyAwSDEzNC4zOTFjLTQ1Ljk0OSAwLTgzLjMzMy0zNy4zNzQtODMuMzMzLTgzLjMzM1Y2NzguNjY3YzAtMjMuMDExIDE4LjY1Ni00MS42NjcgNDEuNjY3LTQxLjY2N3M0MS42NjcgMTguNjU2IDQxLjY2NyA0MS42NjdWODg3aDIwOC4zMzNjMjMuMDEgMCA0MS42NjYgMTguNjU2IDQxLjY2NiA0MS42NjcgMCAyMy4wMS0xOC42NTcgNDEuNjY2LTQxLjY2NiA0MS42NjZ6IG0tMjUwLTU4Ny41MDRjLTIzLjAxIDAtNDEuNjY3LTE4LjY1Ni00MS42NjctNDEuNjY3VjEzN2MwLTQ1Ljk1OSAzNy4zODQtODMuMzMzIDgzLjMzMy04My4zMzNoMjA0LjE2M2MyMy4wMSAwIDQxLjY2NyAxOC42NTcgNDEuNjY3IDQxLjY2N1MzNjEuNTY0IDEzNyAzMzguNTU0IDEzN0gxMzQuMzkxdjIwNC4xNjJjMCAyMy4wMTEtMTguNjU2IDQxLjY2Ny00MS42NjYgNDEuNjY3eiBtODMzLjMzMy04LjMyMWMtMjMuMDEgMC00MS42NjYtMTguNjU2LTQxLjY2Ni00MS42NjZWMTM3SDY3MS44ODdjLTIzLjAxIDAtNDEuNjY2LTE4LjY1Ni00MS42NjYtNDEuNjY3czE4LjY1Ni00MS42NjcgNDEuNjY2LTQxLjY2N2gyMTIuNTA1YzQ1LjkzOCAwIDgzLjMzMyAzNy4zNzQgODMuMzMzIDgzLjMzM3YxOTUuODQyYzAgMjMuMDExLTE4LjY1NyA0MS42NjctNDEuNjY3IDQxLjY2N3oiIHAtaWQ9IjYwOTciIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48L3N2Zz4=");

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
/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTk0MTA4NjYxMTIwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE1NzIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMzIwIDQ0Ny45MzZjMzUuMzkyIDAgNjQtMjguNjA4IDY0LTY0cy0yOC42MDgtNjQtNjQtNjQtNjQgMjguNjA4LTY0IDY0UzI4NC42MDggNDQ3LjkzNiAzMjAgNDQ3LjkzNnpNNzUxLjc0NCA3MDYuNzUyYy0xNDYuNDk2LTkxLjAwOC0zMzMuNDQtOTEuMDA4LTQ3OS44NzIgMC0xNC4zMzYgOC44OTYtMTkuMzI4IDI4LjczNi0xMS4yNjQgNDQuNDggOCAxNS43NDQgMjYuMDQ4IDIxLjI0OCA0MC4zODQgMTIuMzUyIDEyOC43MDQtNzkuOTM2IDI5Mi44NjQtNzkuOTM2IDQyMS42MzIgMCA0LjU0NCAyLjg4IDkuNiA0LjIyNCAxNC41MjggNC4yMjQgMTAuMzY4IDAgMjAuNDE2LTYuMDE2IDI1Ljg1Ni0xNi42NEM3NzEuMDcyIDczNS40ODggNzY2LjAxNiA3MTUuNjQ4IDc1MS43NDQgNzA2Ljc1MnpNODMyIDEyNy45MzYgMTkyIDEyNy45MzZjLTcwLjY1NiAwLTEyOCA1Ny4zNDQtMTI4IDEyOGwwIDU3NmMwIDcwLjY1NiA1Ny4zNDQgMTI4IDEyOCAxMjhsNjQwIDBjNzAuNjU2IDAgMTI4LTU3LjM0NCAxMjgtMTI4bDAtNTc2Qzk2MCAxODUuMjggOTAyLjY1NiAxMjcuOTM2IDgzMiAxMjcuOTM2ek04OTYgODMxLjkzNmMwIDM1LjM5Mi0yOC42MDggNjQtNjQgNjRMMTkyIDg5NS45MzZjLTM1LjM5MiAwLTY0LTI4LjYwOC02NC02NGwwLTU3NmMwLTM1LjM5MiAyOC42MDgtNjQgNjQtNjRsNjQwIDBjMzUuMzkyIDAgNjQgMjguNjA4IDY0IDY0TDg5NiA4MzEuOTM2ek03MDQgMzE5LjkzNmMtMzUuMzkyIDAtNjQgMjguNjA4LTY0IDY0czI4LjYwOCA2NCA2NCA2NCA2NC0yOC42MDggNjQtNjRTNzM5LjM5MiAzMTkuOTM2IDcwNCAzMTkuOTM2eiIgcC1pZD0iMTU3MyIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjwvc3ZnPg==");

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/components/video.ts
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Video = /*#__PURE__*/function () {
  // 监听事件列表
  function Video() {
    _classCallCheck(this, Video);

    _defineProperty(this, "onEvent", void 0);

    _defineProperty(this, "el", void 0);

    _defineProperty(this, "posterEl", void 0);

    this.createVideoEl();
    this.createPosterEl();
  }

  _createClass(Video, [{
    key: "setCurrentTime",
    value: function setCurrentTime(time) {
      this.el.currentTime = time;
    }
    /** 播放地址 */

  }, {
    key: "setUrl",
    value: function setUrl(object) {
      if (!(this === null || this === void 0 ? void 0 : this.el)) throw new Error("请先初始化播放器!");
      this.el.setAttribute('src', object.src || '');
      this.posterEl.src = object.poster;
    }
  }, {
    key: "setState",
    value: function setState(event, e) {
      if (typeof this.onEvent === 'function') {
        this.onEvent(event, e);
      }
    }
  }, {
    key: "showPoster",
    value: function showPoster() {
      this.posterEl.style.display = 'block';
    }
  }, {
    key: "hidePoster",
    value: function hidePoster() {
      this.posterEl.style.display = 'none';
    }
  }, {
    key: "createPosterEl",
    value: function createPosterEl() {
      var _this = this;

      this.posterEl = document.createElement('img');
      this.posterEl.className = "poster_img";
      this.posterEl.style.position = 'absolute';
      this.posterEl.style.top = '0';
      this.posterEl.style.left = '0';
      this.posterEl.style.right = '0';
      this.posterEl.style.bottom = '0';
      this.posterEl.style.margin = 'auto';
      this.posterEl.style.objectFit = 'cover';
      this.posterEl.style.width = '100%';
      this.posterEl.style.display = 'none';

      this.posterEl.onerror = function () {
        _this.hidePoster();
      };
    } // 创建video

  }, {
    key: "createVideoEl",
    value: function createVideoEl() {
      var _this2 = this;

      var videoEl = document.createElement('video');
      videoEl.className = 'p_video';
      var text = document.createTextNode('您的浏览器不支持Video播放器');
      videoEl.appendChild(text);
      var ua = navigator.userAgent.toLocaleLowerCase(); // x5内核

      if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
        videoEl.setAttribute('x5-video-player-fullscreen', 'true'); // 进入全屏通知

        videoEl.setAttribute('x-webkit-airplay', 'true'); // 设置允许设备播放
        // this.el.setAttribute('x5-playsinline', 'true'); // 设置android在微信中内联播放视频 这是坑微信无法正常横屏

        videoEl.setAttribute('x5-video-player-type', 'h5'); // 关闭同层X5内核播放器    x5-video-player-type='h5' 启用Ｈ5同层播放器

        videoEl.setAttribute('x5-video-orientation', 'landscape|portrait'); // 控制横竖屏 可选值： landscape 横屏, portraint竖屏  默认值：portraint
        // 进入全屏

        videoEl.addEventListener('x5videoenterfullscreen', function (e) {
          return _this2.setState('x5videoenterfullscreen', e);
        }, false); // 退出全屏时

        videoEl.addEventListener('x5videoexitfullscreen', function (e) {
          return _this2.setState('x5videoenterfullscreen', e);
        }, false);
      } else {
        // ios端
        videoEl.setAttribute('webkit-playsinline', 'true'); // // 设置ios在微信中内联播放视频 ios9

        videoEl.setAttribute('playsinline', 'true'); // 设置ios在微信中内联播放视频 ios10/ios11
      }

      ; // 双击播放器暂停，移动端无双击事件，用两次点击时间模拟 300 毫秒2次点击为双击

      var clickTime = 0;
      videoEl.addEventListener('click', function () {
        var nowTime = new Date().getTime();

        if (nowTime - clickTime < 300) {
          if (videoEl.paused) {
            videoEl.play();
          } else {
            videoEl.pause();
          }
        }

        clickTime = nowTime;
      });
      this.el = videoEl;
      this.initEvent();
    }
  }, {
    key: "initEvent",
    value: function initEvent() {
      var _this3 = this;

      // loadstart：视频查找。当浏览器开始寻找指定的音频/视频时触发，也就是当加载过程开始时
      this.el.addEventListener('loadstart', function (e) {
        return _this3.setState('loadstart', e);
      }); // durationchange：时长变化。当指定的音频/视频的时长数据发生变化时触发，加载后，时长由 NaN 变为音频/视频的实际时长

      this.el.addEventListener('durationchange', function (e) {
        return _this3.setState('durationchange', e);
      }); // loadedmetadata ：元数据加载。当指定的音频/视频的元数据已加载时触发，元数据包括：时长、尺寸（仅视频）以及文本轨道

      this.el.addEventListener('loadedmetadata', function (e) {
        return _this3.setState('loadedmetadata', e);
      }); // loadeddata：视频下载监听。当当前帧的数据已加载，但没有足够的数据来播放指定音频/视频的下一帧时触发
      // this.el.addEventListener('loadeddata', (e) => {
      //   console.log('提示当前帧的数据是可用的');
      //   this.setState('loadeddata');
      // });
      // progress：浏览器缓存监听。当浏览器正在缓存指定的音频/视频时触发

      this.el.addEventListener('progress', function (e) {
        return _this3.setState('progress', e);
      }); // canplay：可播放监听。当浏览器能够开始播放指定的音频/视频时触发

      this.el.addEventListener('canplay', function (e) {
        return _this3.setState('canplay', e);
      }); // canplaythrough：可流畅播放。当浏览器预计能够在不停下来进行缓冲的情况下持续播放指定的音频/视频时触发

      this.el.addEventListener('canplaythrough', function (e) {
        return _this3.setState('loadedmetadata', e);
      }); // play：播放监听

      this.el.addEventListener('play', function (e) {
        return _this3.setState('play', e);
      }); // pause：暂停监听

      this.el.addEventListener('pause', function (e) {
        return _this3.setState('pause', e);
      }); // seeking：查找开始。当用户开始移动/跳跃到音频/视频中新的位置时触发
      // this.el.addEventListener('seeking', (e) => {
      //   console.log('开始移动进度条');
      // });
      // // seeked：查找结束。当用户已经移动/跳跃到视频中新的位置时触发

      this.el.addEventListener('seeked', function (e) {
        return _this3.setState('seeked', e);
      }); // waiting：视频加载等待。当视频由于需要缓冲下一帧而停止，等待时触发

      this.el.addEventListener('waiting', function (e) {
        return _this3.setState('waiting', e);
      }); // playing：当视频在已因缓冲而暂停或停止后已就绪时触发

      this.el.addEventListener('playing', function (e) {
        return _this3.setState('playing', e);
      }); // timeupdate：目前的播放位置已更改时，播放时间更新

      this.el.addEventListener('timeupdate', function (e) {
        return _this3.setState('timeupdate', e);
      }); // ended：播放结束

      this.el.addEventListener('ended', function (e) {
        return _this3.setState('ended', e);
      }); // error：播放错误

      this.el.addEventListener('error', function (e) {
        return _this3.setState('error', e);
      }); // volumechange：当音量更改时
      // this.el.addEventListener('volumechange', (e) => {
      //   console.log('音量更改');
      // });
      // stalled：当浏览器尝试获取媒体数据，但数据不可用时
      //   this.el.addEventListener('stalled', (e) => {
      //     console.log('媒体数据不可用');
      //   });
      // ratechange：当视频的播放速度已更改时
      // this.el.addEventListener('ratechange', (e) => {
      //   console.log('ratechange');
      // });
    }
  }, {
    key: "duration",
    get: function get() {
      return isNaN(this.el.duration) ? 0 : this.el.duration;
    }
  }, {
    key: "currentTime",
    get: function get() {
      return isNaN(this.el.currentTime) ? 0 : this.el.currentTime;
    }
  }]);

  return Video;
}();
// CONCATENATED MODULE: ./src/utils/util.ts
function util_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function util_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function util_createClass(Constructor, protoProps, staticProps) { if (protoProps) util_defineProperties(Constructor.prototype, protoProps); if (staticProps) util_defineProperties(Constructor, staticProps); return Constructor; }

var Utils = /*#__PURE__*/function () {
  function Utils() {
    util_classCallCheck(this, Utils);
  }

  util_createClass(Utils, null, [{
    key: "hasClass",

    /**
     * 判断class是否存在
     * @param el dom对象
     * @param cls class名称
     */
    value: function hasClass(el, cls) {
      return el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }
    /**
     * 添加class
     * @param el dom对象
     * @param cls class
     */

  }, {
    key: "addClass",
    value: function addClass(el, cls) {
      // if (!this.hasClass(el,cls)) el.className += ' ' + cls; 
      if (!this.hasClass(el, cls)) el.classList.add(cls);
    }
    /**
     * 删除class
     * @param el dom对象
     * @param cls class
     */

  }, {
    key: "removeClass",
    value: function removeClass(el, cls) {
      if (this.hasClass(el, cls)) {
        // var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
        // el.className = el.className.replace(reg, ' ');  
        el.classList.remove(cls);
      }
    }
    /**
     * 切换class 有则删除，无则添加
     * @param el dom对象
     * @param cls class
     */

  }, {
    key: "toggleClass",
    value: function toggleClass(el, cls) {
      if (this.hasClass(el, cls)) {
        if (this.hasClass(el, cls)) {
          this.removeClass(el, cls);
        } else {
          this.addClass(el, cls);
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
// CONCATENATED MODULE: ./src/utils/index.ts

// CONCATENATED MODULE: ./src/components/controls.ts
function controls_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function controls_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function controls_createClass(Constructor, protoProps, staticProps) { if (protoProps) controls_defineProperties(Constructor.prototype, protoProps); if (staticProps) controls_defineProperties(Constructor, staticProps); return Constructor; }

function controls_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var controls_Controls = /*#__PURE__*/function () {
  // 控制条容器
  // 提示label
  // 进度条容器
  // 当前进度
  // 缓冲进度
  // 进度条拖动按钮
  // 播放按钮
  // 播放时间/视频总长
  // 进度条左边按钮容器
  // 控制条右边按钮容器
  function Controls(video, containerElemelt, config) {
    var _this = this;

    controls_classCallCheck(this, Controls);

    this.video = video;
    this.containerElemelt = containerElemelt;
    this.config = config;

    controls_defineProperty(this, "controlsEl", void 0);

    controls_defineProperty(this, "labelEl", void 0);

    controls_defineProperty(this, "progress", void 0);

    controls_defineProperty(this, "current_progress", void 0);

    controls_defineProperty(this, "current_buffer", void 0);

    controls_defineProperty(this, "current_dot", void 0);

    controls_defineProperty(this, "play_btn", void 0);

    controls_defineProperty(this, "timeEl", void 0);

    controls_defineProperty(this, "controls_left", void 0);

    controls_defineProperty(this, "controls_right", void 0);

    controls_defineProperty(this, "isMove", false);

    controls_defineProperty(this, "timeout", null);

    controls_defineProperty(this, "showControls", function () {
      clearTimeout(_this.timeout);
      Utils.addClass(_this.controlsEl, 'showControls');
    });

    controls_defineProperty(this, "hideControls", function () {
      _this.timeout = setTimeout(function () {
        Utils.removeClass(_this.controlsEl, 'showControls');
      }, 5000);
    });

    controls_defineProperty(this, "showmoveLabel", function (offsetX) {
      if (offsetX < 0) offsetX = 0;
      _this.labelEl.innerText = _this.getOffsetXTimeText(offsetX);
      var minLeft = _this.labelEl.clientWidth / 2;
      var maxRight = _this.progress.clientWidth - minLeft;
      if (offsetX < minLeft) offsetX = minLeft; // 防止被遮掩

      if (offsetX > maxRight) offsetX = maxRight;
      _this.labelEl.style.left = offsetX + 'px';
      _this.labelEl.style.visibility = 'visible';
    });

    controls_defineProperty(this, "hidemoveLabel", function () {
      _this.labelEl.style.visibility = 'hidden';
    });

    controls_defineProperty(this, "progressHover", function (isHover) {
      if (isHover) {
        Utils.addClass(_this.progress, 'hover_cls');
      } else {
        Utils.removeClass(_this.progress, 'hover_cls');
      }
    });

    this.createControlsEl(); // 创建容器

    this.createControlsBtn(); // 控制条左边元素

    if (config.controls) {
      this.showControls();
    }
  }
  /** 获取进度条宽度，实时获取 */


  controls_createClass(Controls, [{
    key: "createControlsEl",
    // 控制条dom创建
    value: function createControlsEl() {
      this.controlsEl = document.createElement('div');
      this.controlsEl.className = 'p_controls'; // 进度条容器

      this.progress = document.createElement('div');
      this.progress.className = 'progress_bar'; // 当前播放进度

      this.current_progress = document.createElement('div');
      this.current_progress.className = 'current_progress'; // 当前缓冲进度

      this.current_buffer = document.createElement('div');
      this.current_buffer.className = 'current_buffer'; // 进度条按钮

      this.current_dot = document.createElement('i');
      this.current_dot.className = 'current_dot';
      this.progress.appendChild(this.current_progress);
      this.progress.appendChild(this.current_buffer);
      this.progress.appendChild(this.current_dot);
      this.controlsEl.appendChild(this.progress);
      if (this.config.isFastForward && this.config.controls) this.initControlsEvent();
      if (this.config.autoHideControls && this.config.controls) this.initAutoControls();
    }
    /** 控制条拖拽事件 */

  }, {
    key: "initControlsEvent",
    value: function initControlsEvent() {
      var _this2 = this;

      var isPc = Utils.isPC(); // pc端 和移动端事件区分

      var touchstart = isPc ? 'mousedown' : 'touchstart'; // 鼠标按下/触摸

      var touchmove = isPc ? 'mousemove' : 'touchmove'; // 开始移动/拖动

      var touchend = isPc ? 'mouseup' : 'touchend'; // 松开/手指移开
      // 鼠标按下时候，跳转进度

      this.progress.onmousedown = function (event) {
        if (!_this2.config.isFastForward) return;

        _this2.setPlayTime(event.offsetX);

        var per = 100 * event.offsetX / _this2.progressWidth;

        _this2.setCurrentPlayPer(per);
      }; // 阻止事件冒泡到点击进度条


      this.current_dot.onmousedown = function (event) {
        return event.stopPropagation();
      }; // 进度条按钮拖动


      this.current_dot.addEventListener(touchstart, function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (!_this2.config.isFastForward) return; // 移动端触摸到进度条变化

        if (!isPc && _this2.config.isFastForward) _this2.progressHover(true); // 如果这个元素的位置内只有一个手指

        if (isPc || event.targetTouches.length === 1) {
          var touch = isPc ? event : event.targetTouches[0];
          if (!isPc) _this2.showmoveLabel(touch.clientX); // 开始拖动

          var move = function move(e) {
            _this2.isMove = true;
            var touch2 = isPc ? e : e.targetTouches[0];

            var touchX = _this2.offsetXPer(touch2.clientX);

            _this2.setCurrentPlayPer(touchX);

            _this2.showmoveLabel(touch2.clientX);
          }; // 如果浏览器下，需要全局监听拖动


          var dotElmt = isPc ? window : _this2.current_dot; // 拖动完成 删除事件

          var chend = function chend(e) {
            // 拖动完成更新播放器时间
            var touch2 = isPc ? e : e.changedTouches[0]; // 更新视频实际播放时间

            _this2.setPlayTime(touch2.clientX);

            _this2.isMove = false;
            if (!isPc) _this2.progressHover(false);

            _this2.hidemoveLabel();

            dotElmt.removeEventListener(touchmove, move);
            dotElmt.removeEventListener(touchend, chend);
          };

          dotElmt.addEventListener(touchmove, move);
          dotElmt.addEventListener(touchend, chend);
        }
      }, false);

      if (isPc) {
        ///进度条控制样式 mouseover mouseout：鼠标移入子元素时会重复触发所以使用mouseenter mouseleave
        // PC端鼠标移入控制条变粗变大
        this.progress.addEventListener('mouseenter', function (e) {
          return _this2.progressHover(true);
        }); // 鼠标移开

        this.progress.addEventListener('mouseleave', function (e) {
          _this2.progressHover(false);

          _this2.hidemoveLabel();
        }); // 鼠标移动

        this.progress.addEventListener('mousemove', function (e) {
          return _this2.showmoveLabel(e.clientX);
        });
      }
    }
    /** 自动显示隐藏控制条 */

  }, {
    key: "initAutoControls",
    value: function initAutoControls() {
      var _this3 = this;

      var onmouseover = function onmouseover(e) {
        _this3.showControls();

        _this3.hideControls();
      };

      var isPc = Utils.isPC();

      if (isPc) {
        // 鼠标在容器移动时候触发显示
        this.containerElemelt.addEventListener('mousemove', onmouseover); // 当鼠标移动到控制条上，取消隐藏，一直显示

        this.controlsEl.addEventListener('mouseenter', function (e) {
          _this3.containerElemelt.removeEventListener('mousemove', onmouseover);

          _this3.showControls();
        }); // 鼠标移开

        this.controlsEl.addEventListener('mouseleave', function (e) {
          _this3.containerElemelt.addEventListener('mousemove', onmouseover);

          _this3.hideControls();
        });
      } else {
        this.containerElemelt.ontouchstart = this.showControls;
        this.containerElemelt.ontouchend = this.hideControls;
      }
    } // 控制条按钮

  }, {
    key: "createControlsBtn",
    value: function createControlsBtn() {
      var _this4 = this;

      this.labelEl = document.createElement('span');
      this.labelEl.className = 'date_label';
      this.labelEl.innerText = '00:00';
      this.controlsEl.appendChild(this.labelEl); // 左边容器

      this.controls_left = document.createElement('div');
      this.controls_left.className = "controls_left"; // 播放按钮

      this.play_btn = document.createElement('i');
      this.play_btn.className = "button_img play play_btn";
      this.play_btn.addEventListener('click', function () {
        var _this4$video;

        if ((_this4$video = _this4.video) === null || _this4$video === void 0 ? void 0 : _this4$video.el.paused) {
          _this4.video.el.play();
        } else {
          _this4.video.el.pause();
        }
      }); // 显示时间

      this.timeEl = document.createElement('div');
      this.timeEl.className = 'time';
      this.timeEl.innerText = '00:00 / 00:00';
      this.controls_left.appendChild(this.play_btn);
      this.controls_left.appendChild(this.timeEl);
      this.controlsEl.appendChild(this.controls_left); // 右边容器

      this.controls_right = document.createElement('div');
      this.controls_right.className = "controls_right";
      this.controlsEl.appendChild(this.controls_right);
    }
    /** 设置播放按钮状态 */

  }, {
    key: "changePlay",
    value: function changePlay(isPause) {
      if (isPause) {
        Utils.removeClass(this.play_btn, 'suspend');
      } else {
        Utils.addClass(this.play_btn, 'suspend');
      }
    }
    /**
     * 根据当前x位置计算在进度条占比
     * @param offsetX 距离进度条的偏移
     */

  }, {
    key: "offsetXPer",
    value: function offsetXPer(offsetX) {
      if (offsetX < 0) {
        offsetX = 0;
      }

      ;

      if (offsetX > this.progressWidth) {
        offsetX = this.progressWidth;
      }

      ;
      var per = 100 * offsetX / this.progressWidth;
      return per;
    }
    /**
     * 根据当前x位置计算当前时间进度
     * @param per 
     */

  }, {
    key: "getOffsetXTimeText",
    value: function getOffsetXTimeText(offsetX) {
      var maxWidth = this.progressWidth; // 进度总长度，进度条-按钮

      if (offsetX > maxWidth) offsetX = maxWidth;
      var slitherCurrentTime = offsetX / maxWidth * this.video.duration; // 当前拖动进度位置时间

      var currentTime = "".concat(Utils.formatSeconds(slitherCurrentTime)); // 当前播放进度- 分:秒

      return currentTime;
    }
    /** 设置缓存进度条百分比样式 */

  }, {
    key: "setBufferPer",
    value: function setBufferPer(per) {
      this.current_buffer.style.width = per + '%';
    }
    /** 设置进度条百分比样式 */

  }, {
    key: "setCurrentPlayPer",
    value: function setCurrentPlayPer(per) {
      this.current_progress.style.width = per + '%';
      this.current_dot.style.left = per + '%';
    }
    /** 更新展示当前播放时间进度 */

  }, {
    key: "changePlayTimeText",
    value: function changePlayTimeText() {
      if (!this.isMove) {
        // 防止拖动进度条时候更新
        var per = 100 * this.video.currentTime / this.video.duration;
        this.setCurrentPlayPer(per);
      }

      var currentTime = Utils.formatSeconds(this.video.currentTime); // 当前播放时长

      var duration = Utils.formatSeconds(this.video.duration); // 视频总长度- 分:秒

      this.timeEl.innerHTML = "".concat(currentTime, " / ").concat(duration);
    }
    /**
     * 根据当前位置更新播放器进度
     * @param offsetX 当前进度条偏移位置
     */

  }, {
    key: "setPlayTime",
    value: function setPlayTime(offsetX) {
      if (offsetX > this.progressWidth) {
        offsetX = this.progressWidth;
      }

      var time = offsetX / this.progressWidth * this.video.duration;
      this.video.setCurrentTime(time);
    }
  }, {
    key: "progressWidth",
    get: function get() {
      return this.progress.clientWidth;
    }
  }]);

  return Controls;
}();
// CONCATENATED MODULE: ./src/components/cover.ts
function cover_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function cover_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function cover_createClass(Constructor, protoProps, staticProps) { if (protoProps) cover_defineProperties(Constructor.prototype, protoProps); if (staticProps) cover_defineProperties(Constructor, staticProps); return Constructor; }

function cover_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VideoCover = /*#__PURE__*/function () {
  // 音量按钮容器
  function VideoCover(containerElemelt) {
    var _this = this;

    cover_classCallCheck(this, VideoCover);

    this.containerElemelt = containerElemelt;

    cover_defineProperty(this, "el", void 0);

    cover_defineProperty(this, "err_cover", void 0);

    cover_defineProperty(this, "loading_cover", void 0);

    cover_defineProperty(this, "play_btn_cover", void 0);

    cover_defineProperty(this, "play", void 0);

    this.el = document.createElement('div');
    this.el.className = "video_cover"; // 播放按钮

    var play_btn = document.createElement('div');
    play_btn.className = "cover_content";
    play_btn.innerHTML = '<div class="cover_img play play_btn"></div>';
    play_btn.addEventListener('click', function () {
      return _this.play && _this.play();
    });
    this.play_btn_cover = play_btn; // 错误

    var err = document.createElement('div');
    err.className = "cover_content";
    err.innerHTML = "\n            <div class=\"cover_img error\"></div>\n            <div class=\"tips_text tips_error\">\u8D44\u6E90\u52A0\u8F7D\u5931\u8D25~</div>\n        ";
    this.err_cover = err; // 加载中

    var loading = document.createElement('div');
    loading.className = "cover_content";
    loading.innerHTML = "\n            <div class=\"video_loading\">\n                <div>\n                    <div class=\"spot\"></div>\n                    <div class=\"spot\"></div>\n                    <div class=\"spot\"></div>\n                    <div class=\"spot\"></div>\n                    <div class=\"spot\"></div>\n                </div>\n                <div class=\"tips_text\">\u6B63\u5728\u52A0\u8F7D...</div>\n            </div>\n        ";
    this.loading_cover = loading;
  }

  cover_createClass(VideoCover, [{
    key: "setState",
    value: function setState(state) {
      if (this.containerElemelt.contains(this.el)) {
        this.containerElemelt.removeChild(this.el);
      }

      this.el.innerHTML = '';

      switch (state) {
        case 'play':
          this.el.appendChild(this.play_btn_cover);
          break;

        case 'loading':
          this.el.appendChild(this.loading_cover);
          break;

        case 'error':
          this.el.appendChild(this.err_cover);
          break;

        default:
          break;
      }

      if (this.el.hasChildNodes()) {
        this.containerElemelt.appendChild(this.el);
      }
    }
  }]);

  return VideoCover;
}();
// CONCATENATED MODULE: ./src/components/btns/volume_btn.ts
function volume_btn_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function volume_btn_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function volume_btn_createClass(Constructor, protoProps, staticProps) { if (protoProps) volume_btn_defineProperties(Constructor.prototype, protoProps); if (staticProps) volume_btn_defineProperties(Constructor, staticProps); return Constructor; }

function volume_btn_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var volume_btn_VolumeBtn = /*#__PURE__*/function () {
  // 事件
  // 音量按钮容器

  /** 音量slider */

  /** 当前视频播放音量 0 - 1 */

  /** 是否静音 */
  function VolumeBtn() {
    var _this = this;

    volume_btn_classCallCheck(this, VolumeBtn);

    volume_btn_defineProperty(this, "valueChange", void 0);

    volume_btn_defineProperty(this, "el", void 0);

    volume_btn_defineProperty(this, "volumeSlider", void 0);

    volume_btn_defineProperty(this, "currentvolum", 0.8);

    volume_btn_defineProperty(this, "isMute", false);

    this.el = document.createElement('div');
    this.el.className = "volume_bth";
    this.el.innerHTML = "\n            <div class=\"volume_con\">\n                <div class=\"volume_slider\">\n                    <input id=\"volumeslider\" type='range' min=\"0\" max=\"1\" step=\"0.01\" value=\"0.8\"/>\n                </div>\n            </div>\n            <i id=\"volume_img\" class=\"button_img sound\"></i>\n        ";
    this.volumeSlider = this.el.querySelector('#volumeslider'); // 音量拖动事件

    this.volumeSlider.oninput = function (e) {
      e.stopPropagation();
      _this.currentvolum = e.target.value;

      _this.setValue(_this.currentvolum);

      _this.valueChange && _this.valueChange(_this.currentvolum);
    }; // 点击事件


    if (Utils.isPC()) {
      this.el.querySelector('#volume_img').addEventListener('click', function (e) {
        e.stopPropagation();
        _this.isMute = !_this.isMute;
        var val = _this.isMute ? 0 : _this.currentvolum;

        _this.setValue(val);

        _this.valueChange && _this.valueChange(val);
      });
    }
  }

  volume_btn_createClass(VolumeBtn, [{
    key: "setValue",

    /** 设置音量 */
    value: function setValue(val) {
      var value = typeof val === 'string' ? parseFloat(val) : val;
      this.volumeSlider.style.backgroundSize = "".concat(value * 100, "% 100%");
      /*设置左右宽度比例*/

      this.volumeSlider.value = "".concat(val);
      var volume_bth = this.el.querySelector('#volume_img');

      if (value && volume_bth) {
        volume_bth.classList.remove('mute');
      } else {
        volume_bth.classList.add('mute');
      }
    }
  }]);

  return VolumeBtn;
}();
// CONCATENATED MODULE: ./src/components/btns/fullscreen_btn.ts
function fullscreen_btn_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function fullscreen_btn_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function fullscreen_btn_createClass(Constructor, protoProps, staticProps) { if (protoProps) fullscreen_btn_defineProperties(Constructor.prototype, protoProps); if (staticProps) fullscreen_btn_defineProperties(Constructor, staticProps); return Constructor; }

function fullscreen_btn_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var fullscreen_btn_FullscreenBtn = /*#__PURE__*/function () {
  function FullscreenBtn(videoEl) {
    var _this = this;

    fullscreen_btn_classCallCheck(this, FullscreenBtn);

    fullscreen_btn_defineProperty(this, "el", void 0);

    fullscreen_btn_defineProperty(this, "isFullscreen", false);

    this.el = document.createElement('i');
    this.el.className = 'button_img full';
    this.el.addEventListener('click', function () {
      _this.fullscreen(_this.isFullscreen, videoEl);
    });
  }

  fullscreen_btn_createClass(FullscreenBtn, [{
    key: "changeIcon",
    value: function changeIcon(isFull) {
      if (isFull) {
        Utils.addClass(this.el, 'scale');
      } else {
        Utils.removeClass(this.el, 'scale');
      }
    }
    /** 全屏 */

  }, {
    key: "fullscreen",
    value: function fullscreen(isFull, el) {
      if (isFull) {
        if (document['exitFullscreen']) {
          document['exitFullscreen']();
        } else if (document['webkitCancelFullScreen']) {
          document['webkitCancelFullScreen']();
        } else if (document['mozCancelFullScreen']) {
          document['mozCancelFullScreen']();
        } else if (document['msExitFullscreen']) {
          document['msExitFullscreen']();
        } else if (document['webkitEnterFullscreen']) {
          return;
        }

        this.isFullscreen = false;
        this.changeIcon(false);
      } else {
        var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen || el.webkitEnterFullscreen || el.enterFullScreen;

        if (requestMethod) {
          requestMethod.call(el);
          if (el.webkitEnterFullscreen || el.enterFullScreen) return;
          this.isFullscreen = true;
          this.changeIcon(true);
        } else {
          alert('该浏览器不支持全屏');
        }
      }
    }
  }]);

  return FullscreenBtn;
}();
// CONCATENATED MODULE: ./src/components/btns/speed_btn.ts
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function speed_btn_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function speed_btn_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SpeedBtn = // 事件
// 音量按钮容器
// 当前视频播放音量 0 - 1
function SpeedBtn() {
  var _this = this;

  speed_btn_classCallCheck(this, SpeedBtn);

  speed_btn_defineProperty(this, "valueChange", void 0);

  speed_btn_defineProperty(this, "el", void 0);

  speed_btn_defineProperty(this, "value", 0.8);

  this.el = document.createElement('div');
  this.el.className = "speed_bth";
  this.el.innerHTML = "\n            <div id=\"speed_con\" class=\"speed_li\">\n                <div>2.0x</div>\n                <div>1.5x</div>\n                <div>1.2x</div>\n                <div class=\"on\">1.0x</div>\n                <div>0.5x</div>\n            </div>\n            <span id=\"speed_btn\">1.0x</span>\n        ";
  var speed_con = this.el.querySelector('#speed_con').children;
  var speed_btn = this.el.querySelector('#speed_btn');
  /** 倍速列表点击事件 */

  var _iterator = _createForOfIteratorHelper(speed_con),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var i = _step.value;
      i.addEventListener('click', function (e) {
        var _iterator2 = _createForOfIteratorHelper(speed_con),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var el = _step2.value;
            el.classList.remove("on");
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        e.target.classList.add("on");
        speed_btn.innerText = e.target.innerText;
        _this.value = parseFloat(e.target.innerText);
        _this.valueChange && _this.valueChange(_this.value);
      });
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};
// CONCATENATED MODULE: ./src/components/index.ts






// EXTERNAL MODULE: ./src/index.less
var src = __webpack_require__(1);

// CONCATENATED MODULE: ./src/index.ts
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { src_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function src_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function src_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function src_createClass(Constructor, protoProps, staticProps) { if (protoProps) src_defineProperties(Constructor.prototype, protoProps); if (staticProps) src_defineProperties(Constructor, staticProps); return Constructor; }

function src_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var src_PrettyVideo = /*#__PURE__*/function () {
  function PrettyVideo() {
    var _this = this;

    src_classCallCheck(this, PrettyVideo);

    src_defineProperty(this, "containerElemelt", void 0);

    src_defineProperty(this, "video", void 0);

    src_defineProperty(this, "controls", void 0);

    src_defineProperty(this, "volume", void 0);

    src_defineProperty(this, "fullscreenBtn", void 0);

    src_defineProperty(this, "videoCover", void 0);

    src_defineProperty(this, "config", {
      autoplay: false,
      autoHideControls: true,
      isFastForward: true,
      hideFullScreen: false,
      controls: true,
      loop: false,
      preload: 'auto',
      debug: false
    });

    src_defineProperty(this, "envents", {});

    src_defineProperty(this, "setUrl", function (object) {
      return _this.video.setUrl(object);
    });

    src_defineProperty(this, "reload", function () {
      var _this$video;

      return (_this$video = _this.video) === null || _this$video === void 0 ? void 0 : _this$video.el.load();
    });

    src_defineProperty(this, "play", function () {
      var _this$video2;

      return (_this$video2 = _this.video) === null || _this$video2 === void 0 ? void 0 : _this$video2.el.play();
    });

    src_defineProperty(this, "pause", function () {
      var _this$video3;

      return (_this$video3 = _this.video) === null || _this$video3 === void 0 ? void 0 : _this$video3.el.pause();
    });

    src_defineProperty(this, "setVolum", function (value) {
      return _this.video.el.volume = value;
    });

    src_defineProperty(this, "dispose", function () {
      _this.containerElemelt.innerHTML = '';
    });

    src_defineProperty(this, "getDuration", function () {
      var _this$video4, _this$video5, _this$video6, _this$video7;

      var currentSecond = ((_this$video4 = _this.video) === null || _this$video4 === void 0 ? void 0 : _this$video4.currentTime) || 0; // 当前播放时长 单位：秒

      var durationSecond = ((_this$video5 = _this.video) === null || _this$video5 === void 0 ? void 0 : _this$video5.duration) || 0; // 总时长 单位：秒
      // 转换格式HH:mm:ss  HH如果有的话才展示 否则展示mm:ss

      var currentText = Utils.formatSeconds(((_this$video6 = _this.video) === null || _this$video6 === void 0 ? void 0 : _this$video6.currentTime) || 0);
      var durationText = Utils.formatSeconds(((_this$video7 = _this.video) === null || _this$video7 === void 0 ? void 0 : _this$video7.duration) || 0);
      return {
        currentSecond: currentSecond,
        durationSecond: durationSecond,
        currentText: currentText,
        durationText: durationText
      };
    });
  }

  src_createClass(PrettyVideo, [{
    key: "init",
    // 监听事件列表
    value: function init(el) {
      var _this2 = this;

      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      try {
        var videoContainer = typeof el === 'string' ? document.getElementById(el) : el;
        if (!videoContainer) throw new Error("无效的dom元素，请在页面加载完成后初始化播放器。");
        this.containerElemelt = document.createElement('div');
        this.containerElemelt.className = 'video_player'; // 右键

        this.containerElemelt.oncontextmenu = function (e) {
          return false; //阻止右键默认事件。
        };

        this.video = new Video();
        this.videoCover = new VideoCover(this.containerElemelt);

        this.videoCover.play = function () {
          var _this2$video$el;

          return (_this2$video$el = _this2.video.el) === null || _this2$video$el === void 0 ? void 0 : _this2$video$el.play();
        };

        this.handleStateChange();
        this.containerElemelt.appendChild(this.video.el);
        this.containerElemelt.appendChild(this.video.posterEl);
        this.initConfig(config);

        if (config.src) {
          this.setUrl({
            src: config.src,
            poster: config.poster
          });
        } else {
          this.videoCover.setState('loading');
        }

        videoContainer.appendChild(this.containerElemelt);
      } catch (error) {
        console.error(error);
      }
    }
    /** 播放地址 */

  }, {
    key: "isPause",

    /** 是否暂停状态 */
    value: function isPause() {
      var _this$video8;

      return (_this$video8 = this.video) === null || _this$video8 === void 0 ? void 0 : _this$video8.el.paused;
    }
    /** 暂停播放 */

  }, {
    key: "on",

    /**
     * 监听事件
     * @param eventName 事件名称
     * @param callback 回调
     */
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
    /** 播放器配置 */

  }, {
    key: "initConfig",
    value: function initConfig(cfg) {
      this.config = _objectSpread(_objectSpread({}, this.config), cfg);
      this.video.el.autoplay = this.config.autoplay ? true : false;
      this.video.el.loop = this.config.loop ? true : false;
      this.video.el.preload = this.config.preload;
      this.initControls();
    } // video事件

  }, {
    key: "handleStateChange",
    value: function handleStateChange() {
      var _this3 = this;

      this.video.onEvent = function (state, e) {
        if (typeof _this3.envents[state] === 'function') {
          _this3.envents[state]({
            type: 'state'
          });
        }

        ;

        _this3.videoCover.setState(_this3.isPause() ? 'play' : '');

        if (_this3.config.debug) console.log(state);

        switch (state) {
          case 'waiting':
            _this3.videoCover.setState('loading');

            break;

          case 'error':
            _this3.videoCover.setState('error');

            if (_this3.containerElemelt.contains(_this3.controls.controlsEl)) {
              _this3.containerElemelt.removeChild(_this3.controls.controlsEl);
            }

            break;

          case 'durationchange':
            // 视频时长变化
            if (!_this3.containerElemelt.contains(_this3.controls.controlsEl)) {
              _this3.containerElemelt.appendChild(_this3.controls.controlsEl);
            }

            ;

            if (!isNaN(_this3.video.duration)) {
              // 防止拖动进度条时候更新
              var per = 100 * _this3.video.currentTime / _this3.video.duration;

              _this3.controls.setCurrentPlayPer(per);
            }

          case 'loadstart':
            _this3.videoCover.setState('loading');

            break;

          case 'play':
          case 'ended':
          case 'pause':
          case 'seeked':
            _this3.controls.changePlay(_this3.isPause());

            break;

          case 'canplay':
          case 'loadedmetadata':
            // 元数据加载完成
            _this3.controls.changePlayTimeText();

            if (_this3.video.currentTime <= 0) {
              _this3.video.showPoster();
            }

            break;

          case 'timeupdate':
            // 播放中
            _this3.controls.changePlayTimeText();

            _this3.video.hidePoster();

            break;

          case 'progress':
            // 缓冲中
            var buffered = e.target.buffered;

            if (buffered.length) {
              var loaded = 100 * buffered.end(0) / e.target.duration;

              _this3.controls.setBufferPer(loaded);
            }

            break;

          case 'x5videoenterfullscreen':
            _this3.fullscreenBtn && _this3.fullscreenBtn.changeIcon(true);

          case 'x5videoexitfullscreen':
            _this3.fullscreenBtn && _this3.fullscreenBtn.changeIcon(false);
            break;

          default:
            break;
        }
      };
    }
    /** 初始化控制条 */

  }, {
    key: "initControls",
    value: function initControls() {
      var _this4 = this;

      this.controls = new controls_Controls(this.video, this.containerElemelt, this.config); // 音量按钮

      this.volume = new volume_btn_VolumeBtn();
      this.controls.controls_right.appendChild(this.volume.el);

      this.volume.valueChange = function (value) {
        return _this4.setVolum(value);
      }; // 倍速


      var speedBtn = new SpeedBtn();
      this.controls.controls_right.appendChild(speedBtn.el);

      speedBtn.valueChange = function (value) {
        _this4.video.el.playbackRate = value;
      };

      if (!this.config.hideFullScreen) {
        // 全屏按钮
        this.fullscreenBtn = new fullscreen_btn_FullscreenBtn(this.video.el);
        this.controls.controls_right.appendChild(this.fullscreenBtn.el);
      }
    }
  }]);

  return PrettyVideo;
}();

/* harmony default export */ var src_0 = __webpack_exports__["default"] = (src_PrettyVideo);

/***/ })
/******/ ])["default"];
});