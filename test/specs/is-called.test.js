describe('isCalled', function () {
  it('should be false on new instance', function () {
    assert.notOk(this.cp.isCalled);
  });

  it('should be true after call', function () {
    this.cp.call();
    assert.ok(this.cp.isCalled);
  });

  it('should be true after fulfill', async function () {
    const p = this.cp.call();
    this.cp.resolve();
    assert.ok(this.cp.isCalled);
    await p;
    assert.ok(this.cp.isCalled);
  });

  it('should be true after reject', async function () {
    const p = this.cp.call();
    this.cp.reject();
    assert.ok(this.cp.isCalled);
    await assertRejected(p);
    assert.ok(this.cp.isCalled);
  });

  it('should be false after reset', function () {
    this.cp.call().catch(noop);
    this.cp.reset();
    assert.notOk(this.cp.isCalled);
  });
});
