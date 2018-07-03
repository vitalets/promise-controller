describe('isRejected', function () {
  it('should be false on new instance', function () {
    assert.notOk(this.cp.isRejected);
  });

  it('should be false after call', function () {
    this.cp.call();
    assert.notOk(this.cp.isRejected);
  });

  it('should be true after manual reject', async function () {
    const p = this.cp.call();
    this.cp.reject();
    assert.ok(this.cp.isRejected);
    await assertRejected(p);
    assert.ok(this.cp.isRejected);
  });

  it('should be true after reject by error in fn', async function () {
    const p = this.cp.call(() => {
      throw new Error('err');
    });
    assert.ok(this.cp.isRejected);
    await assertRejected(p, 'err');
    assert.ok(this.cp.isRejected);
  });
});
