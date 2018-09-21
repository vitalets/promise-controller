
exports.isPromise = function (p) {
  return p && typeof p.then === 'function';
};
