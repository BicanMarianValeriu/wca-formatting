/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/library/align-justify.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/align-justify.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (alignJustify);
//# sourceMappingURL=align-justify.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/code.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/code.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);
//# sourceMappingURL=code.js.map

/***/ }),

/***/ "./inc/support/modules/formatting/src/js/abbreviation/components/edit.js":
/*!*******************************************************************************!*\
  !*** ./inc/support/modules/formatting/src/js/abbreviation/components/edit.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
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
const Edit = ({
  isActive,
  value,
  onChange
}) => {
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
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichTextToolbarButton, {
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Icon, {
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_1__["default"]
    }),
    title: __('Abbreviation'),
    onClick: toggle,
    isActive: isActive
  }), isOpen && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Modal, {
    title: __('Abbreviation'),
    onRequestClose: toggle
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: __('Title'),
    value: title,
    onChange: title => setState({
      ...state,
      title
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    isPrimary: true,
    isLarge: true,
    onClick: onClick
  }, title ? __('Apply') : __('Remove'))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Edit);

/***/ }),

/***/ "./inc/support/modules/formatting/src/js/abbreviation/index.js":
/*!*********************************************************************!*\
  !*** ./inc/support/modules/formatting/src/js/abbreviation/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   abbreviation: () => (/* binding */ abbreviation)
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

/***/ "./inc/support/modules/formatting/src/js/counter/index.js":
/*!****************************************************************!*\
  !*** ./inc/support/modules/formatting/src/js/counter/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   counter: () => (/* binding */ counter)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

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
    Dashicon,
    Modal,
    Button,
    ButtonGroup,
    TabPanel,
    ToggleControl,
    __experimentalNumberControl: NumberControl
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
const name = 'wca/counter';
const counter = {
  name,
  title: __('Counter', 'wecodeart'),
  tagName: 'span',
  className: 'has-counter',
  attributes: {
    'data-wp-context': 'data-wp-context'
  },
  edit({
    isActive,
    value,
    onChange
  }) {
    const {
      text,
      start,
      end
    } = value;
    const selection = text.substring(start, end);
    const activeFormat = getActiveFormat(value, name);
    const {
      attributes = {
        'data-wp-context': JSON.stringify({
          to: ''
        })
      }
    } = activeFormat || {};

    // Modal state
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
      setIsOpen(!isOpen);
      if (!selection || options.to.length) {
        return;
      }
      const formatted = parseFloat(selection.replace(',', ''));
      setOptions({
        to: isNaN(formatted) ? 0 : formatted
      });
    };

    // Options state
    const [state, setState] = useState({
      ...attributes
    });
    const options = JSON.parse(decodeURIComponent(state['data-wp-context'] || '{}'));
    const setOptions = value => {
      let newOptions = {
        ...options,
        ...value
      };
      newOptions = Object.fromEntries(Object.entries(newOptions).filter(([_, v]) => v !== null && v !== ''));
      setState({
        ...state,
        'data-wp-context': encodeURIComponent(JSON.stringify(newOptions))
      });
    };
    useEffect(() => setState({
      ...attributes
    }), [activeFormat]);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichTextToolbarButton, {
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dashicon, {
        icon: "upload"
      }),
      title: __('Counter', 'wecodeart'),
      onClick: toggle,
      isActive: isActive
    }), isOpen && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Modal, {
      className: "wecodeart-modal wecodeart-modal--floating",
      title: __('Settings'),
      onRequestClose: toggle
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TabPanel, {
      activeClass: "active-tab",
      className: "wecodeart-tabs wecodeart-tabs--modal",
      tabs: [{
        name: 'content',
        title: __('Content')
      }, {
        name: 'options',
        title: __('Options')
      }]
    }, ({
      name
    }) => {
      var _options$comma;
      let render;
      switch (name) {
        case 'content':
          render = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
            style: {
              marginTop: 0
            }
          }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(NumberControl, {
            label: __('Count to', 'wecodeart'),
            value: options.to,
            disabled: true
          })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(NumberControl, {
            label: __('Count from', 'wecodeart'),
            value: options.from,
            placeholder: 0,
            min: 0,
            help: __('Counter starts from a specific value.', 'wecodeart'),
            onChange: from => setOptions({
              from: from ? parseInt(from) : ''
            })
          })));
          break;
        case 'options':
          render = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
            style: {
              marginTop: 0
            }
          }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(NumberControl, {
            label: __('Speed'),
            value: options.speed,
            placeholder: __('Default'),
            min: 1000,
            step: 10,
            help: __('Duration of the counter animation - in ms.', 'wecodeart'),
            onChange: speed => setOptions({
              speed: speed ? parseInt(speed) : null
            })
          })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(NumberControl, {
            label: __('Refresh'),
            value: options.refresh,
            placeholder: __('Default'),
            min: 10,
            step: 10,
            help: __('Refresh interval of the counter animation - in ms.', 'wecodeart'),
            onChange: refresh => setOptions({
              refresh: refresh ? parseInt(refresh) : null
            })
          })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(NumberControl, {
            label: __('Decimals'),
            value: options.decimals,
            placeholder: 0,
            min: 0,
            step: 1,
            max: 10,
            help: __('Allow decimals.', 'wecodeart'),
            onChange: decimals => setOptions({
              decimals: decimals ? parseInt(decimals) : null
            })
          })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
            label: __('Comma'),
            checked: (_options$comma = options.comma) !== null && _options$comma !== void 0 ? _options$comma : false,
            help: __('Allow comma number formatting.', 'wecodeart'),
            onChange: comma => setOptions({
              comma: comma === true ? true : null
            })
          })));
          break;
      }
      return render;
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ButtonGroup, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      isPrimary: true,
      isLarge: true,
      onClick: () => {
        onChange(applyFormat(value, {
          type: name,
          attributes: state
        }));
        toggle();
      }
    }, __('Apply')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      isDestructive: true,
      isLarge: true,
      onClick: () => {
        onChange(removeFormat(value, name));
        toggle();
      }
    }, __('Remove'))))));
  }
};

