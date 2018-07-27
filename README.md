# promise-controller
[![Build Status](https://travis-ci.org/vitalets/promise-controller.svg?branch=master)](https://travis-ci.org/vitalets/promise-controller)
[![npm](https://img.shields.io/npm/v/promise-controller.svg)](https://www.npmjs.com/package/promise-controller)
[![license](https://img.shields.io/npm/l/promise-controller.svg)](https://www.npmjs.com/package/promise-controller)
<img align="right" src="https://user-images.githubusercontent.com/1473072/31122235-ad06e442-a843-11e7-8c7e-c24149b6eeda.png"/>

Advanced control of JavaScript promises.

## Installation
```bash
npm install promise-controller --save
```

## Use cases

* [Convenient access to `resolve` / `reject` callbacks](#convenient-access-to-resolve--reject-callbacks)
* [Re-use of existing promise while operation is pending](#re-use-of-existing-promise-while-operation-is-pending)
* [Auto-reject after configured timeout](#auto-reject-after-configured-timeout)

### Convenient access to `resolve` / `reject` callbacks
Before:
```js
let _resolve, _reject;
let promise = new Promise((resolve, reject) => {
 callAsyncFunciton();
 _resolve = resolve;
 _reject = reject;
});

// ...
_resolve(value);
```

After:
```js
import PromiseController from 'promise-controller';

let pc = new PromiseController();
let promise = pc.call(() => callAsyncFunciton());

// ...
pc.resolve(value);
```

### Re-use of existing promise while operation is pending
Before:
```js
let promise = null;

function connectToDb() {
 if (!promise) {
   promise = mongoClient.open();
 }

 return promise;
}
```

After:
```js
import PromiseController from 'promise-controller';

let pc = new PromiseController();

function connectToDb() {
  return pc.promise || pc.call(() => mongoClient.open());
}
```

### Auto-reject after configured timeout
Before:
```js
let timer;
let promise = new Promise((resolve, reject) => {
 callAsyncFunciton(() => {
   clearTimeout(timer);
   resolve();
 });
 // reject promise after timeout
 timer = setTimeout(() => reject(new Error('Timeout')), 1000);
});
```
After:
```js
let promiseController = new PromiseController({
  timeout: 1000,
  timeoutReason: 'Timeout'
});

let promise = promiseController.call(() => {
   callAsyncFunciton(() => promiseController.resolve());
})
```

## API

### Classes

<dl>
<dt><a href="#PromiseController">PromiseController</a></dt>
<dd></dd>
</dl>

### Typedefs

<dl>
<dt><a href="#Options">Options</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="PromiseController"></a>

### PromiseController
**Kind**: global class  

* [PromiseController](#PromiseController)
    * [new PromiseController([options])](#new_PromiseController_new)
    * [.promise](#PromiseController+promise) ⇒ <code>Promise</code>
    * [.value](#PromiseController+value) ⇒ <code>\*</code>
    * [.isPending](#PromiseController+isPending) ⇒ <code>Boolean</code>
    * [.isFulfilled](#PromiseController+isFulfilled) ⇒ <code>Boolean</code>
    * [.isRejected](#PromiseController+isRejected) ⇒ <code>Boolean</code>
    * [.isSettled](#PromiseController+isSettled) ⇒ <code>Boolean</code>
    * [.call(fn)](#PromiseController+call) ⇒ <code>Promise</code>
    * [.resolve([value])](#PromiseController+resolve)
    * [.reject([value])](#PromiseController+reject)
    * [.reset()](#PromiseController+reset)
    * [.configure(options)](#PromiseController+configure)

<a name="new_PromiseController_new"></a>

#### new PromiseController([options])
Creates promise controller. Unlike original Promise, it does not immediately call any function.
Instead it has [.call()](#PromiseController+call) method that calls provided function
and stores `resolve / reject` methods for future access.


| Param | Type |
| --- | --- |
| [options] | [<code>Options</code>](#Options) | 

<a name="PromiseController+promise"></a>

#### pc.promise ⇒ <code>Promise</code>
Returns promise itself.

**Kind**: instance property of [<code>PromiseController</code>](#PromiseController)  
<a name="PromiseController+value"></a>

#### pc.value ⇒ <code>\*</code>
Returns value with that promise was settled (fulfilled or rejected).

**Kind**: instance property of [<code>PromiseController</code>](#PromiseController)  
<a name="PromiseController+isPending"></a>

#### pc.isPending ⇒ <code>Boolean</code>
Returns true if promise is pending.

**Kind**: instance property of [<code>PromiseController</code>](#PromiseController)  
<a name="PromiseController+isFulfilled"></a>

#### pc.isFulfilled ⇒ <code>Boolean</code>
Returns true if promise is fulfilled.

**Kind**: instance property of [<code>PromiseController</code>](#PromiseController)  
<a name="PromiseController+isRejected"></a>

#### pc.isRejected ⇒ <code>Boolean</code>
Returns true if promise rejected.

**Kind**: instance property of [<code>PromiseController</code>](#PromiseController)  
<a name="PromiseController+isSettled"></a>

#### pc.isSettled ⇒ <code>Boolean</code>
Returns true if promise is fulfilled or rejected.

**Kind**: instance property of [<code>PromiseController</code>](#PromiseController)  
<a name="PromiseController+call"></a>

#### pc.call(fn) ⇒ <code>Promise</code>
Calls `fn` and returns promise. But if the promise returned from previous `call` is still pending,
the same promise will be returned instead of calling `fn` again. To fulfill that promise
you should use [resolve](#PromiseController+resolve) / [reject](#PromiseController+reject) methods. If `fn` itself returns promise,
then external promise is attached to it and fulfills together.

**Kind**: instance method of [<code>PromiseController</code>](#PromiseController)  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="PromiseController+resolve"></a>

#### pc.resolve([value])
Resolves pending promise with specified `value`.

**Kind**: instance method of [<code>PromiseController</code>](#PromiseController)  

| Param | Type |
| --- | --- |
| [value] | <code>\*</code> | 

<a name="PromiseController+reject"></a>

#### pc.reject([value])
Rejects pending promise with specified `value`.

**Kind**: instance method of [<code>PromiseController</code>](#PromiseController)  

| Param | Type |
| --- | --- |
| [value] | <code>\*</code> | 

<a name="PromiseController+reset"></a>

#### pc.reset()
Resets to initial state.
If promise is pending it will be rejected with error: "Promise rejected by reset".

**Kind**: instance method of [<code>PromiseController</code>](#PromiseController)  
<a name="PromiseController+configure"></a>

#### pc.configure(options)
Re-assign one or more options.

**Kind**: instance method of [<code>PromiseController</code>](#PromiseController)  

| Param | Type |
| --- | --- |
| options | [<code>Options</code>](#Options) | 

<a name="Options"></a>

### Options : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [timeout] | <code>Number</code> | <code>0</code> | Timeout in ms after that promise will be rejected automatically. |
| [timeoutReason] | <code>String</code> \| <code>Error</code> \| <code>function</code> |  | Rejection reason for timeout. If it is string or Error - promise will be rejected with that error. If it is function - this function will be called after timeout where you can manually resolve or reject promise via `.resolve() / .reject()` methods of controller. |
| [resetReason] | <code>String</code> |  | Rejection reason used when `.reset` is called while promise is pending. |

## Related projects
* [event-to-promise](https://github.com/JsCommunity/event-to-promise)
* [promise-events](https://github.com/yanickrochon/promise-events)

## License
MIT @ [Vitaliy Potapov](https://github.com/vitalets)
