import { getDbCollections } from '$lib/utils/api';

export async function get() {
	const { basics } = await getDbCollections();
	const total: number = await basics.count();

	return {
		body: total
	};
}
