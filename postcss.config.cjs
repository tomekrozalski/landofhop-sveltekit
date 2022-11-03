const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postImport = require('postcss-import');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const config = {
	plugins: [
		autoprefixer(),
		postImport(),
		!dev &&
			cssnano({
				preset: 'default'
			})
	]
};

module.exports = config;
