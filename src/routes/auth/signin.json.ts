import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
	UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID as string,
	ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID as string
};

export async function post({ body }) {
	const { email, password } = JSON.parse(body);
	const UserPool = new CognitoUserPool(poolData);

	await UserPool.signUp(email, password, [], null, (err, data) => {
		if (err) {
			return {
				status: 500,
				body: err
			};
		}

		return {
			status: 200,
			body: data
		};
	});
}
