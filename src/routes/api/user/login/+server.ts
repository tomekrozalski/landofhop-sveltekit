import { error, json, HeadersInit } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';

import { createSession, createTokens, getDbCollections } from '$lib/utils/api';

export async function POST({ request }) {
	const { email, password } = await request.json();
	const { users } = await getDbCollections();

	const user = await users.findOne({ email });

	if (!user) {
		throw error(401, 'Authentication failed');
	}

	try {
		const isAuthorized = await bcrypt.compare(password, user.password);

		if (!isAuthorized) {
			throw error(401, 'Authentication failed');
		}

		const sessionToken = await createSession({ userId: user._id.toString() });

		if (!sessionToken) {
			throw error(500, 'Creating session failed');
		}

		const headers = createTokens(sessionToken, user._id.toString());

		// console.log('headers', headers);

		return new Response(JSON.stringify({ test: true }), { headers });
	} catch {
		throw error(500, 'Decryption failed');
	}
}
