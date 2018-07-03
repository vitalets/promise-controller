describe('isFulfilled', function () {
  it('should be false on new instance', function () {
    assert.notOk(this.cp.isFulfilled);
  });

  it('should be false after call', function () {
    this.cp.call();
    assert.notOk(this.cp.isFulfilled);
  });

  it('should be true after resolve with non promise', async function () {
    const p = this.cp.call();
    this.cp.resolve('foo');
    assert.ok(this.cp.isFulfilled);
    await p;
    assert.ok(this.cp.isFulfilled);
  });
});
