import { getDbCollections } from '$lib/utils/api';
import type { RawStylesWithoutId } from '$lib/utils/types/api/RawStyles';

export async function get() {
	const { styles } = await getDbCollections();

	const data: RawStylesWithoutId[] = await styles
		.find(
			{},
			{
				projection: {
					_id: 0,
					badge: 1,
					name: 1,
					group: 1
				}
			}
		)
		.toArray();

	return { body: data };
}
