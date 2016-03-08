(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('./helpers');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /* eslint-disable no-unused-vars */

/**
 * =============================================================================
 * Controls
 * =============================================================================
 * This module is responsible for taking care of user actions
 */

var Controls = function Controls(el, options, sandbox) {
  _classCallCheck(this, Controls);

  var buttons = el.querySelectorAll('button');
  var add = buttons[0];
  var clean = buttons[1];
  var remove = buttons[2];
  var input = el.querySelector('input');
  var list = sandbox.get('list');

  /**
   * Listen for the keyboard and submit whatever the current input value is
   * for the "list" component as a new product.
   * Reset the input afterwards.
   */
  input.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      // 13 → Enter
      list.add(input.value);
      (0, _helpers.reset)(input);
    }
  });

  /**
   * Same action as if the user hits the enter key, but triggered via a button
   * click.
   * Will also reset the input afterwards.
   */
  add.addEventListener('click', function () {
    list.add(input.value);
    (0, _helpers.reset)(input);
  });

  /**
   * Simply calls the "cleanup" method of "list" public API.
   */
  clean.addEventListener('click', function () {
    list.cleanup();
  });

  /**
   * Simply calls the "removeAll" method of "list" public API.
   */
  remove.addEventListener('click', function () {
    list.removeAll();
  });
};

/* eslint-enable */


exports.default = Controls;

},{"./helpers":2}],2:[function(require,module,exports){
'use strict';

/**
 * Helper to remove an input value and set focus to it.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
var reset = exports.reset = function reset(input) {
  input.focus();
  input.value = '';
};

},{}],3:[function(require,module,exports){
'use strict';

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _controls = require('./controls');

var _controls2 = _interopRequireDefault(_controls);

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Bootstrap components
(0, _2.default)({
  'list': _list2.default,
  'controls': _controls2.default
}); /**
     * Application entry point
     */

},{"../":5,"./controls":1,"./list":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable no-unused-vars */

/**
 * =============================================================================
 * List
 * =============================================================================
 * This module knows how to translate data into a list output (UI)
 */

var List = function () {
  function List(el, options) {
    _classCallCheck(this, List);

    // Save a reference for the component element
    this.el = el;
    // Save a reference for the component options
    this.options = options;

    // List of strings that represent our products
    // Read from `options.values` if available
    this.products = options.values.split(', ');

    // Will listen for every click on `<li>` elements and then toggle `is-done`
    this.el.addEventListener('click', function (event) {
      if (event.target && event.target.matches('li')) {
        event.target.classList.toggle('is-done');
      }
    });

    this.render();
  }

  /**
   * Add a new product to the products list and then render.
   */


  _createClass(List, [{
    key: 'add',
    value: function add(product) {
      if (!product || !product.length) {
        return;
      }

      this.products.push(product);
      this.render();
    }

    /**
     * Cleanup "done" items and then render.
     */

  }, {
    key: 'cleanup',
    value: function cleanup() {
      var _this = this;

      // Look up for all "done" items
      var done = this.el.querySelectorAll('li.is-done');

      [].slice.call(done).forEach(function (product) {
        // Uses the product text content as a keyword and test it against the
        // products list to see if its a valid index
        var index = _this.products.indexOf(product.textContent);

        // If an index is found use it to remove the element from the list
        _this.products.splice(index, 1);

        // Actually remove the "done" product element from the DOM
        _this.el.removeChild(product);
      });

      this.render();
    }

    /**
     * Empty the products list and then render.
     */

  }, {
    key: 'removeAll',
    value: function removeAll() {
      this.products.length = 0;
      this.render();
    }

    /**
     * Render the list to the DOM.
     */

  }, {
    key: 'render',
    value: function render() {
      if (this.products.length) {
        // Loop through all the items on the list and turn them into `<li>`
        this.el.innerHTML = this.products.map(function (product) {
          return '<li>' + product + '</li>';
        }).join('');
      } else {
        // If list is empty render "Cart is empty"
        this.el.innerHTML = '<h3>' + this.options.empty + '</h3>';
      }
    }
  }]);

  return List;
}();

/* eslint-enable */


exports.default = List;

},{}],5:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/* global define */
/* eslint-disable */
/**@license
 * data-components v{{version}} <https://github.com/rafaelrinaldi/data-components>
 * Released under {{license}} license
 * Author: Rafael Rinaldi <http://rinaldi.io>
 **/
/* eslint-enable */
(function (exports) {
  'use strict';

  // Component store

  var store = {};

  // Query selector helper
  function $(selector) {
    var lookup = exports.document.querySelectorAll(selector);
    return [].slice.call(lookup);
  }

  /**
   * Own implementation of `Object.assign` that works in all browsers.
   * Note that it only does shallow copies.
   */
  function mixin(target /* ...sources */) {
    var from;
    var to = target;
    var index = 0;
    var total = arguments.length;
    var hasOwnProperty = Object.prototype.hasOwnProperty;

    while (++index < total) {
      from = arguments[index];

      if (from !== null) {
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
      }
    }

    return to;
  }

  /**
   * Register a new component to the components store.
   */
  function register(component, implementation) {
    var newItem = {};
    newItem[component] = implementation;
    return mixin(store, newItem);
  }

  function mount(properties, options) {
    // Component properties
    var id = properties.id;
    var node = properties.node;

    // Component options
    var exports = options && options.exports;

    if (!store[id]) {
      console.warn('No implementation found for component "' + id + '"');
      return;
    }

    // Create new component instance
    var Component = store[id];
    var instance = new Component(node, options, properties.sandbox);

    // Handy flag to check if component was actually mounted
    Component.isMounted = true;

    // Save the component instance to sandbox
    properties.sandbox[exports ? exports : id] = instance;
  }

  // Lookup for components to bootstrap on the current context
  function _update(sandbox) {
    var selector = '[data-component]';

    // Loop through all `selector` occurrences and bootup components found
    $(selector)
    // Bypass update if component was already mounted
    .filter(function (node) {
      var Component = store[node.dataset.component];
      return Component && !Component.isMounted;
    }).forEach(function (node, index) {
      /**
      * `dataset` has its own type (`DOMStringMap`) so we convert it to an
      * actual `Object`.
      */
      var options = mixin({}, node.dataset);

      mount({
        sandbox: sandbox,
        node: node,
        index: index,
        id: options.component
      }, options);
    });

    return sandbox;
  }

  function components(presets) {
    // Add pre defined components to the store if there are any
    if (presets && (typeof presets === 'undefined' ? 'undefined' : _typeof(presets)) === 'object') {
      store = mixin(store, presets);
    }

    var sandbox = {
      get: function get(id) {
        return this[id];
      },

      set: function set(id, value) {
        store = register(id, value);
        _update(sandbox);
      },

      update: function update() {
        return _update(this);
      }
    };

    return _update(sandbox);
  }

  // UMD export
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return components;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = components;
  } else {
    exports.components = components;
  }
})(window);

},{}]},{},[1,2,3,4]);
