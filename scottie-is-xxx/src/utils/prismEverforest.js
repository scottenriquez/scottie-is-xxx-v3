const everforestDarkHard = {
	plain: {
		color: '#d3c6aa',
		backgroundColor: '#272e33'
	},
	styles: [
		{
			types: ['comment', 'prolog', 'doctype', 'cdata'],
			style: {
				color: '#859289',
				fontStyle: 'italic'
			}
		},
		{
			types: ['namespace'],
			style: {
				opacity: 0.7
			}
		},
		{
			types: ['string', 'attr-value'],
			style: {
				color: '#a7c080'
			}
		},
		{
			types: ['punctuation', 'operator'],
			style: {
				color: '#d3c6aa'
			}
		},
		{
			types: ['entity', 'url', 'symbol', 'number', 'boolean', 'variable', 'constant', 'property', 'regex', 'inserted'],
			style: {
				color: '#d699b6'
			}
		},
		{
			types: ['atrule', 'keyword', 'attr-name', 'selector'],
			style: {
				color: '#e67e80'
			}
		},
		{
			types: ['function', 'deleted', 'tag'],
			style: {
				color: '#7fbbb3'
			}
		},
		{
			types: ['function-variable'],
			style: {
				color: '#83c092'
			}
		},
		{
			types: ['tag', 'selector', 'keyword'],
			style: {
				color: '#e69875'
			}
		}
	]
};

module.exports = everforestDarkHard;