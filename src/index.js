const postcss = require('postcss');

function getOriginPx(fontSize, viewportWidth) {
	let originPx = parseFloat(fontSize.slice(0, -2)) / 100 * parseFloat(viewportWidth);
	if (Math.abs(originPx % 1 - 1) < 1e-2 || Math.abs(originPx % 1) < 1e-2) {
		originPx = Math.round(originPx);
	}
	return `${originPx}px`;
}

module.exports = postcss.plugin('postcss-preserve-fontsize', function ({ viewportWidth = 750, lineHeight = false } = {}) {
	return function (root) {
		root.walkRules(rule => {
			rule.walkDecls('font', decl => {
				const parts = decl.value.split('/');
				const sizeParts = parts[0], lineHeightParts = parts[1];
				const fontSize = sizeParts.split(/\s+/).filter(/v/.test.bind(/vw$/))[0];
				if (fontSize) {
					let originPx = getOriginPx(fontSize, viewportWidth);
					decl.value = decl.value.replace(fontSize, originPx);
				}
				if (lineHeight) {
					const lh = lineHeightParts.split(/\s+/).filter(/v/.test.bind(/vw$/))[0];
					if (lh) {
						let originPx = getOriginPx(lh, viewportWidth);
						decl.value = decl.value.replace(lh, originPx);
					}
				}
			});
			const declHandler = decl => {
				const val = decl.value;
				if (/vw$/.test(val)) {
					decl.value = getOriginPx(val, viewportWidth);
				}
			};
			rule.walkDecls('font-size', declHandler);
			if (lineHeight) {
				rule.walkDecls('line-height', declHandler);
			}
		});
	};
});