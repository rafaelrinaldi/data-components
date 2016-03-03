'use strict';

/**
 * =============================================================================
 * List
 * =============================================================================
 * This module knows how to translate data into a list output (UI).
 */

function List(node, options) {
  // Save a reference for the component element
  this.el = node;

  // List of strings that represent our products
  // Read from `options.values` if available
  this.products = options && options.values ? options.values.split(', ') : [];

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
List.prototype.add = function (product) {
  if (!product || !product.length) {
    return;
  }

  this.products.push(product);
  this.render();
};

/**
 * Cleanup "done" items and then render.
 */
List.prototype.cleanup = function () {
  // Look up for all "done" items
  var done = this.el.querySelectorAll('li.is-done');

  [].slice.call(done).forEach(function (product) {
    // Uses the product text content as a keyword and test it against the
    // products list to see if its a valid index
    var index = this.products.indexOf(product.textContent);

    // If an index is found use it to remove the element from the list
    this.products.splice(index, 1);

    // Actually remove the "done" product element from the DOM
    this.el.removeChild(product);
  }.bind(this));

  this.render();
};

/**
 * Empty the products list and then render.
 */
List.prototype.removeAll = function () {
  this.products.length = 0;
  this.render();
};

/**
 * Render the list to the DOM.
 */
List.prototype.render = function () {
  if (this.products.length) {
    // Loop through all the items on the list and turn them into `<li>`
    this.el.innerHTML = this.products.map(function (product) {
      return '<li>' + product + '</li>';
    }).join('');
  } else {
    // If list is empty render "Cart is empty"
    this.el.innerHTML = '<h3>Cart is empty</h3>';
  }
};
