import { getDbCollections } from '$lib/utils/api';

export async function GET() {
	const { basics } = await getDbCollections();
	const total: number = await basics.count();

	return {
		body: total
	};
}
