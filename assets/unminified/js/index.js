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

/***/ "./inc/support/modules/formatting/src/js/abbreviation/components/edit.js":
/*!*******************************************************************************!*\
  !*** ./inc/support/modules/formatting/src/js/abbreviation/components/edit.js ***!
  \*******************************************************************************/
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

/***/ "./inc/support/modules/formatting/src/js/abbreviation/index.js":
/*!*********************************************************************!*\
  !*** ./inc/support/modules/formatting/src/js/abbreviation/index.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   abbreviation: function() { return /* binding */ abbreviation; }
/* harmony export */ });
/* harmony import */ var _components_edit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/edit */ "./inc/support/modules/formatting/src/js/abbreviation/components/edit.js");
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

/***/ "./inc/support/modules/formatting/src/js/decoration/index.js":
/*!*******************************************************************!*\
  !*** ./inc/support/modules/formatting/src/js/decoration/index.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decoration: function() { return /* binding */ decoration; }
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
  element: {
    useState,
    useEffect
  },
  components: {
    Icon,
    SVG,
    Path,
    Modal,
    Button,
    ButtonGroup,
    SelectControl
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

/**
 * Block constants
 */
const name = 'wca/decoration';
const decoration = {
  name,
  title: __('Decoration', 'wecodeart'),
  tagName: 'span',
  className: 'has-decoration',
  attributes: {
    class: 'class'
  },
  edit(_ref) {
    let {
      isActive,
      value,
      onChange
    } = _ref;
    const activeFormat = getActiveFormat(value, name);
    const {
      wecodeart: {
        decorationStyles = []
      } = {}
    } = select('core/editor').getEditorSettings();
    const {
      attributes = {}
    } = activeFormat || {};
    const [isOpen, setIsOpen] = useState(false);
    const [state, setState] = useState({
      ...attributes
    });
    const toggle = () => setIsOpen(!isOpen);
    const selectOptions = [...[{
      label: __('Default', 'wecodeart'),
      value: ''
    }], ...decorationStyles.map(i => ({
      ...i,
      value: `is-style-${i.value}`
    }))];
    useEffect(() => setState({
      ...attributes
    }), [activeFormat]);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichTextToolbarButton, {
      icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Icon, {
        icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SVG, {
          style: {
            padding: 4
          },
          viewBox: "0 0 16 16"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Path, {
          "fill-rule": "evenodd",
          d: "M11.096.644a2 2 0 0 1 2.791.036l1.433 1.433a2 2 0 0 1 .035 2.791l-.413.435-8.07 8.995a.5.5 0 0 1-.372.166h-3a.5.5 0 0 1-.234-.058l-.412.412A.5.5 0 0 1 2.5 15h-2a.5.5 0 0 1-.354-.854l1.412-1.412A.5.5 0 0 1 1.5 12.5v-3a.5.5 0 0 1 .166-.372l8.995-8.07.435-.414Zm-.115 1.47L2.727 9.52l3.753 3.753 7.406-8.254-2.905-2.906Zm3.585 2.17.064-.068a1 1 0 0 0-.017-1.396L13.18 1.387a1 1 0 0 0-1.396-.018l-.068.065 2.85 2.85M5.293 13.5 2.5 10.707v1.586L3.707 13.5z"
        }))
      }),
      title: __('Decoration', 'wecodeart'),
      onClick: toggle,
      isActive: isActive
    }), isOpen && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Modal, {
      title: __('Settings', 'wecodeart'),
      onRequestClose: toggle
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
      label: __('Style', 'wecodeart'),
      value: state?.class,
      options: selectOptions,
      onChange: _class => setState({
        ...state,
        class: _class
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ButtonGroup, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      isPrimary: true,
      isLarge: true,
      onClick: () => {
        onChange(applyFormat(value, {
          type: name,
          attributes: state
        }));
        toggle();
      }
    }, __('Apply', 'wecodeart')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      isDestructive: true,
      isLarge: true,
      onClick: () => {
        onChange(removeFormat(value, name));
        toggle();
      }
    }, __('Remove', 'wecodeart')))));
  }
};

/***/ }),

/***/ "./inc/support/modules/formatting/src/js/justify/components/controls.js":
/*!******************************************************************************!*\
  !*** ./inc/support/modules/formatting/src/js/justify/components/controls.js ***!
  \******************************************************************************/
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

/***/ "./inc/support/modules/formatting/src/js/justify/index.js":
/*!****************************************************************!*\
  !*** ./inc/support/modules/formatting/src/js/justify/index.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   justify: function() { return /* binding */ justify; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/controls */ "./inc/support/modules/formatting/src/js/justify/components/controls.js");

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