/***/ }),

/***/ "./inc/support/modules/formatting/src/js/decoration/index.js":
/*!*******************************************************************!*\
  !*** ./inc/support/modules/formatting/src/js/decoration/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decoration: () => (/* binding */ decoration)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

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
  edit({
    isActive,
    value,
    onChange
  }) {
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
      label: __('Default'),
      value: ''
    }], ...decorationStyles.map(i => ({
      ...i,
      value: `is-style-${i.value}`
    }))];
    useEffect(() => setState({
      ...attributes
    }), [activeFormat]);
    const PreviewDecoration = () => {
      let classes = ['has-decoration'];
      classes = [...classes, state?.class];
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
        style: {
          fontSize: '1.15rem',
          fontWeight: '400'
        }
      }, "Lorem ipsum ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        class: classes.join(' ')
      }, "dolor"), " sit ament.");
    };
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichTextToolbarButton, {
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Icon, {
        icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SVG, {
          style: {
            padding: 4
          },
          viewBox: "0 0 16 16"
        }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Path, {
          "fill-rule": "evenodd",
          d: "M11.096.644a2 2 0 0 1 2.791.036l1.433 1.433a2 2 0 0 1 .035 2.791l-.413.435-8.07 8.995a.5.5 0 0 1-.372.166h-3a.5.5 0 0 1-.234-.058l-.412.412A.5.5 0 0 1 2.5 15h-2a.5.5 0 0 1-.354-.854l1.412-1.412A.5.5 0 0 1 1.5 12.5v-3a.5.5 0 0 1 .166-.372l8.995-8.07.435-.414Zm-.115 1.47L2.727 9.52l3.753 3.753 7.406-8.254-2.905-2.906Zm3.585 2.17.064-.068a1 1 0 0 0-.017-1.396L13.18 1.387a1 1 0 0 0-1.396-.018l-.068.065 2.85 2.85M5.293 13.5 2.5 10.707v1.586L3.707 13.5z"
        }))
      }),
      title: __('Decoration', 'wecodeart'),
      onClick: toggle,
      isActive: isActive
    }), isOpen && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Modal, {
      title: __('Settings'),
      onRequestClose: toggle
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
      label: __('Style'),
      value: state?.class,
      options: selectOptions,
      onChange: _class => setState({
        ...state,
        class: _class
      })
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(PreviewDecoration, null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ButtonGroup, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      isPrimary: true,
      isLarge: true,
      onClick: () => {
        onChange(applyFormat(value, {
          type: name,
          attributes: state
        }));
        toggle();
      }
    }, __('Apply')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      isDestructive: true,
      isLarge: true,
      onClick: () => {
        onChange(removeFormat(value, name));
        toggle();
      }
    }, __('Remove')))));
  }
};

