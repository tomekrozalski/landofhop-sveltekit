import { authenticate, getDbCollections } from '$lib/utils/api';
import type { RawIngredientWithoutId } from '$lib/utils/types/api/RawIngredient';

export async function get({ request }) {
	const { ingredients } = await getDbCollections();
	const [isAuthenticated, headers] = await authenticate(request);

	if (!isAuthenticated) {
		return {
			status: 401,
			body: {
				message: 'Unauthorized. List of ingredients cannot be sent'
			}
		};
	}

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

	const { ingredients } = await getDbCollections();

	const ingredientData = await request.json();
	const { initial, ...rest } = ingredientData;
	await ingredients.updateOne({ badge: initial }, { $set: rest });

	console.log('->', ingredientData);

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