/***/ "./inc/support/modules/formatting/src/js/plugin/Control.js":
/*!*****************************************************************!*\
  !*** ./inc/support/modules/formatting/src/js/plugin/Control.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

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
  data: {
    useSelect,
    useDispatch
  },
  components: {
    withSpokenMessages,
    Icon
  },
  editPost: {
    PluginBlockSettingsMenuItem
  },
  blockEditor: {
    store: blockEditorStore
  },
  compose: {
    compose
  },
  richText: {
    create,
    toHTMLString
  }
} = wp;
const allowedBlocks = ['core/heading', 'core/paragraph', 'core/code', 'core/list-item'];

/**
 * Render plugin
 */
const Control = () => {
  const {
    blockId,
    blockName,
    blockContent
  } = useSelect(select => {
    const selectedBlock = select(blockEditorStore).getSelectedBlock();
    if (selectedBlock) {
      return {
        blockId: selectedBlock.clientId,
        blockName: selectedBlock.name,
        blockContent: get(selectedBlock, 'attributes.content')
      };
    }
    return {};
  });
  if (allowedBlocks.includes(blockName)) {
    const record = create({
      html: blockContent
    });
    const {
      updateBlockAttributes
    } = useDispatch(blockEditorStore, [blockId, record]);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PluginBlockSettingsMenuItem, {
      icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Icon, {
        icon: "editor-removeformatting",
        className: "components-menu-items__item-icon"
      }),
      label: __('Clear block formatting', 'wecodeart'),
      onClick: () => updateBlockAttributes(blockId, {
        content: toHTMLString({
          value: {
            ...record,
            formats: Array(record.formats.length)
          }
        })
      })
    });
  }
  return null;
};
/* harmony default export */ __webpack_exports__["default"] = (compose(withSpokenMessages)(Control));

/***/ }),

/***/ "./inc/support/modules/formatting/src/js/plugin/index.js":
/*!***************************************************************!*\
  !*** ./inc/support/modules/formatting/src/js/plugin/index.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Control */ "./inc/support/modules/formatting/src/js/plugin/Control.js");
/**
 * Internal dependencies
 */

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'wca-clear-formatting',
  render: _Control__WEBPACK_IMPORTED_MODULE_0__["default"]
});

/***/ }),

/***/ "./inc/support/modules/formatting/src/js/popper/Controls.js":
/*!******************************************************************!*\
  !*** ./inc/support/modules/formatting/src/js/popper/Controls.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

/**
 * WordPress dependencies
 */
