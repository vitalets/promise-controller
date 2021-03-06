describe('timeout', function () {
  it('should resolve before timeout', async function () {
    const cp = new PromiseController({timeout: 10});
    const p = cp.call();
    setTimeout(() => cp.resolve('foo'), 5);
    assert.equal(await p, 'foo');
  });

  it('should reject after timeout (default error)', async function () {
    const cp = new PromiseController({timeout: 10});
    const p = cp.call();
    safeReject(p);
    setTimeout(() => cp.resolve('foo'), 20);
    await assertRejected(p, PromiseController.TimeoutError, 'Promise rejected by PromiseController timeout 10 ms.');
  });

  it('should reject after overwritten timeout', async function () {
    const cp = new PromiseController({timeout: 50});
    cp.configure({timeout: 10});
    const p = cp.call();
    safeReject(p);
    setTimeout(() => cp.resolve('foo'), 20);
    await assertRejected(p, 'Promise rejected by PromiseController timeout 10 ms.');
  });

  it('should reject after timeout (custom error)', async function () {
    const cp = new PromiseController({timeout: 1, timeoutReason: 'err'});
    const p = cp.call();
    safeReject(p);
    await wait(5);
    await assertRejected(p, PromiseController.TimeoutError, 'err');
  });

  it('should reject with custom reason and placeholder', async function () {
    const cp = new PromiseController({timeout: 10});
    cp.configure({timeoutReason: 'Timeout {timeout}'});
    const p = cp.call();
    safeReject(p);
    setTimeout(() => cp.resolve('foo'), 20);
    await assertRejected(p, 'Timeout 10');
  });

  it('should reject with custom reason as function', async function () {
    const cp = new PromiseController({timeout: 10});
    cp.configure({timeoutReason: () => 'Timeout {timeout}'});
    const p = cp.call();
    safeReject(p);
    setTimeout(() => cp.resolve('foo'), 20);
    await assertRejected(p, 'Timeout 10');
  });
});
