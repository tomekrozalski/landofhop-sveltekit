import {
	AuthenticationDetails,
	CognitoUser,
	CognitoUserPool,
	CognitoAccessToken,
	CognitoRefreshToken,
	CognitoUserSession
} from 'amazon-cognito-identity-js';
import { serialize } from 'cookie';

const poolData = {
	UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID as string,
	ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID as string
};

export async function post(request) {
	const { tokens } = request.body;

	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const data: any = await new Promise(function (resolve, reject) {
			const AccessToken = new CognitoAccessToken({ AccessToken: tokens.access });
			const RefreshToken = new CognitoRefreshToken({ RefreshToken: tokens.refresh });

			const UserPool = new CognitoUserPool(poolData);
			const a = UserPool.getCurrentUser().authenticateUser(AccessToken, () => {});

			console.log({ a });

			const sessionData = {
				AccessToken,
				RefreshToken
			};

			const userSession = new CognitoUserSession(sessionData);

			console.log('userSession', userSession);

			if (userSession) {
				resolve(userSession);
			} else {
				reject();
			}
		});

		return {
			status: 200,
			body: {
				data
			}
		};
	} catch (err) {
		return {
			status: 500,
			body: { err }
		};
	}
}