/***/ }),

/***/ "./inc/support/modules/formatting/src/js/floating/Controls.js":
/*!********************************************************************!*\
  !*** ./inc/support/modules/formatting/src/js/floating/Controls.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

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
    TextControl,
    TextareaControl,
    TabPanel,
    Panel,
    PanelBody,
    PanelRow
  }
} = wp;
const TEMPLATE_HTML = ['<div class="wp-floating" role="tooltip">', '<div class="wp-floating__arrow"></div>', '<h3 class="wp-floating__header"></h3>', '<div class="wp-floating__inner"></div>', '</div>'].join('');
const Controls = ({
  state,
  setState
}) => {
  const options = JSON.parse(decodeURIComponent(state['data-wp-context'] || '{}'));
  const setOptions = value => {
    let newOptions = {
      ...options,
      ...value
    };
    newOptions = Object.fromEntries(Object.entries(newOptions).filter(([_, v]) => v !== null && v !== ''));
    setState({
      ...state,
      'data-wp-context': encodeURIComponent(JSON.stringify(newOptions))
    });
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TabPanel, {
    activeClass: "active-tab",
    className: "wecodeart-tabs wecodeart-tabs--modal",
    tabs: [{
      name: 'content',
      title: __('Content')
    }, {
      name: 'options',
      title: __('Options')
    }]
  }, ({
    name
  }) => {
    var _options$plugin, _options$animation, _options$html, _options$sanitize;
    let render;
    switch (name) {
      case 'content':
        render = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
          label: __('Type'),
          value: (_options$plugin = options?.plugin) !== null && _options$plugin !== void 0 ? _options$plugin : 'tooltip',
          options: [{
            label: __('Tooltip'),
            value: 'tooltip'
          }, {
            label: __('Popover'),
            value: 'popover'
          }],
          onChange: plugin => {
            setOptions({
              plugin,
              content: plugin === 'tooltip' ? '' : options?.content
            });
          }
        }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextareaControl, {
          label: __('Title'),
          value: options?.title,
          onChange: title => setOptions({
            title: title !== null && title !== void 0 ? title : ''
          })
        }), options?.plugin === 'popover' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextareaControl, {
          label: __('Content'),
          value: options?.content,
          onChange: content => setOptions({
            content
          })
        }));
        break;
      case 'options':
        render = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
          label: __('Trigger', 'wecodeart'),
          value: options?.trigger ? options.trigger.split(' ') : [''],
          multiple: true,
          help: __('How tooltip is triggered: click, hover, focus, manual.', 'wecodeart'),
          options: [{
            label: __('Default'),
            value: ''
          }, {
            label: __('Hover'),
            value: 'hover'
          }, {
            label: __('Focus'),
            value: 'focus'
          }, {
            label: __('Click'),
            value: 'click'
          }, {
            label: __('Manual'),
            value: 'manual'
          }],
          onChange: trigger => setOptions({
            trigger: trigger.join(' ')
          })
        }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
          label: __('Position'),
          value: options?.placement,
          help: __('How to position the tooltip.', 'wecodeart'),
          options: [{
            label: __('Default'),
            value: ''
          }, {
            label: __('Auto'),
            value: 'auto'
          }, {
            label: __('Top'),
            value: 'top'
          }, {
            label: __('Left'),
            value: 'left'
          }, {
            label: __('Right'),
            value: 'right'
          }, {
            label: __('Bottom'),
            value: 'bottom'
          }],
          onChange: placement => setOptions({
            placement
          })
        }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Panel, {
          className: "wecodeart-panel wecodeart-panel--advanced"
        }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
          title: __('Advanced settings', 'wecodeart'),
          initialOpen: false
        }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
          label: __('Delay'),
          value: options?.delay,
          placeholder: "0, 0",
          help: __('Delay showing and hiding the popover (ms) — doesn`t apply to manual trigger type.', 'wecodeart'),
          onChange: delay => setOptions({
            delay: delay ? delay : ''
          })
        }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
          label: __('Offset'),
          value: options?.offset,
          placeholder: "0, 0",
          help: __('Offset of the tooltip relative to its target — comma separated values like: 10, 20, 10 for different axis.', 'wecodeart'),
          onChange: offset => setOptions({
            offset: offset ? offset : ''
          })
        }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
          label: __('Container'),
          value: options?.container,
          placeholder: "false",
          help: __('Appends the tooltip to a specific element.', 'wecodeart'),
          onChange: container => setOptions({
            container
          })
        }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
          label: __('Custom class'),
          value: options?.className,
          help: __('Add classes to the tooltip when it is shown.', 'wecodeart'),
          onChange: className => setOptions({
            className
          })
        }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
          label: __('Animation'),
          checked: (_options$animation = options?.animation) !== null && _options$animation !== void 0 ? _options$animation : true,
          help: __('Apply a CSS fade transition to the tooltip.', 'wecodeart'),
          onChange: animation => setOptions({
            animation
          })
        }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
          label: __('HTML'),
          checked: (_options$html = options?.html) !== null && _options$html !== void 0 ? _options$html : false,
          help: __('Allow HTML in the tooltip.', 'wecodeart'),
          onChange: html => setOptions({
            html
          })
        }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
          label: __('Sanitize'),
          checked: (_options$sanitize = options?.sanitize) !== null && _options$sanitize !== void 0 ? _options$sanitize : true,
          help: __(`Enable or disable the sanitization. If activated 'template', 'content' and 'title' options will be sanitized.`, 'wecodeart'),
          onChange: sanitize => setOptions({
            sanitize
          })
        }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextareaControl, {
          label: __('Template'),
          help: __('Base HTML to use when creating the tooltip. ', 'wecodeart'),
          value: options?.template,
          placeholder: TEMPLATE_HTML,
          onChange: template => setOptions({
            template
          })
        })))));
        break;
    }
    return render;
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Controls);

/***/ }),

