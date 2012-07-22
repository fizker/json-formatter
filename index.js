#!/usr/bin/env node

var program = require('commander')
  , fs = require('fs')
  , path = require('path')
  , formatter = require('./src/formatter')

  , input
  , output

program
	.version('0.1.0')
	.usage('path/to/input')
	.parse(process.argv)

input = program.args[0]

if(!input) {
	program.parse(['bla', 'bla', '--help'])
	program.exit(1)
}

output = input

var original = fs.readFileSync(input, 'utf8')
  , formatted = formatter.parse(original)

fs.writeFileSync(output, formatted + '\n')
