import cookie from 'cookie';
import { minify } from 'html-minifier';
import { prerendering } from '$app/env';
// import * as Server from './server';

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

export function getSession({ request }) {
	const cookies = cookie.parse(request.headers.get('cookie') ?? '');

	return {
		isLoggedIn: !!cookies.accessToken
	};
}

export async function handle({ event, resolve }) {
	const response = await resolve(event, {
		ssr: !event.url.pathname.startsWith('/dashboard')
	});

	// 	console.log('event.request.url', event.request.url, 'X', event.request.url.path);
	//
	// 	if (event.request.url.match(/\/api\//)) {
	// 		console.log('!!!');
	//
	// 		const server = await Server.init();
	// 		const response = await server.inject({
	// 			method: 'GET',
	// 			url: event.request.url,
	// 			query: event.request.query,
	// 			payload: event.request.payload,
	// 			headers: event.request.headers
	// 		});
	//
	// 		// return fastify's response with a request object SvelteKit can understand
	// 		return new Response({
	// 			status: 200,
	// 			body: response.body
	// 		});
	// 	}

	if (prerendering && response.headers.get('content-type') === 'text/html') {
		return new Response(minify(await response.text(), minification_options), {
			status: response.status,
			headers: response.headers
		});
	}

	return response;
}
