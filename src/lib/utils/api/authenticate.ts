import cookie from 'cookie';
import * as jwt from 'jsonwebtoken';

// import { getDbCollections } from '$lib/utils/api';

async function authenticate(request): Promise<boolean> {
	const { accessToken, refreshToken } = cookie.parse(request.headers.get('cookie') ?? '');
	// const { sessions } = await getDbCollections();

	if (accessToken) {
		try {
			jwt.verify(accessToken, import.meta.env.VITE_JWT_SECRET);
		} catch (e) {
			return false;
		}
	}

	console.log('->', accessToken, refreshToken);

	return false;
}

export default authenticate;
