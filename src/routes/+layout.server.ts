import cookie from 'cookie';
import { authenticate } from '$lib/utils/api';

export async function load({ request }) {
	const cookies = cookie.parse(request.headers.get('cookie') ?? '');

	if (cookies.accessToken || cookies.refreshToken) {
		const [authenticated, headers] = await authenticate(request);

		if (authenticated && headers?.['Set-Cookie']) {
			return new Response(JSON.stringify({ authenticated }), {
				headers: {
					'Set-Cookie': headers['Set-Cookie'].join(',')
				}
			});
		}

		return { authenticated };
	}

	return { authenticated: false };
}
