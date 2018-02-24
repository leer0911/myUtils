// Check variable types
export const is = {
  object(input) {
    return input !== null && typeof input === 'object';
  },
  array(input) {
    return (
      input !== null &&
      (typeof input === 'object' && input.constructor === Array)
    );
  },
  number(input) {
    return (
      input !== null &&
      ((typeof input === 'number' && !isNaN(input - 0)) ||
        (typeof input === 'object' && input.constructor === Number))
    );
  },
  string(input) {
    return (
      input !== null &&
      (typeof input === 'string' ||
        (typeof input === 'object' && input.constructor === String))
    );
  },
  boolean(input) {
    return input !== null && typeof input === 'boolean';
  },
  nodeList(input) {
    return input !== null && input instanceof NodeList;
  },
  htmlElement(input) {
    return input !== null && input instanceof HTMLElement;
  },
  function(input) {
    return input !== null && typeof input === 'function';
  },
  undefined(input) {
    return input !== null && typeof input === 'undefined';
  }
};
