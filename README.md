# postcss-preserve-px-fontsize
preserve px font-size from postcss-px-to-viewport, only for vw unit.



## Requirement

Must set this plugin after [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport).



## Usage

```javascript
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
```

input

```css
div {
	font-size: 50vw;
	/* 375px */
	font: bold 4.267vw/50vw "Microsoft Yahei"; 
	/* 32px */
	color: red;
	line-height: 4.267vw;
}
```

output

```css
div {
	font-size: 375px;
	/* 375px */
	font: bold 32px/375px "Microsoft Yahei"; 
	/* 32px */
	color: red;
	line-height: 32px;
}
```



## Options

* `viewportWidth` same as [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport#options)
* `lineHeight` boolean, should preserve px unit for `line-height`



## Skip a declaration

Maybe you want to use vw for a specified declaration, you can add a comment `/* skipvw */` after the declaration.

```css
div {
	font-size: 50vw; /* skipvw */
	/* 375px */
	font: bold 4.267vw/50vw "Microsoft Yahei"; 
	/* 32px */
	color: red;
	line-height: 4.267vw;
}
```

This will preserve vw for `font-size`.

output

```css
div {
	font-size: 50vw; /* skipvw */
	/* 375px */
	font: bold 32px/375px "Microsoft Yahei"; 
	/* 32px */
	color: red;
	line-height: 32px;
}
```

