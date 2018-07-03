# promise-controller
[![Build Status](https://travis-ci.org/vitalets/promise-controller.svg?branch=master)](https://travis-ci.org/vitalets/promise-controller)
[![npm](https://img.shields.io/npm/v/promise-controller.svg)](https://www.npmjs.com/package/promise-controller)
[![license](https://img.shields.io/npm/l/promise-controller.svg)](https://www.npmjs.com/package/promise-controller)
<img align="right" src="https://user-images.githubusercontent.com/1473072/31122235-ad06e442-a843-11e7-8c7e-c24149b6eeda.png"/>

Advanced control over [Promise] lifecycle.

## Features

* convenient access to `resolve` / `reject` callbacks
* re-use existing promise while async operation is running
* auto-reject after configured timeout

## Installation
```bash
npm install promise-controller --save
```

## Usage
```js
const PromiseController = require('promise-controller');

const promiseController = new PromiseController();

const promise = promiseController.call(() => {
  // run some async operation
});

// resolve / reject promise via controller
promiseController.resolve(...);
promiseController.reject(...);
```
## API

<a name="PromiseController"></a>

### PromiseController
Promise controller.

**Kind**: global class  

* [PromiseController](#PromiseController)
    * [new PromiseController()](#new_PromiseController_new)
    * [.promise](#PromiseController+promise) ⇒ <code>Promise</code>
    * [.value](#PromiseController+value) ⇒ <code>\*</code>
    * [.isPending](#PromiseController+isPending) ⇒ <code>Boolean</code>
    * [.isFulfilled](#PromiseController+isFulfilled) ⇒ <code>Boolean</code>
    * [.isRejected](#PromiseController+isRejected) ⇒ <code>Boolean</code>
    * [.isSettled](#PromiseController+isSettled) ⇒ <code>Boolean</code>
    * [.isCalled](#PromiseController+isCalled) ⇒ <code>Boolean</code>
    * [.call(fn)](#PromiseController+call) ⇒ <code>Promise</code>
    * [.resolve([value])](#PromiseController+resolve)
    * [.reject([value])](#PromiseController+reject)
    * [.reset()](#PromiseController+reset)
    * [.timeout(ms, [reason])](#PromiseController+timeout)

<a name="new_PromiseController_new"></a>

#### new PromiseController()
Creates promise controller. Unlike original Promise, it does not immediately call any function.
Instead it has [.call()](#PromiseController+call) method that calls provided function
and stores `resolve / reject` methods for future access.

<a name="PromiseController+promise"></a>

#### pController.promise ⇒ <code>Promise</code>
Returns promise itself.

**Kind**: instance property of [<code>PromiseController</code>](#PromiseController)  
<a name="PromiseController+value"></a>

#### pController.value ⇒ <code>\*</code>
Returns value with that promise was fulfilled (resolved or rejected).

**Kind**: instance property of [<code>PromiseController</code>](#PromiseController)  
<a name="PromiseController+isPending"></a>

#### pController.isPending ⇒ <code>Boolean</code>
Returns true if promise is pending.

**Kind**: instance property of [<code>PromiseController</code>](#PromiseController)  
<a name="PromiseController+isFulfilled"></a>

#### pController.isFulfilled ⇒ <code>Boolean</code>
Returns true if promise is fulfilled.

**Kind**: instance property of [<code>PromiseController</code>](#PromiseController)  
<a name="PromiseController+isRejected"></a>

#### pController.isRejected ⇒ <code>Boolean</code>
Returns true if promise rejected.

**Kind**: instance property of [<code>PromiseController</code>](#PromiseController)  
<a name="PromiseController+isSettled"></a>

#### pController.isSettled ⇒ <code>Boolean</code>
Returns true if promise fulfilled or rejected.

**Kind**: instance property of [<code>PromiseController</code>](#PromiseController)  
<a name="PromiseController+isCalled"></a>

#### pController.isCalled ⇒ <code>Boolean</code>
Returns true if promise already called via `.call()` method.

**Kind**: instance property of [<code>PromiseController</code>](#PromiseController)  
<a name="PromiseController+call"></a>

#### pController.call(fn) ⇒ <code>Promise</code>
This method executes `fn` and returns promise. While promise is pending all subsequent calls of `.call(fn)`
will return the same promise. To fulfill that promise you can use `.resolve() / .reject()` methods.

**Kind**: instance method of [<code>PromiseController</code>](#PromiseController)  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="PromiseController+resolve"></a>

#### pController.resolve([value])
Resolves pending promise with specified `value`.

**Kind**: instance method of [<code>PromiseController</code>](#PromiseController)  

| Param | Type |
| --- | --- |
| [value] | <code>\*</code> | 

<a name="PromiseController+reject"></a>

#### pController.reject([value])
Rejects pending promise with specified `value`.

**Kind**: instance method of [<code>PromiseController</code>](#PromiseController)  

| Param | Type |
| --- | --- |
| [value] | <code>\*</code> | 

<a name="PromiseController+reset"></a>

#### pController.reset()
Resets to initial state.

**Kind**: instance method of [<code>PromiseController</code>](#PromiseController)  
<a name="PromiseController+timeout"></a>

#### pController.timeout(ms, [reason])
Sets timeout to reject promise automatically.

**Kind**: instance method of [<code>PromiseController</code>](#PromiseController)  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>Number</code> | delay in ms after that promise will be rejected automatically |
| [reason] | <code>String</code> \| <code>Error</code> \| <code>function</code> | rejection value. If it is string or error - promise will be rejected with that error. If it is function - this function will be called after delay where you can manually resolve or reject promise via `.resolve() / .reject()` methods. |

## Related
* [event-to-promise](https://github.com/JsCommunity/event-to-promise)
* [promise-events](https://github.com/yanickrochon/promise-events)

## License
MIT @ [Vitaliy Potapov](https://github.com/vitalets)

[Promise]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
[Promises]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
