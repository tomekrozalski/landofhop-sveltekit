import { getDbCollections } from '$lib/utils/api';
import type { RawStylesWithoutId } from '$lib/utils/types/api/RawStyles';

export async function post({ locals, request }) {
	const styleData = await request.json();
	const { styles } = await getDbCollections();

	if (!locals.authenticated) {
		return {
			status: 401,
			body: {
				message: 'Unauthorized. Cannot add style'
			}
		};
	}

	await styles.insertOne(styleData);

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
