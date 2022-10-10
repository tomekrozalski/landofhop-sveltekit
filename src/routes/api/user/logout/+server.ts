import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import { removeTokens } from '$lib/utils/api';
import { sessions } from '$db/mongo';

export const GET: RequestHandler = async function ({ cookies }) {
	if (!cookies.get('refreshToken')) {
		throw error(400, 'Already logged out');
	}

	try {
		const { sessionToken } = jwt.verify(cookies.get('refreshToken') ?? '', JWT_SECRET);
		await sessions.deleteOne({ sessionToken });
		removeTokens(cookies);

		return json({ message: 'Logged out successfully' });
	} catch {
		throw error(401, 'Logged out failed');
	}
};
