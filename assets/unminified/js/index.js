/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/library/align-justify.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/align-justify.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const alignJustify = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M4 12.8h16v-1.5H4v1.5zm0 7h12.4v-1.5H4v1.5zM4 4.3v1.5h16V4.3H4z"
}));
/* harmony default export */ __webpack_exports__["default"] = (alignJustify);
//# sourceMappingURL=align-justify.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/code.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/code.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const code = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M20.8 10.7l-4.3-4.3-1.1 1.1 4.3 4.3c.1.1.1.3 0 .4l-4.3 4.3 1.1 1.1 4.3-4.3c.7-.8.7-1.9 0-2.6zM4.2 11.8l4.3-4.3-1-1-4.3 4.3c-.7.7-.7 1.8 0 2.5l4.3 4.3 1.1-1.1-4.3-4.3c-.2-.1-.2-.3-.1-.4z"
}));
/* harmony default export */ __webpack_exports__["default"] = (code);
//# sourceMappingURL=code.js.map

/***/ }),

/***/ "./inc/support/formatting/src/js/abbreviation/components/edit.js":
/*!***********************************************************************!*\
  !*** ./inc/support/formatting/src/js/abbreviation/components/edit.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/code.js");

/**
 * WordPress dependencies
 */

const {
  i18n: {
    __
  },
  element: {
    useState,
    useEffect
  },
  components: {
    Modal,
    Button,
    TextControl,
    Icon
  },
  richText: {
    applyFormat,
    removeFormat,
    getActiveFormat
  },
  blockEditor: {
    RichTextToolbarButton
  }
} = wp;
const name = 'wca/abbreviation';
const Edit = _ref => {
  let {
    isActive,
    value,
    onChange
  } = _ref;
  const activeFormat = getActiveFormat(value, name);
  const {
    attributes = {}
  } = activeFormat || {};
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState({
    ...attributes
  });
  useEffect(() => setState({
    ...attributes
  }), [activeFormat]);
  const toggle = () => setIsOpen(!isOpen);
  const {
    title
  } = state;
  const onClick = () => {
    if (title) {
      onChange(applyFormat(value, {
        type: name,
        attributes: state
      }));
    } else {
      onChange(removeFormat(value, name));
    }
    toggle();
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichTextToolbarButton, {
    icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Icon, {
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_1__["default"]
    }),
    title: __('Abbreviation', 'wecodeart'),
    onClick: toggle,
    isActive: isActive
  }), isOpen && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Modal, {
    title: __('Insert Abbreviation', 'wecodeart'),
    onRequestClose: toggle
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: __('Title', 'wecodeart'),
    value: title,
    onChange: title => setState({
      ...state,
      title
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    isPrimary: true,
    isLarge: true,
    onClick: onClick
  }, title ? __('Apply', 'wecodeart') : __('Remove', 'wecodeart'))));
};
/* harmony default export */ __webpack_exports__["default"] = (Edit);

/***/ }),

/***/ "./inc/support/formatting/src/js/abbreviation/index.js":
/*!*************************************************************!*\
  !*** ./inc/support/formatting/src/js/abbreviation/index.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   abbreviation: function() { return /* binding */ abbreviation; }
/* harmony export */ });
/* harmony import */ var _components_edit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/edit */ "./inc/support/formatting/src/js/abbreviation/components/edit.js");
/**
 * WordPress dependencies
 */
const {
  __
} = wp.i18n;

/**
 * Internal dependencies
 */


/**
 * Block constants
 */
const name = 'wca/abbreviation';
const abbreviation = {
  name,
  title: __('Abbreviation', 'wecodeart'),
  tagName: 'abbr',
  className: null,
  attributes: {
    title: 'title'
  },
  edit: _components_edit__WEBPACK_IMPORTED_MODULE_0__["default"]
};

/***/ }),

/***/ "./inc/support/formatting/src/js/justify/components/controls.js":
/*!**********************************************************************!*\
  !*** ./inc/support/formatting/src/js/justify/components/controls.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/align-justify.js");

/**
 * External dependencies
 */
const {
  get
} = lodash;


/**
 * WordPress dependencies
 */
