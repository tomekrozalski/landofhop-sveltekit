import authenticate from './layout/utils/authenticate';

export const load = async ({ cookies }) => {
	if (cookies.get('accessToken') || cookies.get('refreshToken')) {
		const authenticated = await authenticate(cookies);
		return { authenticated };
	}

	return { authenticated: false };
};
