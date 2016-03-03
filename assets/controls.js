'use strict';

/**
 * =============================================================================
 * Controls
 * =============================================================================
 * This module is responsible for taking care of user actions
 */

function Controls(node, options, sandbox) {
  var buttons = node.querySelectorAll('button');
  var add = buttons[0];
  var clean = buttons[1];
  var remove = buttons[2];
  var input = node.querySelector('input');
  var list = sandbox.get('list');

  /**
   * Listen for the keyboard and submit whatever the current input value is
   * for the "list" component as a new product.
   * Reset the input afterwards.
   */
  input.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) { // 13 → Enter
      list.add(input.value);
      reset(input);
    }
  }.bind(this));

  /**
   * Same action as if the user hits the enter key, but triggered via a button
   * click.
   * Will also reset the input afterwards.
   */
  add.addEventListener('click', function() {
    list.add(input.value);
    reset(input);
  }.bind(this));

  /**
   * Simply calls the "cleanup" method of "list" public API.
   */
  clean.addEventListener('click', function() {
    list.cleanup();
  });

  /**
   * Simply calls the "removeAll" method of "list" public API.
   */
  remove.addEventListener('click', function() {
    list.removeAll();
  });
}

/**
 * Convenient function to remove an input value and set focus to it.
 */
function reset(input) {
  input.focus();
  input.value = '';
}
