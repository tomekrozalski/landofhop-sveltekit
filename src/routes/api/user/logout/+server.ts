import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

import { getDbCollections, removeTokens } from '$lib/utils/api';

export const GET: RequestHandler = async function ({ cookies }) {
	if (!cookies.get('refreshToken')) {
		throw error(400, 'Already logged out');
	}

	try {
		const { sessionToken } = jwt.verify(
			cookies.get('refreshToken'),
			import.meta.env.VITE_JWT_SECRET
		);
		const { sessions } = await getDbCollections();
		await sessions.deleteOne({ sessionToken });
		removeTokens(cookies);

		return json({ message: 'Logged out successfully' });
	} catch {
		throw error(401, 'Logged out failed');
	}
};
