import { json as json$1 } from '@sveltejs/kit';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

import { getDbCollections } from '$lib/utils/api';

export async function GET({ request }) {
	const cookies = cookie.parse(request.headers.get('cookie') ?? '');

	if (!cookies.refreshToken) {
		return json$1({
			message: 'Already logged out'
		});
	}

	try {
		const { sessionToken } = jwt.verify(cookies.refreshToken, import.meta.env.VITE_JWT_SECRET);
		const { sessions } = await getDbCollections();
		await sessions.deleteOne({ sessionToken });

		throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
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
		return json$1({
			message: 'Log out failed'
		}, {
			status: 401
		});
	}
}
