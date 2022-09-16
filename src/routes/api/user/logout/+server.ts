import { json } from '@sveltejs/kit';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

import { getDbCollections } from '$lib/utils/api';

export async function GET({ request }) {
	const cookies = cookie.parse(request.headers.get('cookie') ?? '');

	if (!cookies.refreshToken) {
		return json({
			message: 'Already logged out'
		});
	}

	try {
		const { sessionToken } = jwt.verify(cookies.refreshToken, import.meta.env.VITE_JWT_SECRET);
		const { sessions } = await getDbCollections();
		await sessions.deleteOne({ sessionToken });

		return new Response(JSON.stringify({ test: true }), {
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
				].join(',')
			}
		});
	} catch {
		return json(
			{
				message: 'Log out failed'
			},
			{
				status: 401
			}
		);
	}
}
