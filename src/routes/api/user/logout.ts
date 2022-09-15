import cookie from 'cookie';
import jwt from 'jsonwebtoken';

import { getDbCollections } from '$lib/utils/api';

export async function GET({ request }) {
	const cookies = cookie.parse(request.headers.get('cookie') ?? '');

	if (!cookies.refreshToken) {
		return {
			status: 200,
			body: {
				message: 'Already logged out'
			}
		};
	}

	try {
		const { sessionToken } = jwt.verify(cookies.refreshToken, import.meta.env.VITE_JWT_SECRET);
		const { sessions } = await getDbCollections();
		await sessions.deleteOne({ sessionToken });

		return {
			headers: {
				'Set-Cookie': [
					cookie.serialize('accessToken', 'deleted', {
						expires: new Date(0),
						httpOnly: true,
						path: '/',
						sameSite: 'strict',
						secure: true
					}),
					cookie.serialize('refreshToken', 'deleted', {
						expires: new Date(0),
						httpOnly: true,
						path: '/',
						sameSite: 'strict',
						secure: true
					})
				]
			}
		};
	} catch {
		return {
			status: 401,
			body: {
				message: 'Log out failed'
			}
		};
	}
}
