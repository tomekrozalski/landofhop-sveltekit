import { formatBeverageToBasics, getDbCollections } from '$lib/utils/api';
import type { Basics } from '$lib/utils/types/Beverage/Basics';

export async function post({ request }) {
	const advancedSearchData = await request.json();
	const { brands, ingredientTags, language, name, styleTags } = advancedSearchData;

	if (!language || (!brands?.length && !ingredientTags?.length && !name && !styleTags?.length)) {
		return { status: 400 };
	}

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

	await beverages
		.aggregate([
			{ $sort: { added: -1 } },
			{
				$match: {
					$and: [
						...(name
							? [
									{
										'label.general.name.value': { $regex: new RegExp(name, 'i') }
									}
							  ]
							: []),
						...(brands && brands.length
							? [
									{
										'label.general.brand.shortId': { $in: brands }
									}
							  ]
							: []),
						...(ingredientTags && ingredientTags.length
							? [
									{
										$or: [
											{
												'label.ingredients.tags.badge': { $in: ingredientTags }
											},
											{
												'producer.ingredients.tags.badge': { $in: ingredientTags }
											}
										]
									}
							  ]
							: []),
						...(styleTags && styleTags.length
							? [
									{
										'editorial.brewing.styleTags.badge': { $in: styleTags }
									}
							  ]
							: [])
					]
				}
			}
		])
		.forEach(formatBeverageToBasics(foundArr, language));

	return {
		body: foundArr
	};
}
