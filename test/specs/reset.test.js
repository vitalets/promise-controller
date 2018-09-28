describe('reset', function () {
  it('should not affect resolved promise', function () {
    this.cp.call();
    this.cp.resolve();
    assert.equal(this.cp.isPending, false);
    assert.equal(this.cp.isPending, false);
    this.cp.reset();
    assert.equal(this.cp.isPending, false);
    assert.equal(this.cp.isPending, false);
  });

  it('should reject pending promise', async function () {
    const p = this.cp.call(noop);
    this.cp.reset();
    assert.equal(this.cp.isRejected, false);
    assert.equal(this.cp.isPending, false);
    assert.equal(this.cp.value, undefined);
    await assertRejected(p, PromiseController.ResetError, 'Promise rejected by PromiseController reset.');
    assert.equal(this.cp.isRejected, false);
    assert.equal(this.cp.isPending, false);
    assert.equal(this.cp.value, undefined);
  });

  it('should reject pending promise with custom error message', async function () {
    const cp = new PromiseController({resetReason: 'reset'});
    const p = cp.call(noop);
    cp.reset();
    await assertRejected(p, PromiseController.ResetError, 'reset');
  });

  it('should reject pending promise with custom error message as function', async function () {
    const cp = new PromiseController({resetReason: () => 'reset'});
    const p = cp.call(noop);
    cp.reset();
    await assertRejected(p, PromiseController.ResetError, 'reset');
  });
});
