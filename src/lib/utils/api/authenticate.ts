import * as jwt from 'jsonwebtoken';
import type { Cookies } from '@sveltejs/kit';
import { generateTokens, getDbCollections, updateSession } from '$lib/utils/api';

async function authenticate(cookies: Cookies): Promise<boolean> {
	const accessToken = cookies.get('accessToken');
	const refreshToken = cookies.get('refreshToken');

	const { sessions } = await getDbCollections();

	if (!accessToken && !refreshToken) {
		return false;
	}

	if (accessToken) {
		try {
			const payload = jwt.verify(accessToken, import.meta.env.VITE_JWT_SECRET);

			const session = await sessions.findOne({
				sessionToken: payload.sessionToken,
				userId: payload.userId
			});

			return session?.valid;
		} catch (e) {
			return false;
		}
	}

	if (refreshToken) {
		try {
			const payload = jwt.verify(refreshToken, import.meta.env.VITE_JWT_SECRET);

			const session = await sessions.findOne({
				sessionToken: payload.sessionToken
			});

			if (!session?.valid) {
				return false;
			}

			const newSessionToken = await updateSession(session.sessionToken);

			generateTokens({
				cookies,
				sessionToken: newSessionToken,
				userId: session.userId.toString()
			});

			return true;
		} catch (e) {
			return false;
		}
	}

	return false;
}

export default authenticate;
