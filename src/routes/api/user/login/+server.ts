import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';

import { createSession, generateTokens, getDbCollections } from '$lib/utils/api';

export const POST: RequestHandler = async function ({ cookies, request }) {
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

		generateTokens({
			cookies,
			sessionToken,
			userId: user._id.toString()
		});

		return json({ message: 'Logged in successfully' });
	} catch {
		throw error(500, 'Decryption failed');
	}
};
