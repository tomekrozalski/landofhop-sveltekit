import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { getDbCollections } from '$lib/utils/api';

export const GET: RequestHandler = async () => {
	const { basics } = await getDbCollections();
	const total: number = await basics.count();

	return json(total);
};