const {
  i18n: {
    __
  },
  components: {
    Icon,
    withSpokenMessages
  },
  compose: {
    compose
  },
  data: {
    useSelect,
    useDispatch
  },
  blockEditor: {
    RichTextToolbarButton,
    store: blockEditorStore
  }
} = wp;
const allowedBlocks = ['core/paragraph', 'core/heading', 'core/list-item'];
const Control = () => {
  const {
    blockId,
    blockName,
    isBlockJustified,
    formatTypes = []
  } = useSelect(select => {
    const selectedBlock = select(blockEditorStore).getSelectedBlock();
    if (selectedBlock) {
      return {
        blockId: selectedBlock.clientId,
        blockName: selectedBlock.name,
        isBlockJustified: 'justify' === get(selectedBlock, 'attributes.align'),
        formatTypes: select('core/rich-text').getFormatTypes()
      };
    }
    return {};
  });
  const checkFormats = formatTypes.filter(_ref => {
    let {
      name
    } = _ref;
    return name === 'wpcom/justify';
  });
  if (allowedBlocks.includes(blockName) && checkFormats.length === 0) {
    const {
      updateBlockAttributes
    } = useDispatch(blockEditorStore, [blockId]);
    const onToggle = () => updateBlockAttributes(blockId, {
      align: isBlockJustified ? null : 'justify'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichTextToolbarButton, {
      icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Icon, {
        icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_1__["default"]
      }),
      title: __('Justify', 'wecodeart'),
      onClick: onToggle,
      isActive: isBlockJustified
    });
  }
  return null;
};
/* harmony default export */ __webpack_exports__["default"] = (compose(withSpokenMessages)(Control));

/***/ }),

/***/ "./inc/support/formatting/src/js/justify/index.js":
/*!********************************************************!*\
  !*** ./inc/support/formatting/src/js/justify/index.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   justify: function() { return /* binding */ justify; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/controls */ "./inc/support/formatting/src/js/justify/components/controls.js");

/**
 * WordPress dependencies
 */
const {
  __
} = wp.i18n;

/**
 * Internal dependencies
 */


/**
 * Block constants
 */
const name = 'wca/justify';
const justify = {
  name,
  title: __('Align text justify', 'wecodeart'),
  tagName: 'p',
  className: null,
  attributes: {
    style: 'style'
  },
  edit(_ref) {
    let {
      isActive,
      value,
      onChange,
      activeAttributes
    } = _ref;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_controls__WEBPACK_IMPORTED_MODULE_1__["default"], {
      name: name,
      isActive: isActive,
      value: value,
      onChange: onChange,
      activeAttributes: activeAttributes
    });
  }
};

/***/ }),

/***/ "./inc/support/formatting/src/js/underline/index.js":
/*!**********************************************************!*\
  !*** ./inc/support/formatting/src/js/underline/index.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   underline: function() { return /* binding */ underline; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

/**
 * WordPress dependencies
 */
const {
  i18n: {
    __
  },
  data: {
    select
  },
  components: {
    Icon,
    SVG,
    Path
  },
  richText: {
    toggleFormat
  },
  blockEditor: {
    RichTextToolbarButton,
    RichTextShortcut
  }
} = wp;

/**
 * Block constants
 */
const name = 'wca/underline';
const underline = {
  name,
  title: __('Underline', 'wecodeart'),
  tagName: 'span',
  className: 'has-underline',
  attributes: {
    class: 'class'
  },
  edit(_ref) {
    let {
      isActive,
      value,
      onChange
    } = _ref;
    const formatTypes = select('core/rich-text').getFormatTypes();
    const checkFormats = formatTypes.filter(formats => formats.name === 'wpcom/underline');
    const onToggle = () => onChange(toggleFormat(value, {
      type: name
    }));
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichTextShortcut, {
      type: "primary",
      character: "u",
      onUse: onToggle
    }), checkFormats.length === 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichTextToolbarButton, {
      icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Icon, {
        icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SVG, {
          style: {
            padding: 2
          },
          viewBox: "0 0 16 16"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Path, {
          d: "M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57-1.709 0-2.687-1.08-2.687-2.57V3.136zM12.5 15h-9v-1h9v1z"
        }))
      }),
      title: __('Underline', 'wecodeart'),
      onClick: onToggle,
      isActive: isActive,
      shortcutType: "primary",
      shortcutCharacter: "u"
    }));
  }
};

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["primitives"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!************************************************!*\
  !*** ./inc/support/formatting/src/js/index.js ***!
  \************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _justify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./justify */ "./inc/support/formatting/src/js/justify/index.js");
/* harmony import */ var _underline__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./underline */ "./inc/support/formatting/src/js/underline/index.js");
/* harmony import */ var _abbreviation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./abbreviation */ "./inc/support/formatting/src/js/abbreviation/index.js");
/**
 * Internal dependencies
 */




/**
 * WordPress dependencies
 */
const {
  registerFormatType,
  unregisterFormatType
} = wp.richText;
function registerWeCodeArtFormats() {
  [_justify__WEBPACK_IMPORTED_MODULE_0__.justify, _underline__WEBPACK_IMPORTED_MODULE_1__.underline, _abbreviation__WEBPACK_IMPORTED_MODULE_2__.abbreviation].forEach(_ref => {
    let {
      name,
      ...settings
    } = _ref;
    if (name) {
      unregisterFormatType(name);
      registerFormatType(name, settings);
    }
  });
}
wp.domReady(registerWeCodeArtFormats);
}();
/******/ })()
;
//# sourceMappingURL=index.js.map