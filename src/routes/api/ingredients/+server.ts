import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { getDbCollections } from '$lib/utils/api';
import type { RawIngredientWithoutId } from '$lib/utils/types/api/RawIngredient';

export const GET: RequestHandler = async () => {
	const { ingredients } = await getDbCollections();

	const data: RawIngredientWithoutId[] = await ingredients
		.find(
			{},
			{
				projection: {
					_id: 0,
					badge: 1,
					name: 1,
					occurrences: 1,
					parent: 1,
					type: 1
				}
			}
		)
		.toArray();

	return json(data);
};
