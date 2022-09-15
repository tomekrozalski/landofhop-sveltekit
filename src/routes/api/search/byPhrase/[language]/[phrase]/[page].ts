import { formatBeverageToBasics, getDbCollections } from '$lib/utils/api';
import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';
import type { Basics } from '$lib/utils/types/Beverage/Basics';

export async function get({ params }) {
	const { language, page, phrase } = params;
	const { beverages } = await getDbCollections();

	let total = 0;
	const foundArr: Basics[] = [];

	const query = {
		$or: [
			// FIND BY:
			// Name
			{
				'label.general.name.value': { $regex: new RegExp(phrase, 'i') }
			},
			// Brand name
			{
				'label.general.brand.name.value': {
					$regex: new RegExp(phrase, 'i')
				}
			},
			// Series (label / producer)
			{
				'label.general.series.value': {
					$regex: new RegExp(phrase, 'i')
				}
			},
			{
				'producer.general.series.value': {
					$regex: new RegExp(phrase, 'i')
				}
			},
			// Style (label / producer / editorial)
			{
				'label.brewing.style.value': {
					$regex: new RegExp(phrase, 'i')
				}
			},
			{
				'producer.brewing.style.value': {
					$regex: new RegExp(phrase, 'i')
				}
			},
			{
				'editorial.brewing.style.value': {
					$regex: new RegExp(phrase, 'i')
				}
			},
			// Barcode
			{ 'label.general.barcode': { $regex: new RegExp(phrase, 'i') } },
			// Tale (label / producer)
			{
				'label.general.tale.lead': { $regex: new RegExp(phrase, 'i') }
			},
			{
				'label.general.tale.article': {
					$regex: new RegExp(phrase, 'i')
				}
			},
			{
				'produder.general.tale.lead': {
					$regex: new RegExp(phrase, 'i')
				}
			},
			{
				'produder.general.tale.article': {
					$regex: new RegExp(phrase, 'i')
				}
			}
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
						...(page ? [{ $skip: +page * BEVERAGES_ON_PAGE - BEVERAGES_ON_PAGE }] : []),
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
