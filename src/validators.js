// TYPE VALIDATORS

// Validate not null, not undefined and type of a value
function check(name, value, type) {
	if (
		   value === null
		|| typeof value == 'undefined'
		|| typeof value !== type
	) {
		throw new TypeError(
			`{${name}} must be a ${type}, was [${value}]`
		);
	} else {
		return true;
	}
}

// Abstractions to prevent type paramaters
function isNum(name, value) {
	return check(name, value, 'number');
}

function isStr(name, value) {
	return check(name, value, 'string');
}

function isFunc(name, value) {
	return check(name, value, 'function');
}

function isBool(name, value) {
	return check(name, value, 'boolean');
}

// FUNCTION VALIDATORS

// Checks number of parameters for given function
function checkParamsCount(name, func, length) {
	isFunc(name, func);
	isNum('length',  length);

	if (func.length === length) {
		return func.length;
	} else {
		throw `{${name}} function must have [${length}] parameters,`
			+ ` was [${func.length}]`;
	}
}

export {
	  isNum
	, isStr
	, isFunc
	, isBool
	, checkParamsCount
};
