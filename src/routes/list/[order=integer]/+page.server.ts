import { format } from 'date-fns';
import { redirect, error } from '@sveltejs/kit';
import { basics } from '$db/mongo';
import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';
import { translate } from '$lib/utils/api';
import { AppLanguage, DateFormat } from '$types/enums/Globals.enum';
import type { Beverage } from '$lib/templates/BeverageList/Beverage.d';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async ({ params }) => {
	const order = +params.order;

	if (!order || order === 1) {
		throw redirect(301, '/');
	}

	const skip = order * BEVERAGES_ON_PAGE - BEVERAGES_ON_PAGE;
	const total: number = await basics.countDocuments();

	if (skip > total) {
		throw error(404, 'Not found. List order is too high');
	}

	const beverages: Beverage[] = [];

	await basics
		.find()
		.sort({ added: -1 })
		.skip(skip)
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
		order,
		beverages,
		total
	};
};
