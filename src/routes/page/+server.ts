import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { basics } from '$db/mongo';

export const GET: RequestHandler = async () => {
	const total: number = await basics.count();

	return json(total);
};
