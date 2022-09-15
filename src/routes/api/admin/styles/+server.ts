import { json as json$1 } from '@sveltejs/kit';
import { getDbCollections } from '$lib/utils/api';
import type { RawStylesWithoutId } from '$lib/utils/types/api/RawStyles';

export async function POST({ locals, request }) {
	const styleData = await request.json();
	const { styles } = await getDbCollections();

	if (!locals.authenticated) {
		return json$1({
			message: 'Unauthorized. Cannot add style'
		}, {
			status: 401
		});
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

	throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
	// Suggestion (check for correctness before using):
	// return json$1(data);
	return { body: data };
}
