import { authenticate } from '$lib/utils/api';

export async function load({ cookies }) {
	if (cookies.get('accessToken') || cookies.get('refreshToken')) {
		const authenticated = await authenticate(cookies);
		return { authenticated };
	}

	return { authenticated: false };
}
