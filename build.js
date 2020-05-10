'use strict'

const { writeFile } = require('fs').promises
const js = require('rosid-handler-js')
const sass = require('rosid-handler-sass')

sass('src/styles/main.scss', {

	optimize: true

}).then((data) => {

	return writeFile('dist/basicRotate.min.css', data)

})

js('src/scripts/main.js', {

	optimize: true,
	babel: {
		presets: [ '@babel/preset-env' ],
		babelrc: false,
		global: true
	},
	browserify: {
		standalone: 'basicRotate'
	}

}).then((data) => {

	return writeFile('dist/basicRotate.min.js', data)

})