describe('resolve', function () {
  it('should resolve directly', async function () {
    const p = this.cp.call(noop);
    this.cp.resolve('foo');
    assert.equal(this.cp.isFulfilled, true);
    assert.equal(await p, 'foo');
  });

  it('should resolve inside fn', async function () {
    const p = this.cp.call(() => this.cp.resolve('foo'));
    assert.equal(await p, 'foo');
  });

  it('should keep first value if resolved twice', async function () {
    const p = this.cp.call(noop);
    this.cp.resolve('foo');
    this.cp.resolve('bar');
    assert.equal(await p, 'foo');
  });

  it('should do nothing for resolve without call', function () {
    assert.doesNotThrow(() => this.cp.resolve('foo'));
  });

  it('should attach to passed pending promise', function () {
    this.cp.call();
    this.cp.resolve(new Promise(noop));
    assert.ok(this.cp.isPending);
    assert.notOk(this.cp.isFulfilled);
  });

  it('should resolve if passed promise resolves', async function () {
    this.cp.call();
    this.cp.resolve(Promise.resolve('foo'));
    assert.ok(this.cp.isPending);
    assert.notOk(this.cp.isFulfilled);
    await this.cp.promise;
    assert.notOk(this.cp.isPending);
    assert.ok(this.cp.isFulfilled);
    assert.equal(this.cp.value, 'foo');
  });

  it('should reject if passed promise rejects', async function () {
    this.cp.call();
    this.cp.resolve(Promise.reject('err'));
    assert.ok(this.cp.isPending);
    assert.notOk(this.cp.isRejected);
    await assertRejected(this.cp.promise, 'err');
    assert.notOk(this.cp.isPending);
    assert.ok(this.cp.isRejected);
  });

});
