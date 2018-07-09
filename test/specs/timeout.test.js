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
    await assertRejected(p, 'Promise rejected by timeout');
  });

  it('should reject after timeout (custom error)', async function () {
    const cp = new PromiseController({timeout: 1, timeoutReason: 'err'});
    const p = cp.call();
    safeReject(p);
    await wait(5);
    await assertRejected(p, 'err');
  });

  it('should reject after timeout (custom fn)', async function () {
    const cp = new PromiseController({
      timeout: 10,
      timeoutReason: () => cp.reject('err')
    });
    const p = cp.call();
    await wait(5);
    await assertRejected(p, 'err');
  });

  it('should not call custom fn if resolved', async function () {
    let a = 0;
    const cp = new PromiseController({
      timeout: 5,
      timeoutReason: () => a++
    });
    cp.call();
    cp.resolve();
    await wait(10);
    assert.equal(a, 0);
  });

  it('should not call custom fn if rejected', async function () {
    let a = 0;
    const cp = new PromiseController({
      timeout: 5,
      timeoutReason: () => a++
    });
    const p = cp.call();
    safeReject(p);
    cp.reject();
    await wait(10);
    assert.equal(a, 0);
  });

  it('should not call custom fn if rejected in fn', async function () {
    let a = 0;
    const cp = new PromiseController({
      timeout: 5,
      timeoutReason: () => a++
    });
    const p = cp.call(() => {throw new Error('err');});
    safeReject(p);
    await wait(10);
    assert.equal(a, 0);
  });

  it('should reject after configured timeout and error', async function () {
    const cp = new PromiseController({timeout: 50});
    cp.configure({timeout: 10, timeoutReason: 'err'});
    const p = cp.call();
    safeReject(p);
    setTimeout(() => cp.resolve('foo'), 20);
    await assertRejected(p, 'err');
  });
});
