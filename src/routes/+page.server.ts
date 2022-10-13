import { format } from 'date-fns';
import { basics } from '$db/mongo';
import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';
import { translate } from '$lib/utils/api';
import { AppLanguage, DateFormat } from '$types/enums/Globals.enum';
import type { Beverage } from '$lib/templates/BeverageList/Beverage.d';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const total: number = await basics.countDocuments();
	const beverages: Beverage[] = [];

	await basics
		.find()
		.sort({ added: -1 })
		.limit(BEVERAGES_ON_PAGE)
		.forEach(({ added, badge, brand, containerType, coverImage, name, shortId }) => {
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
