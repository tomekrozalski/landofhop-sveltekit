import bcrypt from 'bcryptjs';

import { createSession, createTokens, getDbCollections } from '$lib/utils/api';

export async function POST({ request }) {
	const { email, password } = await request.json();
	const { users } = await getDbCollections();

	const user = await users.findOne({ email });

	if (!user) {
		return {
			status: 401,
			body: {
				message: 'Authentication failed'
			}
		};
	}

	try {
		const isAuthorized = await bcrypt.compare(password, user.password);

		if (!isAuthorized) {
			return {
				status: 401,
				body: {
					message: 'Authentication failed'
				}
			};
		}

		const sessionToken = await createSession({ userId: user._id.toString() });

		if (!sessionToken) {
			return {
				status: 500,
				body: {
					message: 'Creating session failed'
				}
			};
		}

		const headers = createTokens(sessionToken, user._id.toString());

		return { headers };
	} catch {
		return {
			status: 500,
			body: {
				message: 'Decryption failed'
			}
		};
	}
}
