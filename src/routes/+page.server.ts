import { format } from 'date-fns';
import { basics } from '$db/mongo';
import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';
import { translate } from '$lib/utils/api';
import { AppLanguage } from '$lib/utils/enums/AppLanguage.enum';
import { DateFormat } from '$lib/utils/enums/DateFormat.enum';
import type { RawBasics } from '$types/api/RawBasics';
import type { Basics } from '$types/Beverage/Basics';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const total: number = await basics.countDocuments();
	const beverages: Basics[] = [];

	await basics
		.find()
		.sort({ added: -1 })
		.limit(BEVERAGES_ON_PAGE)
		.forEach(({ added, badge, brand, containerType, coverImage, name, shortId }: RawBasics) => {
			beverages.push({
				shortId,
				badge,
				brand: {
					...brand,
					name: translate(brand.name, AppLanguage.pl)
				},
				name: translate(name, AppLanguage.pl),
				...(coverImage && {
					coverImage: {
						height: coverImage.height,
						width: coverImage.width,
						outline: coverImage.outlines
					}
				}),
				containerType,
				added: format(new Date(added), DateFormat[AppLanguage.pl])
			});
		});

	return {
		beverages,
		total
	};
};
