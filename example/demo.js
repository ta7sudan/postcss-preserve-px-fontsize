const postcss = require('postcss');
const preserveFontSize = require('../src/index');
const fs = require('fs');

const css = fs.readFileSync('./example/test.css', 'utf8');

postcss([preserveFontSize({
	viewportWidth: 750,
	lineHeight: true
})]).process(css).then(rst => {
	console.log(rst.css);
});