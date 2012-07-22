module.exports = format

format.parse = function(str) {
	return format(JSON.parse(str))
}

var util = require('util')

function format(obj, lvl) {
	lvl = lvl || 0

	if(typeof obj === 'string') {
		return util.format('"%s"', obj)
	} else if(typeof obj === 'number') {
		return obj.toString()
	} else if(typeof obj === 'boolean') {
		return obj.toString()
	} else if(obj === null) {
		return 'null'
	} else if(Array.isArray(obj)) {
		return arrayMapper(obj, lvl)
	}

	return objectMapper(obj, lvl)
}

function arrayMapper(obj, lvl) {
	var formattedArray = obj.map(mapper).join('\n')
	  , ret = util.format('[%s\n', formattedArray)

	function mapper(obj, idx) {
		var value = format(obj, lvl + 1).trim()
		 , line = ' ' + value

		if(idx) {
			line = indent(',' + line, lvl + 1)
		}

		return line
	}

	return ret + indent(']', lvl + 1)
}

function objectMapper(obj, lvl) {
	return util.format
		( '{%s\n}'
		, Object.keys(obj)
			.map(function(key) {
				return util.format(' "%s": "%s"', key, obj[key])
			})
			.join('\n,')
		)
}

function indent(str, lvl) {
	var pad = new Array(lvl || 0).join('  ')
	return pad + str
}
