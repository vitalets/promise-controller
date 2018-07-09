# promise-controller
[![Build Status](https://travis-ci.org/vitalets/promise-controller.svg?branch=master)](https://travis-ci.org/vitalets/promise-controller)
[![npm](https://img.shields.io/npm/v/promise-controller.svg)](https://www.npmjs.com/package/promise-controller)
[![license](https://img.shields.io/npm/l/promise-controller.svg)](https://www.npmjs.com/package/promise-controller)
<img align="right" src="https://user-images.githubusercontent.com/1473072/31122235-ad06e442-a843-11e7-8c7e-c24149b6eeda.png"/>

Advanced control over [Promise] lifecycle.

## Installation
```bash
npm install promise-controller --save
```

## Use cases

1. [Easy access to `resolve` / `reject` callbacks](#1-easy-access-to-resolve--reject-callbacks)
2. [Re-use of existing promise while operation is not finished](#2-re-use-of-existing-promise-while-operation-is-not-finished)
3. [Auto-reject after configured timeout](#3-auto-reject-after-configured-timeout)

#### 1. Easy access to `resolve` / `reject` callbacks
If in some place of your code you are storing `resolve / reject` callbacks for the future fulfillment:
```js
let _resolve, _reject;
let promise = new Promise((resolve, reject) => {
 callAsyncFunciton();
 _resolve = resolve;
 _reject = reject;
});

// ...after some time
_resolve(value);
```

It is actually the usecase for `PromiseController`:
```js
let promise = promiseController.call(() => callAsyncFunciton());

// ...after some time
promiseController.resolve(value);
```

#### 2. Re-use of existing promise while operation is not finished
If you rely on some flag to avoid creating new promises while operation is not finished
(for example when connecting to database):
```js
let promise = null;

function connectToDb() {
 if (!promise) {
   promise = mongoClient.open();
 }

 return promise;
}
```

It is also the usecase for `PromiseController`:
```js
function connectToDb() {
  return promiseController.promise || promiseController.call(() => mongoClient.open());
}
```

#### 3. Auto-reject after configured timeout
If you want promise to auto-reject after timeout:
```js
let timer;
let promise = new Promise((resolve, reject) => {
 callAsyncFunciton(data => {
   clearTimeout(timer);
   resolve(data);
 });
 timer = setTimeout(() => reject(new Error('Timeout')), 1000);
});

```
It can be also achieved with `PromiseController`:
```js
let promiseController = new PromiseController({
  timeout: 1000
});

let promise = promiseController.call(() => {
   callAsyncFunciton(data => promiseController.resolve(data));
})
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
Returns value with that promise was settled (fulfilled or rejected).

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
Returns true if promise is fulfilled or rejected.

**Kind**: instance property of [<code>PromiseController</code>](#PromiseController)  
<a name="PromiseController+isCalled"></a>

#### pController.isCalled ⇒ <code>Boolean</code>
Returns true if promise already called via `.call()` method.

**Kind**: instance property of [<code>PromiseController</code>](#PromiseController)  
<a name="PromiseController+call"></a>

#### pController.call(fn) ⇒ <code>Promise</code>
This method executes `fn` and returns promise. While promise is pending all subsequent calls of `.call(fn)`
will return the same promise. To fulfill that promise you should use `.resolve() / .reject()` methods.
If `fn` itself returns promise, then external promise is attached to it and fulfills together.

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
If promise is pending it will be rejected with error: "Promise rejected by reset".

**Kind**: instance method of [<code>PromiseController</code>](#PromiseController)  
<a name="PromiseController+timeout"></a>

#### pController.timeout(ms, [reason])
Configures timeout for automatic promise rejection.

**Kind**: instance method of [<code>PromiseController</code>](#PromiseController)  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>Number</code> | delay in ms after that promise will be rejected automatically |
| [reason] | <code>String</code> \| <code>Error</code> \| <code>function</code> | rejection value. If it is string or Error - promise will be rejected with that error. If it is function - this function will be called after delay where you can manually resolve or reject promise via `.resolve() / .reject()` methods of controller. |

## Related projects
* [event-to-promise](https://github.com/JsCommunity/event-to-promise)
* [promise-events](https://github.com/yanickrochon/promise-events)

## License
MIT @ [Vitaliy Potapov](https://github.com/vitalets)

[Promise]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
[Promises]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
