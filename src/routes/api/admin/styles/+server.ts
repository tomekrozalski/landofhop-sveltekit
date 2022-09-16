import { json } from '@sveltejs/kit';
import { getDbCollections } from '$lib/utils/api';
import type { RawStylesWithoutId } from '$lib/utils/types/api/RawStyles';

export async function POST({ locals, request }) {
	const styleData = await request.json();
	const { styles } = await getDbCollections();

	if (!locals.authenticated) {
		return json(
			{
				message: 'Unauthorized. Cannot add style'
			},
			{
				status: 401
			}
		);
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

	return json(data);
}
