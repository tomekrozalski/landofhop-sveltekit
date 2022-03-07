import cookie from 'cookie';
import * as jwt from 'jsonwebtoken';

import { createTokens, getDbCollections, updateSession } from '$lib/utils/api';

async function authenticate(request): Promise<[boolean, { 'Set-Cookie': string[] } | null]> {
	const { accessToken, refreshToken } = cookie.parse(request.headers.get('cookie') ?? '');
	const { sessions } = await getDbCollections();

	if (!accessToken && !refreshToken) {
		return [false, null];
	}

	if (accessToken) {
		try {
			const payload = jwt.verify(accessToken, import.meta.env.VITE_JWT_SECRET);

			const session = await sessions.findOne({
				sessionToken: payload.sessionToken,
				userId: payload.userId
			});

			return [session?.valid, null];
		} catch (e) {
			return [false, null];
		}
	}

	if (refreshToken) {
		try {
			const payload = jwt.verify(refreshToken, import.meta.env.VITE_JWT_SECRET);

			const session = await sessions.findOne({
				sessionToken: payload.sessionToken
			});

			if (!session?.valid) {
				return [false, null];
			}

			const newSessionToken = await updateSession(session.sessionToken);
			const headers = createTokens(newSessionToken, session._id.toString());

			return [true, headers];
		} catch (e) {
			return [false, null];
		}
	}

	return [false, null];
}

export default authenticate;
