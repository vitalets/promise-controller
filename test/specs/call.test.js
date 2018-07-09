
describe('call', function () {
  it('should return Promise', function () {
    const res = this.cp.call(noop);
    assert.instanceOf(res, Promise);
  });

  it('should store Promise', function () {
    const res = this.cp.call(noop);
    assert.instanceOf(this.cp.promise, Promise);
    assert.equal(res, this.cp.promise);
  });

  it('should call passed fn', function () {
    let a = 0;
    this.cp.call(() => a++);
    assert.equal(a, 1);
  });

  it('should return the same promise if it is pending', function () {
    const p1 = this.cp.call(noop);
    const p2 = this.cp.call(noop);
    assert.equal(p1, p2);
  });

  it('should return new promise for call after resolve', async function () {
    const p1 = this.cp.call(noop);
    this.cp.resolve();
    await p1;
    const p2 = this.cp.call(noop);
    assert.notEqual(p1, p2);
  });

  it('should return new promise for call after reject', async function () {
    const p1 = this.cp.call(noop);
    this.cp.reject();
    safeReject(p1);
    const p2 = this.cp.call(noop);
    assert.notEqual(p1, p2);
  });

  it('should return new promise for call after reset', function () {
    const p1 = this.cp.call(noop);
    safeReject(p1);
    this.cp.reset();
    const p2 = this.cp.call(noop);
    assert.notEqual(p1, p2);
  });

  it('should allow to call without fn', async function () {
    const p = this.cp.call();
    this.cp.resolve('foo');
    assert.equal(await p, 'foo');
  });

  it('should attach to promise returned by fn (resolve)', async function () {
    const p = this.cp.call(() => Promise.resolve('foo'));
    assert.equal(await p, 'foo');
  });

  it('should attach to promise returned by fn (reject)', async function () {
    const p = this.cp.call(() => Promise.reject(new Error('err')));
    await assertRejected(p, 'err');
  });

  it('should provide access to promise inside fn', function () {
    let p2;
    const p1 = this.cp.call(() => p2 = this.cp.promise);
    assert.equal(p1, p2);
  });

  it('should reject by error inside fn', async function () {
    const p = this.cp.call(() => {throw new Error('err');});
    await assertRejected(p, 'err');
  });
});
