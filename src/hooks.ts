import type { GetSession, Handle } from '@sveltejs/kit';
import cookie from 'cookie';
import { minify } from 'html-minifier';
import { prerendering } from '$app/env';
import { authenticate } from '$lib/utils/api';

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

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') ?? '');
	let authCookies = '';

	if (cookies.accessToken || cookies.refreshToken) {
		const [isAuthenticated, headers] = await authenticate(event.request);
		event.locals.authenticated = isAuthenticated;

		if (isAuthenticated && headers?.['Set-Cookie']) {
			authCookies = headers['Set-Cookie'].join(',');
		}
	} else {
		event.locals.authenticated = false;
	}

	const response = await resolve(event, {
		ssr: !event.url.pathname.startsWith('/dashboard')
	});

	if (authCookies) {
		response.headers.set('Set-Cookie', authCookies);
	}

	if (prerendering && response.headers.get('content-type') === 'text/html') {
		return new Response(minify(await response.text(), minification_options), {
			status: response.status,
			headers: response.headers
		});
	}

	return response;
};

export const getSession: GetSession = ({ locals }) => {
	return {
		isLoggedIn: locals.authenticated
	};
};
