import { authenticate } from '$lib/utils/api';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	if (cookies.get('accessToken') || cookies.get('refreshToken')) {
		const authenticated = await authenticate(cookies);
		return { authenticated };
	}

	return { authenticated: false };
};
