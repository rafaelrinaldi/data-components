/**@license
 * data-components v{{version}} <https://github.com/rafaelrinaldi/data-components>
 * Released under {{license}} license
 * Author: Rafael Rinaldi <http://rinaldi.io>
 **/
(function(exports) {
  'use strict';

  // Component store
  var store = {};

  // Query selector helper
  function $(selector) {
    var lookup = exports.document.querySelectorAll(selector);
    return [].slice.call(lookup);
  };

  /**
   * Own implementation of `Object.assign` that works in all browsers.
   * Note that it only does shallow copies.
   **/
  function mixin(target, source) {
    var from;
    var to = target;
    var index = 0;
    var total = arguments.length;
    var hasOwnProperty = Object.prototype.hasOwnProperty;

    while(++index < total){
      from = arguments[index];

      if (from != null) {
        for(var key in from) {
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
   * For ES5 projects, use prototypes to simulate classes:
   *
   *    function MyComponent(node, options) {
   *      // Bootstrap component
   *    }
   *
   * In ES2015 you're can use actual classes:
   *
   *    class MyComponent {
   *      constructor(node, options) {
   *        // Bootstrap component
   *      }
   *    }
   * */
  function register(component, implementation) {
    var newStore = {};
    newStore[component] = implementation;
    return mixin(store, newStore);
  }

  function mount(properties, options) {
    // Component properties
    var id = properties.id;
    var sandbox = properties.sandbox;
    var node = properties.node;

    // Component options
    var exports = options && options.exports;

    if (!isRegisteredComponent(id)) {
      console.warn('No implementation found for component "' + id + '"');
      return null;
    }

    // Create new component instance
    var Component = store[id];
    var instance = new Component(node, options);

    return instance;
  }

  function isRegisteredComponent(component) {
    return Object
              .keys(store)
              .some(function(id) {
                return id === component;
              });
  }

  function components() {
    var sandbox = {
      get: function(id) {
        return store[id];
      },

      set: function(id, value) {
        store = register(id, value);
        update(sandbox);
      }
    };

    return update(sandbox);
  }

  // Lookup for components to bootstrap on the current context
  function update(sandbox) {
    var selector = '[data-component]';

    // Loop through all `selector` occurrences and bootup components found
    $(selector).forEach(function(node, index) {
      mount({
        sandbox: sandbox,
        node: node,
        index: index,
        id: node.dataset.component,
        options: node.dataset
      });
    });

    return sandbox;
  }

  // UMD export
  if(typeof define === 'function' && define.amd) {
    define(function() { return components; });
  } else if(typeof module !== 'undefined' && module.exports) {
    module.exports = components;
  } else {
    exports.components = components;
  }
})(this);
