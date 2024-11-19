const tailwindcss   = require("tailwindcss");
const autoprefixer  = require("autoprefixer");
const postcssNested = require('postcss-nested');
const cssnano       = require('cssnano');

const config = {
	plugins: [
		//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
		tailwindcss(),
		postcssNested,
		//But others, like autoprefixer, need to run after,
		cssnano({ 
			preset: [
				require('cssnano-preset-advanced'), { 
					discardUnused: true,
					discardComments: {"removeAll": true},
					colormin: true,
					minifyFontValues: true,
					mergeRules: true,
					discardDuplicates: true,
					discardEmpty: true,
					minifyGradients: true,
					minifyParams: true,
				}
			],
			plugins: [autoprefixer]
		})
	],
}

module.exports = config;
