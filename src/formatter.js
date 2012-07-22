module.exports = format

var util = require('util')

function format(input) {
	var obj = JSON.parse(input)
	  , out = objectMapper(obj)

	return out
}

function objectMapper(obj) {
	return util.format
		( '{%s\n}'
		, Object.keys(obj)
			.map(function(key) {
				return util.format(' "%s": "%s"', key, obj[key])
			})
			.join('\n,')
		)
}