/***/ "./inc/support/modules/formatting/src/js/floating/index.js":
/*!*****************************************************************!*\
  !*** ./inc/support/modules/formatting/src/js/floating/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   floating: () => (/* binding */ floating)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Controls */ "./inc/support/modules/formatting/src/js/floating/Controls.js");

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
const name = 'wca/floating';
const floating = {
  name,
  title: __('Floating UI', 'wecodeart'),
  tagName: 'span',
  className: 'has-floating',
  attributes: {
    'data-wp-context': 'data-wp-context'
  },
  edit({
    isActive,
    value,
    onChange
  }) {
    const activeFormat = getActiveFormat(value, name);
    const {
      attributes: oldAttributes = {
        'data-options': ''
      }
    } = activeFormat || {};
    const {
      attributes = {
        'data-wp-context': ''
      }
    } = activeFormat || {};
    const mergedAttributes = {
      ...attributes,
      'data-wp-context': attributes['data-wp-context'] ? attributes['data-wp-context'] : oldAttributes['data-options']
    };
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [state, setState] = useState({
      ...mergedAttributes
    });
    useEffect(() => setState({
      ...mergedAttributes
    }), [activeFormat]);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichTextToolbarButton, {
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Icon, {
        icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SVG, {
          style: {
            padding: 4
          },
          viewBox: "0 0 16 16"
        }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Path, {
          d: "M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"
        }))
      }),
      title: __('Floating UI', 'wecodeart'),
      onClick: toggle,
      isActive: isActive
    }), isOpen && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Modal, {
      className: "wecodeart-modal wecodeart-modal--floating",
      title: __('Settings'),
      onRequestClose: toggle
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Controls__WEBPACK_IMPORTED_MODULE_1__["default"], {
      state,
      setState
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ButtonGroup, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      isPrimary: true,
      isLarge: true,
      onClick: () => {
        onChange(applyFormat(value, {
          type: name,
          attributes: state
        }));
        toggle();
      }
    }, __('Apply')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      isDestructive: true,
      isLarge: true,
      onClick: () => {
        onChange(removeFormat(value, name));
        toggle();
      }
    }, __('Remove')))));
  }
};

