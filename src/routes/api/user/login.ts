import bcrypt from 'bcryptjs';
import cookie from 'cookie';
import { add } from 'date-fns';
import jwt from 'jsonwebtoken';

import { createSession, getDbCollections } from '$lib/utils/api';

export async function post({ request }) {
	const { email, password } = await request.json();
	const { users } = await getDbCollections();

	const user = await users.findOne({ email });

	if (!user) {
		return {
			status: 401,
			body: 'Authentication failed'
		};
	}

	try {
		const isAuthorized = await bcrypt.compare(password, user.password);

		if (!isAuthorized) {
			return {
				status: 401,
				body: 'Authentication failed'
			};
		}

		const sessionToken = await createSession({ userId: user._id.toString() });

		if (!sessionToken) {
			return {
				status: 500,
				body: 'Creating session failed'
			};
		}

		const accessToken = jwt.sign(
			{ sessionToken, userId: user._id.toString() },
			import.meta.env.VITE_JWT_SECRET
		);

		const refreshToken = jwt.sign({ sessionToken }, import.meta.env.VITE_JWT_SECRET);

		return {
			headers: {
				'Set-Cookie': [
					cookie.serialize('accessToken', accessToken, {
						httpOnly: true,
						path: '/',
						sameSite: 'strict',
						secure: true
					}),
					cookie.serialize('refreshToken', refreshToken, {
						expires: add(new Date(), { weeks: 3 }),
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
			status: 500,
			body: 'Decryption failed'
		};
	}
}
