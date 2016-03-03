/* eslint-disable no-unused-vars */

'use strict';

/**
 * Helper to remove an input value and set focus to it.
 */
const reset = input => {
  input.focus();
  input.value = '';
};

/**
 * =============================================================================
 * Controls
 * =============================================================================
 * This module is responsible for taking care of user actions
 */
class Controls {
  constructor(el, options, sandbox) {
    const buttons = el.querySelectorAll('button');
    const add = buttons[0];
    const clean = buttons[1];
    const remove = buttons[2];
    const input = el.querySelector('input');
    const list = sandbox.get('list');

    /**
     * Listen for the keyboard and submit whatever the current input value is
     * for the "list" component as a new product.
     * Reset the input afterwards.
     */
    input.addEventListener('keyup', event => {
      if (event.keyCode === 13) { // 13 → Enter
        list.add(input.value);
        reset(input);
      }
    });

    /**
     * Same action as if the user hits the enter key, but triggered via a button
     * click.
     * Will also reset the input afterwards.
     */
    add.addEventListener('click', () => {
      list.add(input.value);
      reset(input);
    });

    /**
     * Simply calls the "cleanup" method of "list" public API.
     */
    clean.addEventListener('click', () => {
      list.cleanup();
    });

    /**
     * Simply calls the "removeAll" method of "list" public API.
     */
    remove.addEventListener('click', () => {
      list.removeAll();
    });
  }
}

/* eslint-enable */
