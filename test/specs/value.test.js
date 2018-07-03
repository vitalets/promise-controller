describe('value', function () {
  it('should return resolved value', async function () {
    const p = this.cp.call();
    this.cp.resolve('foo');
    await p;
    assert.equal(this.cp.value, 'foo');
  });

  it('should return rejected value', async function () {
    const p = this.cp.call();
    this.cp.reject('err');
    await assertRejected(p);
    assert.equal(this.cp.value, 'err');
  });
});