const {
  i18n: {
    __
  },
  components: {
    SelectControl,
    ToggleControl,
    __experimentalNumberControl: NumberControl,
    TextControl,
    TextareaControl,
    TabPanel,
    Panel,
    PanelBody,
    PanelRow
  }
} = wp;
const Controls = _ref => {
  let {
    state,
    setState
  } = _ref;
  const options = JSON.parse(decodeURIComponent(state?.['data-options'] || '{}'));
  const setOptions = value => {
    let newOptions = {
      ...options,
      ...value
    };
    newOptions = Object.fromEntries(Object.entries(newOptions).filter(_ref2 => {
      let [_, v] = _ref2;
      return v !== null && v !== '';
    }));
    setState({
      ...state,
      'data-options': encodeURIComponent(JSON.stringify(newOptions))
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TabPanel, {
    activeClass: "active-tab",
    className: "wecodeart-tabs wecodeart-tabs--popper",
    tabs: [{
      name: 'content',
      title: __('Content', 'wecodeart')
    }, {
      name: 'options',
      title: __('Options', 'wecodeart')
    }]
  }, _ref3 => {
    var _state$dataPlugin, _options$animation, _options$html, _options$sanitize;
    let {
      name
    } = _ref3;
    let render;
    switch (name) {
      case 'content':
        render = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
          label: __('Type', 'wecodeart'),
          value: (_state$dataPlugin = state?.['data-plugin']) !== null && _state$dataPlugin !== void 0 ? _state$dataPlugin : 'tooltip',
          options: [{
            label: 'Tooltip',
            value: 'tooltip'
          }, {
            label: 'Popover',
            value: 'popover'
          }],
          onChange: type => setState({
            'data-plugin': type
          })
        }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextareaControl, {
          label: __('Title', 'wecodeart'),
          value: options?.title,
          onChange: title => setOptions({
            title
          })
        }), state?.['data-plugin'] === 'popover' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextareaControl, {
          label: __('Content', 'wecodeart'),
          value: options?.content,
          onChange: content => setOptions({
            content
          })
        }));
        break;
      case 'options':
        function templatePlaceholder() {
          var _state$dataPlugin2;
          const type = (_state$dataPlugin2 = state?.['data-plugin']) !== null && _state$dataPlugin2 !== void 0 ? _state$dataPlugin2 : 'tooltip';
          return `<div class="${type}" role="tooltip"><div class="${type}-arrow"></div><div class="${type}-inner"></div></div>`;
        }
        render = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
          label: __('Placement', 'wecodeart'),
          value: options?.placement,
          help: __('How to position the tooltip.', 'wecodeart'),
          options: [{
            label: __('Default', 'wecodeart'),
            value: ''
          }, {
            label: __('Auto', 'wecodeart'),
            value: 'auto'
          }, {
            label: __('Top', 'wecodeart'),
            value: 'top'
          }, {
            label: __('Left', 'wecodeart'),
            value: 'left'
          }, {
            label: __('Right', 'wecodeart'),
            value: 'right'
          }, {
            label: __('Bottom', 'wecodeart'),
            value: 'bottom'
          }],
          onChange: placement => setOptions({
            placement
          })
        }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NumberControl, {
          label: __('Delay', 'wecodeart'),
          value: options?.delay,
          placeholder: "0",
          min: 0,
          step: 10,
          help: __('Delay showing and hiding the popover (ms) — doesn`t apply to manual trigger type.', 'wecodeart'),
          onChange: delay => setOptions({
            delay: delay ? parseFloat(delay) : ''
          })
        }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
          label: __('Offset', 'wecodeart'),
          value: options?.offset,
          placeholder: "0, 0",
          help: __('Offset of the tooltip relative to its target — comma separated values like: 10,20.', 'wecodeart'),
          onChange: offset => setOptions({
            offset
          })
        }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Panel, {
          className: "wecodeart-panel wecodeart-panel--advanced"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
          title: __('Advanced settings', 'wecodeart'),
          initialOpen: false
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
          label: __('Trigger', 'wecodeart'),
          value: options?.trigger ? options.trigger.split(' ') : [''],
          multiple: true,
          help: __('How tooltip is triggered: click, hover, focus, manual.', 'wecodeart'),
          options: [{
            label: __('Default', 'wecodeart'),
            value: ''
          }, {
            label: __('Hover', 'wecodeart'),
            value: 'hover'
          }, {
            label: __('Focus', 'wecodeart'),
            value: 'focus'
          }, {
            label: __('Click', 'wecodeart'),
            value: 'click'
          }, {
            label: __('Manual', 'wecodeart'),
            value: 'manual'
          }],
          onChange: trigger => setOptions({
            trigger: trigger.join(' ')
          })
        }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
          label: __('Selector', 'wecodeart'),
          value: options?.selector,
          placeholder: "false",
          help: __('If a selector is provided, tooltip objects will be delegated to the specified targets.', 'wecodeart'),
          onChange: selector => setOptions({
            selector
          })
        }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
          label: __('Container', 'wecodeart'),
          value: options?.container,
          placeholder: "false",
          help: __('Appends the tooltip to a specific element.', 'wecodeart'),
          onChange: container => setOptions({
            container
          })
        }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
          label: __('Custom class', 'wecodeart'),
          value: options?.customClass,
          help: __('Add classes to the tooltip when it is shown.', 'wecodeart'),
          onChange: customClass => setOptions({
            customClass
          })
        }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
          label: __('Animation', 'wecodeart'),
          checked: (_options$animation = options?.animation) !== null && _options$animation !== void 0 ? _options$animation : true,
          help: __('Apply a CSS fade transition to the tooltip.', 'wecodeart'),
          onChange: animation => setOptions({
            animation
          })
        }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
          label: __('HTML', 'wecodeart'),
          checked: (_options$html = options?.html) !== null && _options$html !== void 0 ? _options$html : false,
          help: __('Allow HTML in the tooltip.', 'wecodeart'),
          onChange: html => setOptions({
            html
          })
        }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
          label: __('Sanitize', 'wecodeart'),
          checked: (_options$sanitize = options?.sanitize) !== null && _options$sanitize !== void 0 ? _options$sanitize : true,
          help: __(`Enable or disable the sanitization. If activated 'template', 'content' and 'title' options will be sanitized.`, 'wecodeart'),
          onChange: sanitize => setOptions({
            sanitize
          })
        }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextareaControl, {
          label: __('Template', 'wecodeart'),
          help: __('Base HTML to use when creating the tooltip. ', 'wecodeart'),
          value: options?.template,
          placeholder: templatePlaceholder(),
          onChange: template => setOptions({
            template
          })
        })))));
        break;
    }
    return render;
  });
};
/* harmony default export */ __webpack_exports__["default"] = (Controls);

/***/ }),