/***/ }),

/***/ "./inc/support/modules/formatting/src/js/justify/components/controls.js":
/*!******************************************************************************!*\
  !*** ./inc/support/modules/formatting/src/js/justify/components/controls.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
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
  const checkFormats = formatTypes.filter(({
    name
  }) => name === 'wpcom/justify');
  if (allowedBlocks.includes(blockName) && checkFormats.length === 0) {
    const {
      updateBlockAttributes
    } = useDispatch(blockEditorStore, [blockId]);
    const onToggle = () => updateBlockAttributes(blockId, {
      align: isBlockJustified ? null : 'justify'
    });
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichTextToolbarButton, {
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Icon, {
        icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_1__["default"]
      }),
      title: __('Justify'),
      onClick: onToggle,
      isActive: isBlockJustified
    });
  }
  return null;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (compose(withSpokenMessages)(Control));

/***/ }),

/***/ "./inc/support/modules/formatting/src/js/justify/index.js":
/*!****************************************************************!*\
  !*** ./inc/support/modules/formatting/src/js/justify/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   justify: () => (/* binding */ justify)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
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
  edit({
    isActive,
    value,
    onChange,
    activeAttributes
  }) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_controls__WEBPACK_IMPORTED_MODULE_1__["default"], {
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

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
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(PluginBlockSettingsMenuItem, {
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Icon, {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (compose(withSpokenMessages)(Control));

/***/ }),

/***/ "./inc/support/modules/formatting/src/js/plugin/index.js":
/*!***************************************************************!*\
  !*** ./inc/support/modules/formatting/src/js/plugin/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Control */ "./inc/support/modules/formatting/src/js/plugin/Control.js");
/**
 * Internal dependencies
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'wca-clear-formatting',
  render: _Control__WEBPACK_IMPORTED_MODULE_0__["default"]
});

/***/ }),

