import { get } from 'svelte/store';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { getDbCollections } from '$lib/utils/api';
import type { RawStylesWithoutId } from '$lib/utils/types/api/RawStyles';
import authentication from '$lib/utils/stores/authentication';

export const POST: RequestHandler = async ({ request }) => {
	const styleData = await request.json();
	const { styles } = await getDbCollections();

	if (!get(authentication).isLoggedIn) {
		throw error(401, 'Unauthorized. Cannot add style');
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
};