/***/ "./inc/support/modules/formatting/src/js/popper/index.js":
/*!***************************************************************!*\
  !*** ./inc/support/modules/formatting/src/js/popper/index.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   popper: function() { return /* binding */ popper; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Controls */ "./inc/support/modules/formatting/src/js/popper/Controls.js");

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
    Icon,
    SVG,
    Path,
    Modal,
    Button,
    ButtonGroup
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


/**
 * Block constants
 */
const name = 'wca/popper';
const popper = {
  name,
  title: __('Popper', 'wecodeart'),
  tagName: 'span',
  className: 'has-popper',
  attributes: {
    'data-plugin': 'data-plugin',
    'data-options': 'data-options',
    'tabindex': 'tabindex'
  },
  edit(_ref) {
    let {
      isActive,
      value,
      onChange
    } = _ref;
    const activeFormat = getActiveFormat(value, name);
    const {
      attributes = {
        'data-plugin': 'tooltip',
        'data-options': JSON.stringify({
          title: ''
        }),
        'tabindex': "0"
      }
    } = activeFormat || {};
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [state, setState] = useState({
      ...attributes
    });
    useEffect(() => setState({
      ...attributes
    }), [activeFormat]);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichTextToolbarButton, {
      icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Icon, {
        icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SVG, {
          style: {
            padding: 4
          },
          viewBox: "0 0 16 16"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Path, {
          d: "M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"
        }))
      }),
      title: __('Popper', 'wecodeart'),
      onClick: toggle,
      isActive: isActive
    }), isOpen && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Modal, {
      className: "wecodeart-modal wecodeart-modal--popper",
      title: __('Settings', 'wecodeart'),
      onRequestClose: toggle
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Controls__WEBPACK_IMPORTED_MODULE_1__["default"], {
      state,
      setState
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ButtonGroup, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      isPrimary: true,
      isLarge: true,
      onClick: () => {
        onChange(applyFormat(value, {
          type: name,
          attributes: state
        }));
        toggle();
      }
    }, __('Apply', 'wecodeart')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      isDestructive: true,
      isLarge: true,
      onClick: () => {
        onChange(removeFormat(value, name));
        toggle();
      }
    }, __('Remove', 'wecodeart')))));
  }
};

/***/ }),

/***/ "./inc/support/modules/formatting/src/js/underline/index.js":
/*!******************************************************************!*\
  !*** ./inc/support/modules/formatting/src/js/underline/index.js ***!
  \******************************************************************/
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

/***/ "./inc/support/modules/formatting/src/scss/index.scss":
/*!************************************************************!*\
  !*** ./inc/support/modules/formatting/src/scss/index.scss ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/*!********************************************************!*\
  !*** ./inc/support/modules/formatting/src/js/index.js ***!
  \********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _popper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./popper */ "./inc/support/modules/formatting/src/js/popper/index.js");
/* harmony import */ var _justify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./justify */ "./inc/support/modules/formatting/src/js/justify/index.js");
/* harmony import */ var _underline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./underline */ "./inc/support/modules/formatting/src/js/underline/index.js");
/* harmony import */ var _decoration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./decoration */ "./inc/support/modules/formatting/src/js/decoration/index.js");
/* harmony import */ var _abbreviation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./abbreviation */ "./inc/support/modules/formatting/src/js/abbreviation/index.js");
/* harmony import */ var _plugin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./plugin */ "./inc/support/modules/formatting/src/js/plugin/index.js");
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../scss/index.scss */ "./inc/support/modules/formatting/src/scss/index.scss");
/**
 * WordPress dependencies
 */
const {
  registerFormatType
} = wp.richText;
const {
  registerPlugin
} = wp.plugins;

/**
 * Internal dependencies
 */







function registerWeCodeArtFormats() {
  [_popper__WEBPACK_IMPORTED_MODULE_0__.popper, _justify__WEBPACK_IMPORTED_MODULE_1__.justify, _underline__WEBPACK_IMPORTED_MODULE_2__.underline, _decoration__WEBPACK_IMPORTED_MODULE_3__.decoration, _abbreviation__WEBPACK_IMPORTED_MODULE_4__.abbreviation].forEach(_ref => {
    let {
      name,
      ...settings
    } = _ref;
    if (name) {
      registerFormatType(name, settings);
    }
  });
}
function registerFormattingPlugin() {
  const {
    name,
    render
  } = _plugin__WEBPACK_IMPORTED_MODULE_5__["default"];
  registerPlugin(name, {
    icon: false,
    render
  });
}
wp.domReady(() => {
  registerWeCodeArtFormats();
  registerFormattingPlugin();
});
}();
/******/ })()
;
//# sourceMappingURL=index.js.map