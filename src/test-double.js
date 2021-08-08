// Test Double (stub helper)

// Creates a stub function with a given number of parameters and a return value.
// paramsCount -> Number of parameters to mock fn
// returnValue -> Return value of mock
function fn(paramsCount, returnValue) {

	if (typeof paramsCount !== 'number') {
		throw TypeError(`{paramsCount} must be a number, was [${paramsCount}]`);
	}

	const mock = (function mockClosure() {

		const calls = new Array(0);
		const proxyHandler = {
			get: function(_, prop) {
				switch(prop) {
					case 'length':
						return paramsCount;
					case 'calls':
						return calls.length;
					case 'args':
						return calls;

					// Helpers
					case 'first':
						return calls[0];
					case 'second':
						return calls[1];
					case 'third':
						return calls[2];

					// Only allow mock properties
					default:
						throw `No property [${prop}] found`;
				}
			}
		};

		return new Proxy(
			// Takes any number of arguments
			function(...args) {
				calls.push(args);
				return returnValue;
			}
			, proxyHandler
		);

	})();

	return mock;

}

export { fn };