/***/ "./inc/support/modules/formatting/src/js/rotator/index.js":
/*!****************************************************************!*\
  !*** ./inc/support/modules/formatting/src/js/rotator/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   rotator: () => (/* binding */ rotator)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

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
    Dashicon,
    Modal,
    TabPanel,
    Button,
    ButtonGroup,
    TextControl,
    BaseControl,
    SelectControl,
    ToggleControl,
    __experimentalHStack: HStack,
    __experimentalNumberControl: NumberControl
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
const name = 'wca/rotator';
const rotator = {
  name,
  title: __('String rotator', 'wecodeart'),
  tagName: 'span',
  className: 'has-rotator',
  attributes: {
    'data-wp-context': 'data-wp-context'
  },
  edit({
    isActive,
    value,
    onChange
  }) {
    const {
      text,
      start,
      end
    } = value;
    const selection = text.substring(start, end);
    const activeFormat = getActiveFormat(value, name);
    const {
      wecodeart: {
        rotatorStyles = []
      } = {}
    } = select('core/editor').getEditorSettings();
    const {
      attributes = {
        'data-wp-context': JSON.stringify({
          strings: [],
          effect: 'slide'
        })
      }
    } = activeFormat || {};

    // Modal state
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
      setIsOpen(!isOpen);
      if (!selection || options.strings.length >= 1) {
        return;
      }
      setOptions({
        strings: [selection]
      });
    };

    // Options state
    const [state, setState] = useState({
      ...attributes
    });
    const options = JSON.parse(decodeURIComponent(state['data-wp-context'] || '{}'));
    const setOptions = value => {
      let newOptions = {
        ...options,
        ...value
      };
      newOptions = Object.fromEntries(Object.entries(newOptions).filter(([_, v]) => v !== null && v !== ''));
      setState({
        ...state,
        'data-wp-context': encodeURIComponent(JSON.stringify(newOptions))
      });
    };
    const addWord = () => {
      const updatedItems = [...options.strings, ''];
      setOptions({
        strings: updatedItems
      });
    };
    const removeWord = index => {
      const updatedItems = [...options.strings];
      updatedItems.splice(index, 1);
      setOptions({
        strings: updatedItems
      });
    };
    const updateWord = (index, value) => {
      const updatedItems = [...options.strings];
      updatedItems[index] = value;
      setOptions({
        strings: updatedItems
      });
    };
    const hasLetterSupport = rotatorStyles.filter(({
      letters,
      value
    }) => letters && value === options.effect).length;
    useEffect(() => setState({
      ...attributes
    }), [activeFormat]);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichTextToolbarButton, {
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dashicon, {
        icon: "editor-ol"
      }),
      title: __('String rotator', 'wecodeart'),
      onClick: toggle,
      isActive: isActive
    }), isOpen && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Modal, {
      className: "wecodeart-modal wecodeart-modal--floating",
      title: __('Settings'),
      onRequestClose: toggle
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TabPanel, {
      activeClass: "active-tab",
      className: "wecodeart-tabs wecodeart-tabs--modal",
      tabs: [{
        name: 'content',
        title: __('Content')
      }, {
        name: 'options',
        title: __('Options')
      }]
    }, ({
      name
    }) => {
      var _options$letters;
      let render;
      switch (name) {
        case 'content':
          render = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BaseControl, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
            style: {
              marginTop: 0
            }
          }, __('Text strings', 'wecodeart')), options.strings.map((item, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(HStack, {
            key: index,
            style: {
              alignItems: 'stretch'
            }
          }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
            style: {
              minWidth: 250
            },
            disabled: index === 0,
            placeholder: "Lorem ipsum dolor",
            value: item,
            onChange: value => updateWord(index, value)
          }), index !== 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
            style: {
              height: 32
            },
            isDestructive: true,
            isSmall: true,
            onClick: () => removeWord(index)
          }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dashicon, {
            icon: "no"
          })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
            isPrimary: true,
            onClick: addWord
          }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dashicon, {
            icon: "plus-alt"
          }))));
          break;
        case 'options':
          render = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
            style: {
              marginTop: 0
            }
          }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
            label: __('Style'),
            value: options.effect,
            options: rotatorStyles,
            onChange: effect => setOptions({
              effect
            })
          })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(NumberControl, {
            label: __('Delay'),
            value: options.changeDelay,
            placeholder: __('Default'),
            min: 100,
            step: 100,
            help: __('Delay for changing the next string.', 'wecodeart'),
            onChange: changeDelay => setOptions({
              changeDelay: changeDelay ? parseInt(changeDelay) : ''
            })
          })), hasLetterSupport ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
            label: __('Letters'),
            checked: (_options$letters = options.letters) !== null && _options$letters !== void 0 ? _options$letters : false,
            help: __('Animate letters - if style supports it.', 'wecodeart'),
            onChange: letters => setOptions({
              letters: letters ? true : null,
              letterDelay: letters !== true ? null : options.letterDelay
            })
          }), options.letters && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(NumberControl, {
            label: __('Letter Delay'),
            value: options.letterDelay,
            placeholder: __('Default'),
            min: 10,
            step: 10,
            help: __('Delay for changing the next letter - if style supports it.', 'wecodeart'),
            onChange: letterDelay => setOptions({
              letterDelay: letterDelay ? parseInt(letterDelay) : ''
            })
          })) : null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
            label: __('Custom class'),
            value: options?.className,
            onChange: className => setOptions({
              className
            })
          })));
          break;
      }
      return render;
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ButtonGroup, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      isPrimary: true,
      isLarge: true,
      onClick: () => {
        onChange(applyFormat(value, {
          type: name,
          attributes: state
        }));
        toggle();
      }
    }, __('Apply')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      isDestructive: true,
      isLarge: true,
      onClick: () => {
        onChange(removeFormat(value, name));
        toggle();
      }
    }, __('Remove'))))));
  }
};

