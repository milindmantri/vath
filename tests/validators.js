import { suite } from 'uvu';
import { strict as assert } from 'assert';

import {
	  isNum
	, isFunc
	, isStr
	, isBool
	, checkParamsCount
} from '../src/validators.js';

const validators = suite('validators');

validators('checkNum', function() {
	assert.throws(() => isNum('a', false), /number/);
	assert.throws(() => isNum('a', null), /number/);
	assert.throws(() => isNum('a', undefined), /number/);

	assert.ok(isNum('a', 0));
});

validators('checkFunc', function() {
	assert.throws(() => isFunc('a', 2), /function/);
	assert.throws(() => isFunc('a', null), /function/);
	assert.throws(() => isFunc('a', undefined), /function/);

	assert.ok(isFunc('a', () => {}));
});

validators('checkStr', function() {
	assert.throws(() => isStr('a', true), /string/);
	assert.throws(() => isStr('a', null), /string/);
	assert.throws(() => isStr('a', undefined), /string/);
	assert.throws(() => isStr('a', () => {}), /string/);

	assert.ok(isStr('a', ''));
	assert.ok(isStr('a', 'hello'));
});

validators('checkBool', function() {
	assert.throws(() => isBool('a', 0), /boolean/);
	assert.throws(() => isBool('a', 1), /boolean/);
	assert.throws(() => isBool('a', null), /boolean/);
	assert.throws(() => isBool('a', undefined), /boolean/);
	assert.throws(() => isBool('a', () => {}), /boolean/);

	assert.ok(isBool('a', true));
	assert.ok(isBool('a', false));
});

validators('checkParametersCount', function() {
	const z = () => {};
	const one = a => a;
	const two = (a, b) => a + b;

	assert.throws(() => checkParamsCount('z', z, null), /number/);
	assert.throws(() => checkParamsCount('z', z, undefined), /number/);

	assert.throws(() => checkParamsCount('z', z, 2), /0/);
	assert.throws(() => checkParamsCount('one', one, 0), /1/);
	assert.throws(() => checkParamsCount('two', two, 1), /2/);

	assert.ok(checkParamsCount('z', z, 0) === 0);
	assert.ok(checkParamsCount('one', one, 1) === 1);
	assert.ok(checkParamsCount('two', two, 2) === 2);

});

validators.run();
