import { json as json$1 } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';

import { createSession, createTokens, getDbCollections } from '$lib/utils/api';

export async function POST({ request }) {
	const { email, password } = await request.json();
	const { users } = await getDbCollections();

	const user = await users.findOne({ email });

	if (!user) {
		return json$1({
			message: 'Authentication failed'
		}, {
			status: 401
		});
	}

	try {
		const isAuthorized = await bcrypt.compare(password, user.password);

		if (!isAuthorized) {
			return json$1({
				message: 'Authentication failed'
			}, {
				status: 401
			});
		}

		const sessionToken = await createSession({ userId: user._id.toString() });

		if (!sessionToken) {
			return json$1({
				message: 'Creating session failed'
			}, {
				status: 500
			});
		}

		const headers = createTokens(sessionToken, user._id.toString());

		return new Response(undefined, { headers: headers });
	} catch {
		return json$1({
			message: 'Decryption failed'
		}, {
			status: 500
		});
	}
}
