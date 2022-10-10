import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { detailsNormalizer } from '$lib/utils/api';
import type { LinkData } from '$lib/utils/types/Beverage/LinkData.d';
import type { Details } from '$lib/utils/types/Beverage/Details';
import countryList from '$lib/utils/api/countryList';
import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';
import type { RawBeverage } from '$lib/utils/types/api/RawBeverage/RawBeverage.d';
import { basics, beverages } from '$db/mongo';

export const GET: RequestHandler = async ({ params }) => {
	const { language, shortId } = params;

	const beverage: RawBeverage | null = await beverages.findOne({ shortId });

	if (!beverage) {
		return new Response(undefined, { status: 404 });
	}

	const formattedDetails: Details = detailsNormalizer(
		beverage,
		language,
		language === 'pl' ? countryList.pl : countryList.en
	);

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

	return json({
		listPage: Math.ceil((beveragesBefore + 1) / BEVERAGES_ON_PAGE),
		previous: previousBasics.length ? previousBasics[0] : null,
		details: formattedDetails,
		next: nextBasics.length ? nextBasics[0] : null
	});
};
