import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';
import { formatBeverageToBasics, getDbCollections } from '$lib/utils/api';
import type { Basics } from '$lib/utils/types/Beverage/Basics';

export async function post({ request }) {
	const advancedSearchData = await request.json();
	const { brands, ingredientTags, language, name, page, styleTags } = advancedSearchData;

	if (!language || (!brands?.length && !ingredientTags?.length && !name && !styleTags?.length)) {
		return { status: 400 };
	}

	let total = 0;
	const foundArr: Basics[] = [];
	const { beverages, ingredients } = await getDbCollections();

	async function getCompleteIngredientTags() {
		const ingredientsDescendants = [];

		async function getDescendants(parent) {
			ingredientsDescendants.push(parent);
			const descendants = await ingredients.find({ parent }).toArray();

			for await (const { badge } of descendants) {
				ingredientsDescendants.push(badge);
				await getDescendants(badge);
			}
		}

		for await (const parent of ingredientTags) {
			await getDescendants(parent);
		}

		return ingredientsDescendants;
	}

	const completeIngredientTags =
		ingredientTags && ingredientTags.length ? await getCompleteIngredientTags() : null;

	const query = {
		$and: [
			...(name ? [{ 'label.general.name.value': { $regex: new RegExp(name, 'i') } }] : []),
			...(brands && brands.length ? [{ 'label.general.brand.shortId': { $in: brands } }] : []),
			...(completeIngredientTags
				? [
						{
							$or: [
								{ 'label.ingredients.tags.badge': { $in: completeIngredientTags } },
								{ 'producer.ingredients.tags.badge': { $in: completeIngredientTags } }
							]
						}
				  ]
				: []),
			...(styleTags && styleTags.length
				? [{ 'editorial.brewing.styleTags.badge': { $in: styleTags } }]
				: [])
		]
	};

	await beverages
		.aggregate([
			{
				$facet: {
					count: [{ $match: query }, { $count: 'count' }],
					values: [
						{ $sort: { added: -1 } },
						{ $match: query },
						...(page ? [{ $skip: page * BEVERAGES_ON_PAGE - BEVERAGES_ON_PAGE }] : []),
						{ $limit: BEVERAGES_ON_PAGE }
					]
				}
			}
		])
		.forEach((data) => {
			total = data.count[0]?.count ?? 0;
			return data.values.forEach(formatBeverageToBasics(foundArr, language));
		});

	return {
		body: {
			beverages: foundArr,
			total
		}
	};
}
