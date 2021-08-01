import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { serialize } from 'cookie';

const poolData = {
	UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID as string,
	ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID as string
};

export async function post(request) {
	const { email, password } = JSON.parse(request.body);
	const UserPool = new CognitoUserPool(poolData);

	const user = new CognitoUser({
		Username: email,
		Pool: UserPool
	});

	const authDetails = new AuthenticationDetails({
		Username: email,
		Password: password
	});

	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const data: any = await new Promise(function (resolve, reject) {
			user.authenticateUser(authDetails, {
				onSuccess: resolve,
				onFailure: reject
			});
		});

		if (data) {
			const accessToken = data.getAccessToken().getJwtToken();
			const refreshToken = data.getRefreshToken().getToken();

			return {
				headers: {
					'set-cookie': [
						serialize('accessToken', accessToken, {
							path: '/',
							domain: process.env.DOMAIN,
							httpOnly: true,
							secure: process.env.NODE_ENV === 'production'
						}),
						serialize('refreshToken', refreshToken, {
							path: '/',
							domain: process.env.DOMAIN,
							httpOnly: true,
							maxAge: 60 * 60 * 24 * 7, // 1 week
							secure: process.env.NODE_ENV === 'production'
						})
					]
				},
				status: 200,
				body: { message: 'Successfully logged in' }
			};
		}
	} catch (err) {
		return {
			status: 500,
			body: err
		};
	}
}
