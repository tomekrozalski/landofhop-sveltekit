import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { beverages } from '$db/mongo';
import { formatBeveragesToBasics } from '$lib/utils/api';
import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';
import type { Basics } from '$lib/templates/BeverageList/Basics.d';
import { AppLanguage } from '$types/enums/Globals.enum';

export const GET: RequestHandler = async ({ params }) => {
	const language = (params.language as AppLanguage) ?? AppLanguage.pl;
	const page = params.page ?? 1;
	const phrase = params.phrase ?? '';

	let total = 0;

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

	let foundArr: Basics[] = [];

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
			foundArr = formatBeveragesToBasics(data.values, language);
		});

	return json({
		beverages: foundArr,
		total
	});
};
