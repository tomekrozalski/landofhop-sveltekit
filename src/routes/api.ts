import db from '$lib/utils/db';

export async function get(request) {
	const { basics } = await db();
	const num = await basics.count();

	console.log('num', num);

	return {
		status: 200,
		body: {
			numb: num
		}
	};
}
