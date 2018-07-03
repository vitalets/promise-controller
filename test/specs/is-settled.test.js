describe('isSettled', function () {
  it('should be false on new instance', function () {
    assert.notOk(this.cp.isSettled);
  });

  it('should be false after call', function () {
    this.cp.call();
    assert.notOk(this.cp.isSettled);
  });

  it('should be true after fulfill', async function () {
    const p = this.cp.call();
    this.cp.resolve();
    assert.ok(this.cp.isSettled);
    await p;
    assert.ok(this.cp.isSettled);
  });

  it('should be true after reject', async function () {
    const p = this.cp.call();
    this.cp.reject();
    assert.ok(this.cp.isSettled);
    await assertRejected(p);
    assert.ok(this.cp.isSettled);
  });
});
