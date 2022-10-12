import { format } from 'date-fns';
import { basics } from '$db/mongo';
import { APP_LANGUAGE, BEVERAGES_ON_PAGE, DATE_FORMAT } from '$constants';
import { translate } from '$lib/utils/api';
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
					name: translate(brand.name, APP_LANGUAGE.PL)
				},
				name: translate(name, APP_LANGUAGE.PL),
				...(coverImage && {
					coverImage: {
						height: coverImage.height,
						width: coverImage.width,
						outline: coverImage.outlines
					}
				}),
				containerType,
				added: format(new Date(added), DATE_FORMAT.PL)
			});
		});

	return {
		beverages,
		total
	};
};
