describe('isPending', function () {
  it('should be false on new instance', function () {
    assert.notOk(this.cp.isPending);
  });

  it('should be true after call', function () {
    this.cp.call();
    assert.ok(this.cp.isPending);
  });

  it('should be false after fulfill', async function () {
    const p = this.cp.call();
    this.cp.resolve('foo');
    assert.notOk(this.cp.isPending);
    await p;
    assert.notOk(this.cp.isPending);
  });

  it('should be false after reject', async function () {
    const p = this.cp.call();
    this.cp.reject('foo');
    assert.notOk(this.cp.isPending);
    await assertRejected(p);
    assert.notOk(this.cp.isPending);
  });
});
