const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const customMedia = require('postcss-custom-media')

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const config = {
	plugins: [
		autoprefixer(),
		customMedia(),
		!dev && cssnano({
			preset: 'default',
		}),
	],
};

module.exports = config;
