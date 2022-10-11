import { error } from '@sveltejs/kit';
import { basics, beverages } from '$db/mongo';
import { AppLanguage } from '$lib/utils/enums/AppLanguage.enum';
import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';
import type { LinkData } from '$types/Beverage/LinkData.d';
import type { Details } from '$types/Beverage/Details';
import type { RawBeverage } from '$types/api/RawBeverage/RawBeverage.d';
import detailsNormalizer from './utils/detailsNormalizer';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { shortId } = params;
	const language = AppLanguage.pl;

	const beverage: RawBeverage | null = await beverages.findOne({ shortId });

	if (!beverage) {
		throw error(404);
	}

	const formattedDetails: Details = detailsNormalizer(beverage, language);

	const previousBasics: LinkData[] = [];
	const nextBasics: LinkData[] = [];

	const beveragesBefore = await basics.find({ added: { $gt: beverage.added } }).count();

	await basics
		.find({ added: { $lt: beverage.added } })
		.sort({ added: -1 })
		.limit(1)
		.forEach(({ badge, brand, shortId }) => {
			previousBasics.push({
				badge,
				brand: brand.badge,
				shortId
			});
		});

	await basics
		.find({ added: { $gt: beverage.added } })
		.sort({ added: 1 })
		.limit(1)
		.forEach(({ badge, brand, shortId }) => {
			nextBasics.push({
				badge,
				brand: brand.badge,
				shortId
			});
		});

	return {
		listPage: Math.ceil((beveragesBefore + 1) / BEVERAGES_ON_PAGE),
		previous: previousBasics.length ? previousBasics[0] : null,
		details: formattedDetails,
		next: nextBasics.length ? nextBasics[0] : null
	};
};
