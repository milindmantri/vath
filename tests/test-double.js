import { suite } from 'uvu';
import { strict as assert } from 'assert';

import { fn as tdFn } from '../src/test-double.js';

const stub = suite('test-doubles');

stub('should throw error on invalid params count', function() {

	assert.throws(() => tdFn(null), TypeError);
	assert.throws(() => tdFn(true), TypeError);
	assert.throws(() => tdFn('1'), TypeError);
	assert.throws(() => tdFn(), TypeError);

});

stub('should create a function with defined params length', function() {

	const fn = tdFn(2);

	assert.equal('function', typeof fn);
	assert.equal(2, fn.length);
});

stub('should return value when set', function() {

	const fn = tdFn(1, 'hello');

	assert.equal('hello', fn());
});

stub('should give the number of calls as a prop', function() {

	const fn = tdFn(1, 'hello again');

	for (let i = 0; i < 10; i++  ) {
		fn();
	}

	assert.equal(10, fn.calls );
});

stub('should match passed argument', function() {

	const fn = tdFn(2, 'hello again');

	for (let i = 0; i < 10; i++  ) {
		fn(i, i + 1);
	}

	for (let i = 0; i < 10; i++  ) {
		assert.equal(i,     fn.args[i][0]);
		assert.equal(i + 1, fn.args[i][1]);
	}

});

stub('should throw when an unknown prop is accessed', function() {
	const fn = tdFn(1);
	assert.throws(() => fn.hello);
});

stub.run();
