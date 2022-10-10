import { add } from 'date-fns';
import jwt from 'jsonwebtoken';
import type { Cookies } from '@sveltejs/kit';
import { JWT_SECRET } from '$env/static/private';

type generateTokensTypes = {
	cookies: Cookies;
	sessionToken: string;
	userId: string;
};

export function generateTokens({ cookies, sessionToken, userId }: generateTokensTypes) {
	const accessToken = jwt.sign({ sessionToken, userId }, JWT_SECRET);
	const refreshToken = jwt.sign({ sessionToken }, JWT_SECRET);

	cookies.set('accessToken', accessToken, {
		httpOnly: true,
		path: '/',
		sameSite: 'strict',
		secure: true
	});

	cookies.set('refreshToken', refreshToken, {
		expires: add(new Date(), { weeks: 3 }),
		httpOnly: true,
		path: '/',
		sameSite: 'strict',
		secure: true
	});
}

export function removeTokens(cookies: Cookies) {
	cookies.set('accessToken', 'deleted', {
		expires: new Date(0),
		httpOnly: true,
		path: '/',
		sameSite: 'strict',
		secure: true
	});

	cookies.set('refreshToken', 'deleted', {
		expires: new Date(0),
		httpOnly: true,
		path: '/',
		sameSite: 'strict',
		secure: true
	});
}
