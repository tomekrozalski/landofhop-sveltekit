import { json } from '@sveltejs/kit';
import { getDbCollections } from '$lib/utils/api';

export async function GET() {
	const { basics } = await getDbCollections();
	const total: number = await basics.count();

	return json(total);
}
