import { format } from 'date-fns';

import { getDbCollections, translate } from '$lib/utils/api';
import { DateFormat } from '$lib/utils/enums/DateFormat.enum';
import type { RawBeverage } from '$lib/utils/types/api/RawBeverage/RawBeverage.d';
import type { Basics } from '$lib/utils/types/Beverage/Basics';

export async function get({ params }) {
	const { language, phrase } = params;
	const { beverages } = await getDbCollections();
	const ingredientSearch = phrase.split('ingredient:')[1] ?? null;
	const styleSearch = phrase.split('style:')[1] ?? null;

	const foundArr: Basics[] = [];

	function formatValues({ added, badge, editorial, label, shortId }: RawBeverage) {
		foundArr.push({
			added: format(new Date(added), DateFormat[language]),
			badge,
			brand: {
				badge: label.general.brand.badge,
				name: translate(label.general.brand.name, language)
			},
			containerType: label.container.type,
			...(editorial?.photos?.cover &&
				editorial?.photos?.outlines?.cover && {
					coverImage: {
						height: editorial.photos.cover.height,
						width: editorial.photos.cover.width,
						outline: editorial.photos.outlines.cover
					}
				}),
			name: translate(label.general.name, language),
			shortId
		});
	}

	if (ingredientSearch) {
		await beverages
			.find({
				$or: [
					{ 'label.ingredients.tags.badge': ingredientSearch },
					{ 'producer.ingredients.tags.badge': ingredientSearch }
				]
			})
			.sort({ _id: -1 })
			.forEach(formatValues);
	} else if (styleSearch) {
		await beverages
			.find({ 'editorial.brewing.styleTags.badge': styleSearch })
			.forEach(formatValues);
	} else {
		await beverages
			.aggregate([
				{ $sort: { added: -1 } },
				{
					$match: {
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
					}
				}
			])
			.forEach(formatValues);
	}

	return {
		body: foundArr
	};
}
