/**
 * @typedef {Object} Options
 *
 * @property {Number} [timeout=0] - Timeout in ms after that promise will be rejected automatically.
 * @property {String|Error|Function} [timeoutReason] - Rejection reason for timeout.
 * If it is string or Error - promise will be rejected with that error.
 * If it is function - this function will be called after timeout where you can manually resolve or reject
 * promise via `.resolve() / .reject()` methods of controller.
 * @property {String} [resetReason] - Rejection reason used when `.reset` is called while promise is pending.
 */

module.exports = {
  timeout: 0,
  timeoutReason: 'Promise rejected by timeout',
  resetReason: 'Promise rejected by reset',
};
