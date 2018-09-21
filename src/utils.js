
exports.isPromise = function (p) {
  return p && typeof p.then === 'function';
};

/**
 * Just `class MyError extends Error` does not work with transpiler.
 * See: https://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript
 */
exports.createErrorType = function (name) {
  function E(message) {
    if (!Error.captureStackTrace) {
      this.stack = (new Error()).stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
    this.message = message;
  }
  E.prototype = new Error();
  E.prototype.name = name;
  E.prototype.constructor = E;
  return E;
};
