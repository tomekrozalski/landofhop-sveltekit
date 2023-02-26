import type { Handle } from '@sveltejs/kit';
import { minify } from 'html-minifier';
import { start_mongo } from '$db/mongo';

const minification_options = {
	collapseBooleanAttributes: true,
	collapseWhitespace: true,
	conservativeCollapse: true,
	decodeEntities: true,
	html5: true,
	ignoreCustomComments: [/^#/],
	minifyCSS: true,
	minifyJS: false,
	removeAttributeQuotes: true,
	removeComments: true,
	removeOptionalTags: true,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
	sortAttributes: true,
	sortClassName: true
};

start_mongo()
	.then(() => {
		console.log('Mongo started');
	})
	.catch(() => {
		console.error('Mongo launch failed');
	});

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		// @ToDo: move it to dashboard layout?
		// ssr: !event.url.pathname.startsWith('/dashboard')
	});

	const mode = process.env.NODE_ENV;
	const dev = mode === 'development';

	if (!dev && response.headers.get('content-type') === 'text/html') {
		return new Response(minify(await response.text(), minification_options), {
			status: response.status,
			headers: response.headers
		});
	}

	return response;
};
