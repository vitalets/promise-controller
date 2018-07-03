describe('timeout', function () {
  it('should resolve before timeout', async function () {
    this.cp.timeout(10);
    const p = this.cp.call();
    setTimeout(() => this.cp.resolve('foo'), 5);
    assert.equal(await p, 'foo');
  });

  it('should reject after timeout', async function () {
    this.cp.timeout(10);
    const p = this.cp.call();
    safeReject(p);
    setTimeout(() => this.cp.resolve('foo'), 20);
    await assertRejected(p, 'Promise rejected by timeout');
  });

  it('should reject after timeout with custom error', async function () {
    this.cp.timeout(1, 'err');
    const p = this.cp.call();
    safeReject(p);
    await wait(5);
    await assertRejected(p, 'err');
  });

  it('should call custom fn after timeout', async function () {
    this.cp.timeout(1, () => this.cp.resolve('foo'));
    const p = this.cp.call();
    await wait(5);
    assert.equal(await p, 'foo');
  });

  it('should not call custom fn if resolved', async function () {
    let a = 0;
    this.cp.timeout(5, () => a++);
    this.cp.call();
    this.cp.resolve();
    await wait(10);
    assert.equal(a, 0);
  });

  it('should not call custom fn if rejected', async function () {
    let a = 0;
    this.cp.timeout(5, () => a++);
    const p = this.cp.call();
    safeReject(p);
    this.cp.reject();
    await wait(10);
    assert.equal(a, 0);
  });

  it('should not call custom fn if rejected in fn', async function () {
    let a = 0;
    this.cp.timeout(5, () => a++);
    const p = this.cp.call(() => {throw new Error('err');});
    safeReject(p);
    await wait(10);
    assert.equal(a, 0);
  });
});
