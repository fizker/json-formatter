describe('unit/formatter.spec.js', function() {
	var formatter = require('../../src/formatter')

	describe('When handling escaped values', function() {
		var result

		describe('in the keys', function() {
			it('should escape `"` properly', function() {
				result = formatter.parse('{"ab\\"c":"def"}')
				result.should.equal(
					  '{ "ab\\"c": "def"\n'
					+ '}'
				)
			})
			it('should escape newlines properly', function() {
				result = formatter.parse('{"ab\\nc":"def"}')
				result.should.equal(
					  '{ "ab\\nc": "def"\n'
					+ '}'
				)
			})
		})

		describe('in the values', function() {
			it('should escape `"` properly', function() {
				result = formatter.parse('{"abc":"de\\"f"}')
				result.should.equal(
					  '{ "abc": "de\\"f"\n'
					+ '}'
				)
			})
			it('should escape newlines properly', function() {
				result = formatter.parse('{"abc":"de\\nf"}')
				result.should.equal(
					  '{ "abc": "de\\nf"\n'
					+ '}'
				)
			})
		})
	})

	describe('When nesting objects and arrays deeply', function() {
		it('should format according to spec', function() {
			var obj =
			    { a: []
			    , b: 'b'
			    , c:
			      [ 1
			      , { "a": 1
			        , "b": 2
			        }
			      , [ [ 1
			          , 2
			          ]
			        , { "a":
			            [ 1
			            ]
			          , "b":
			            [
			            ]
			          }
			        ]
			      ]
			    }
			  , result = formatter(obj)

			expect(result).to.equal(
				  '{ "a":\n'
				+ '  [\n'
				+ '  ]\n'
				+ ', "b": "b"\n'
				+ ', "c":\n'
				+ '  [ 1\n'
				+ '  , { "a": 1\n'
				+ '    , "b": 2\n'
				+ '    }\n'
				+ '  , [ [ 1\n'
				+ '      , 2\n'
				+ '      ]\n'
				+ '    , { "a":\n'
				+ '        [ 1\n'
				+ '        ]\n'
				+ '      , "b":\n'
				+ '        [\n'
				+ '        ]\n'
				+ '      }\n'
				+ '    ]\n'
				+ '  ]\n'
				+ '}'
			)
		})
	})

	describe('When root is an object', function() {
		describe('with a nested array', function() {
			it('should format it according to spec', function() {
				var result = formatter.parse('{"a":[],"b":[1,2,3]}')
				expect(result).to.equal(
					  '{ "a":\n'
					+ '  [\n'
					+ '  ]\n'
					+ ', "b":\n'
					+ '  [ 1\n'
					+ '  , 2\n'
					+ '  , 3\n'
					+ '  ]\n'
					+ '}'
				)
			})
		})
		describe('with a single level', function() {
			it('should format it according to spec', function() {
				var result = formatter.parse('{"a":1,"b":"2", "c":true, "d":null}')
				expect(result).to.equal(
					  '{ "a": 1\n'
					+ ', "b": "2"\n'
					+ ', "c": true\n'
					+ ', "d": null\n'
					+ '}'
				)
			})
		})
		describe('containing a single key-value pair', function() {
			it('should put it on two lines', function() {
				var result = formatter.parse('{"a":"b"}')
				expect(result).to.equal('{ "a": "b"\n}')
			})
		})
		describe('with no other characters', function() {
			it('should put it on two lines', function() {
				var result = formatter.parse('{}')
				expect(result).to.equal('{\n}')
			})
		})
	})

	describe('When root is an array', function() {
		describe('with nested arrays', function() {
			it('should format it according to spec', function() {
				var result = formatter.parse('[1, [], ["2", true]]')
				expect(result).to.equal(
					  '[ 1\n'
					+ ', [\n'
					+ '  ]\n'
					+ ', [ "2"\n'
					+ '  , true\n'
					+ '  ]\n'
					+ ']'
				)
			})
		})
		describe('with a single level', function() {
			it('should format it according to spec', function() {
				var result = formatter.parse('[1,"2", true, null]')
				expect(result).to.equal(
					  '[ 1\n'
					+ ', "2"\n'
					+ ', true\n'
					+ ', null\n'
					+ ']'
				)
			})
		})
		describe('with no other characters', function() {
			it('should put it on two lines', function() {
				var result = formatter.parse('[]')
				expect(result).to.equal('[\n]')
			})
		})
	})

	describe('When root is null', function() {
		it('should put it on one line', function() {
			var result = formatter.parse('null')
			expect(result).to.equal('null')
		})
	})

	describe('When root is a boolean', function() {
		it('should put it on one line', function() {
			var result = formatter.parse('true')
			expect(result).to.equal('true')
		})
	})

	describe('When root is a string', function() {
		it('should put it on one line', function() {
			var result = formatter.parse('\n"abc" \n ')
			expect(result).to.equal('"abc"')
		})
	})

	describe('When root is a number', function() {
		describe('without decimals', function() {
			it('should put it on one line', function() {
				var result = formatter.parse('\n12 \n ')
				expect(result).to.equal('12')
			})
		})
		describe('with decimals', function() {
			it('should put it on one line', function() {
				var result = formatter.parse('\n12.34 \n ')
				expect(result).to.equal('12.34')
			})
		})
	})
})
