import cookie from 'cookie';
import { add } from 'date-fns';
import jwt from 'jsonwebtoken';

function createTokens(sessionToken: string, userId: string): { 'Set-Cookie': string[] } {
	const accessToken = jwt.sign({ sessionToken, userId }, import.meta.env.VITE_JWT_SECRET);
	const refreshToken = jwt.sign({ sessionToken }, import.meta.env.VITE_JWT_SECRET);

	return {
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
	};
}

export default createTokens;
