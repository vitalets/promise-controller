const chai = require('chai');
const PromiseController = require(process.env.LIB_PATH || '../src');

global.assert = chai.assert;
global.noop = () => {};
global.wait = ms => new Promise(r => setTimeout(r, ms));
global.safeReject = promise => promise.catch(() => {});
global.assertRejected = assertRejected;
global.PromiseController = PromiseController;

beforeEach(function () {
  this.cp = new PromiseController();
});

async function assertRejected(promise, err) {
  let f = () => { };
  let catched = false;
  try {
    await promise;
  } catch (e) {
    catched = true;
    f = () => { throw e; };
  } finally {
    const checkRejectedValue = err !== undefined || !catched;
    if (checkRejectedValue) {
      assert.throws(f, err);
    }
  }
}
