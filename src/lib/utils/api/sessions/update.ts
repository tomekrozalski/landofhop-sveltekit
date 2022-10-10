import { randomBytes } from 'crypto';
import { sessions } from '$db/mongo';

async function update(sessionToken: string) {
	try {
		const newSessionToken = randomBytes(43).toString('hex');

		await sessions.updateOne(
			{ sessionToken },
			{
				$set: {
					ip: '127.0.0.1', // @ToDo: SvelteKit will allow to get IP: https://github.com/sveltejs/kit/pull/3993
					sessionToken: newSessionToken,
					updatedAt: new Date(),
					userAgent:
						'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:96.0) Gecko/20100101 Firefox/96.0', // @ToDo: SvelteKit will allow to get userAgent
					valid: true
				}
			}
		);

		return newSessionToken;
	} catch (err) {
		throw new Error('Session update failed');
	}
}

export default update;
