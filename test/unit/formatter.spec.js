describe('unit/formatter.spec.js', function() {
	var formatter = require('../../src/formatter')

	describe('When root is an object', function() {
		describe('containing a single key-value pair', function() {
			it('should put it on two lines', function() {
				var result = formatter('{"a":"b"}')
				expect(result).to.equal('{ "a": "b"\n}')
			})
		})
		describe('with no other characters', function() {
			it('should put it on two lines', function() {
				var result = formatter('{}')
				expect(result).to.equal('{\n}')
			})
		})
	})
})