/***/ }),

/***/ "./inc/support/modules/formatting/src/js/underline/index.js":
/*!******************************************************************!*\
  !*** ./inc/support/modules/formatting/src/js/underline/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   underline: () => (/* binding */ underline)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

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
  title: __('Underline'),
  tagName: 'span',
  className: 'has-underline',
  attributes: {
    class: 'class'
  },
  edit({
    isActive,
    value,
    onChange
  }) {
    const formatTypes = select('core/rich-text').getFormatTypes();
    const checkFormats = formatTypes.filter(formats => formats.name === 'wpcom/underline');
    const onToggle = () => onChange(toggleFormat(value, {
      type: name
    }));
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichTextShortcut, {
      type: "primary",
      character: "u",
      onUse: onToggle
    }), checkFormats.length === 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichTextToolbarButton, {
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Icon, {
        icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SVG, {
          style: {
            padding: 2
          },
          viewBox: "0 0 16 16"
        }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Path, {
          d: "M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57-1.709 0-2.687-1.08-2.687-2.57V3.136zM12.5 15h-9v-1h9v1z"
        }))
      }),
      title: __('Underline'),
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ ((module) => {

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
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************************************************!*\
  !*** ./inc/support/modules/formatting/src/js/index.js ***!
  \********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _counter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./counter */ "./inc/support/modules/formatting/src/js/counter/index.js");
/* harmony import */ var _floating__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./floating */ "./inc/support/modules/formatting/src/js/floating/index.js");
/* harmony import */ var _justify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./justify */ "./inc/support/modules/formatting/src/js/justify/index.js");
/* harmony import */ var _underline__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./underline */ "./inc/support/modules/formatting/src/js/underline/index.js");
/* harmony import */ var _decoration__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./decoration */ "./inc/support/modules/formatting/src/js/decoration/index.js");
/* harmony import */ var _abbreviation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./abbreviation */ "./inc/support/modules/formatting/src/js/abbreviation/index.js");
/* harmony import */ var _rotator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./rotator */ "./inc/support/modules/formatting/src/js/rotator/index.js");
/* harmony import */ var _plugin__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./plugin */ "./inc/support/modules/formatting/src/js/plugin/index.js");
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../scss/index.scss */ "./inc/support/modules/formatting/src/scss/index.scss");
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
  [_counter__WEBPACK_IMPORTED_MODULE_0__.counter, _floating__WEBPACK_IMPORTED_MODULE_1__.floating, _justify__WEBPACK_IMPORTED_MODULE_2__.justify, _rotator__WEBPACK_IMPORTED_MODULE_6__.rotator, _underline__WEBPACK_IMPORTED_MODULE_3__.underline, _decoration__WEBPACK_IMPORTED_MODULE_4__.decoration, _abbreviation__WEBPACK_IMPORTED_MODULE_5__.abbreviation].forEach(({
    name,
    ...settings
  }) => {
    if (name) {
      registerFormatType(name, settings);
    }
  });
}
function registerFormattingPlugin() {
  const {
    name,
    render
  } = _plugin__WEBPACK_IMPORTED_MODULE_7__["default"];
  registerPlugin(name, {
    icon: false,
    render
  });
}
wp.domReady(() => {
  registerWeCodeArtFormats();
  registerFormattingPlugin();
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map