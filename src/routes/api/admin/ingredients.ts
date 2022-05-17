import { authenticate, getDbCollections, recalculateIngredientsOccurrences } from '$lib/utils/api';
import type { RawIngredientWithoutId } from '$lib/utils/types/api/RawIngredient';

export async function post({ request }) {
	const ingredientData = await request.json();
	const { ingredients } = await getDbCollections();
	const [isAuthenticated, headers] = await authenticate(request);

	if (!isAuthenticated) {
		return {
			status: 401,
			body: {
				message: 'Unauthorized. Cannot add ingredient'
			}
		};
	}

	await ingredients.insertOne(ingredientData);

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

	return {
		headers,
		body: data
	};
}

export async function put({ request }) {
	const [isAuthenticated, headers] = await authenticate(request);

	if (!isAuthenticated) {
		return {
			status: 401,
			body: {
				message: 'Unauthorized. Cannot add ingredient'
			}
		};
	}

	const { beverages, ingredients } = await getDbCollections();

	const ingredientData = await request.json();
	const { initial, ...rest } = ingredientData;
	await ingredients.updateOne({ badge: initial }, { $set: rest });

	await beverages.updateMany(
		{ 'label.ingredients.tags': { $elemMatch: { badge: initial } } },
		{
			$set: {
				'label.ingredients.tags.$': {
					badge: ingredientData.badge,
					name: ingredientData.name,
					type: ingredientData.type
				}
			}
		}
	);

	await beverages.updateMany(
		{ 'producer.ingredients.tags': { $elemMatch: { badge: initial } } },
		{
			$set: {
				'producer.ingredients.tags.$': {
					badge: ingredientData.badge,
					name: ingredientData.name,
					type: ingredientData.type
				}
			}
		}
	);

	await recalculateIngredientsOccurrences();

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

	return {
		headers,
		body: data
	};
}
