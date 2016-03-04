'use strict';

/**
 * Helper to remove an input value and set focus to it.
 */
export const reset = input => {
  input.focus();
  input.value = '';
};
