## Validation and Testing Helpers

A utilities library to help with validation and tests.

Uses ES Modules (for CommonJS, look [here](https://nodejs.org/docs/latest-v14.x/api/esm.html#esm_import_expressions).)


### Installation

```
npm install vath
```

### Usage

**Sub modules,**
- Validators
  - Throw descriptive errors on invalid values
  - Simple checkers for `number`, `boolean`, `string` and `function`
  - Checker to validate number of parameters on a function
- Test Double
  - `fn`: A handy stub function creator with settable number of parameters.

**Validators (code),**
```js
import { Validators } from 'vath';

// Available functions
const {
	  isNum  // number validator
	, isStr  // string validator
	, isFunc // function validator
	, isBool // boolean validator
	, checkParamsCount
} = Validators;

// ------
// isNum, isStr, isFunc, isBool - Example
// ------

let cId = null;

console.log( isNum('clientId', cId) );
// Throws TypeError with the following message,
// {clientId} must be a number, was [null]

cId = 121;

console.log( isNum('cId', cId) );
// true

// ------
// checkParamsCount - Example
// ------

// Missing 'res', client will never get a response
function handler(req) {
	...
}

import('http')
	.then(function (http) {

		checkParamsCount('requestHandler', handler, 2);
		// Throws error with the following message,
		// {requestHandler} function must have [2] parameters, was [1]

		http.createServer(handler);

	});
```

**Test Double (code)**,

WIP

Please raise an issue for suggestions, problems, questions etc.

### Credits
- [Ronnie Mose](https://github.com/megamoose), for the error message style.