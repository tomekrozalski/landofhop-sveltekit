import { json } from '@sveltejs/kit';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { format } from 'date-fns';
import { getDbCollections, translate } from '$lib/utils/api';
import { DateFormat } from '$lib/utils/enums/DateFormat.enum';
import type { RawBasics } from '$lib/utils/types/api/RawBasics';
import type { Basics } from '$lib/utils/types/Beverage/Basics';

export async function GET({ params }) {
	const { language, limit, skip } = params;
	const { basics } = await getDbCollections();
	const translatedValues: Basics[] = [];

	await basics
		.find()
		.sort({ added: -1 })
		.skip(+skip)
		.limit(+limit)
		.forEach(({ added, badge, brand, containerType, coverImage, name, shortId }: RawBasics) => {
			translatedValues.push({
				shortId,
				badge,
				brand: {
					...brand,
					name: translate(brand.name, language)
				},
				name: translate(name, language),
				...(coverImage && {
					coverImage: {
						height: coverImage.height,
						width: coverImage.width,
						outline: coverImage.outlines
					}
				}),
				containerType,
				added: format(new Date(added), DateFormat[language])
			});
		});

	throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
	// Suggestion (check for correctness before using):
	// return json(translatedValues);
	return {
		body: translatedValues
	};
}
