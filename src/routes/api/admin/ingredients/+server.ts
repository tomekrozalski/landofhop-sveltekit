import { get } from 'svelte/store';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { recalculateIngredientsOccurrences } from '$lib/utils/api';
import authentication from '$lib/utils/stores/authentication';
import type { RawIngredient } from '$types/RawIngredient';
import { beverages, ingredients } from '$db/mongo';

export const POST: RequestHandler = async ({ request }) => {
	const ingredientData = await request.json();

	if (!get(authentication).isLoggedIn) {
		throw error(401, 'Unauthorized. Cannot add ingredient');
	}

	await ingredients.insertOne(ingredientData);

	const data: RawIngredient[] = await ingredients
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

export const PUT: RequestHandler = async ({ request }) => {
	if (!get(authentication).isLoggedIn) {
		throw error(401, 'Unauthorized. Cannot update ingredient');
	}

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

	const data: RawIngredient[] = await ingredients
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
