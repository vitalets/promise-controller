describe('reject', function () {
  it('should reject in case of error in fn', async function () {
    const res = this.cp.call(() => {
      throw new Error('err');
    });
    await assertRejected(res, 'err');
  });

  it('should reject directly', async function () {
    const res = this.cp.call(noop);
    this.cp.reject(new Error('err'));
    await assertRejected(res, 'err');
  });

  it('should reject inside fn', async function () {
    const res = this.cp.call(() => this.cp.reject(new Error('err')));
    await assertRejected(res, 'err');
  });

  it('should keep first value if rejected twice', async function () {
    const res = this.cp.call(noop);
    this.cp.reject(new Error('foo'));
    this.cp.reject(new Error('bar'));
    await assertRejected(res, 'foo');
  });

  it('should do nothing for reject without call', function () {
    assert.doesNotThrow(() => this.cp.reject('foo'));
  });
});
