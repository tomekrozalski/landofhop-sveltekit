import { formatBeverageToBasics, getDbCollections } from '$lib/utils/api';
import type { Basics } from '$lib/utils/types/Beverage/Basics';

export async function post({ request }) {
	const advancedSearchData = await request.json();
	const { brands, language, name } = advancedSearchData;

	if (!language || (!name && !brands?.length)) {
		return { status: 400 };
	}

	const foundArr: Basics[] = [];
	const { beverages } = await getDbCollections();

	console.log('advancedSearchData', advancedSearchData);

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
						// FIND BY:
						// Name
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
							: [])

						// Brand name
						// {
						// 	'label.general.brand.name.value': {
						// 		$regex: new RegExp(phrase, 'i')
						// 	}
						// },
						// Style (label / producer / editorial)
						// {
						// 	'label.brewing.style.value': {
						// 		$regex: new RegExp(phrase, 'i')
						// 	}
						// },
						// {
						// 	'producer.brewing.style.value': {
						// 		$regex: new RegExp(phrase, 'i')
						// 	}
						// },
						// {
						// 	'editorial.brewing.style.value': {
						// 		$regex: new RegExp(phrase, 'i')
						// 	}
						// }
					]
				}
			}
		])
		.forEach(formatBeverageToBasics(foundArr, language));

	return {
		body: foundArr
	};
}
