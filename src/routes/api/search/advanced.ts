import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';
import { formatBeverageToBasics, getDbCollections } from '$lib/utils/api';
import type { Basics } from '$lib/utils/types/Beverage/Basics';

export async function post({ request }) {
	const advancedSearchData = await request.json();
	const { brands, ingredientTags, language, name, styleTags } = advancedSearchData;

	if (!language || (!brands?.length && !ingredientTags?.length && !name && !styleTags?.length)) {
		return { status: 400 };
	}

	let count = 0;
	const foundArr: Basics[] = [];
	const { beverages } = await getDbCollections();

	async function wait() {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(true);
			}, 2000);
		});
	}

	await wait();

	const query = {
		$and: [
			...(name ? [{ 'label.general.name.value': { $regex: new RegExp(name, 'i') } }] : []),
			...(brands && brands.length ? [{ 'label.general.brand.shortId': { $in: brands } }] : []),
			...(ingredientTags && ingredientTags.length
				? [
						{
							$or: [
								{ 'label.ingredients.tags.badge': { $in: ingredientTags } },
								{ 'producer.ingredients.tags.badge': { $in: ingredientTags } }
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
					values: [{ $sort: { added: -1 } }, { $match: query }, { $limit: BEVERAGES_ON_PAGE }]
				}
			}
		])
		.forEach((data) => {
			count = data.count[0]?.count ?? 0;
			return data.values.forEach(formatBeverageToBasics(foundArr, language));
		});

	return {
		body: {
			beverages: foundArr,
			count
		}
	};
}
