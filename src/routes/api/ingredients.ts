import { getDbCollections } from '$lib/utils/api';
import type { RawIngredientWithoutId } from '$lib/utils/types/api/RawIngredient';

export async function GET() {
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

	return { body: data };
}
