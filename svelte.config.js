import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
			postcss: true
		})
	],
	kit: {
		adapter: adapter(),
		alias: {
			$constants: './src/lib/utils/constants.ts',
			$db: './src/db',
			$types: './src/types'
		}
	}
};

export default config;
