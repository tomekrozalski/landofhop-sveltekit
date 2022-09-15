import { detailsNormalizer, getDbCollections } from '$lib/utils/api';
import type { LinkData } from '$lib/utils/types/Beverage/LinkData.d';
import type { Details } from '$lib/utils/types/Beverage/Details';
import countryList from '$lib/utils/api/countryList';
import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';
import type { RawBeverage } from '$lib/utils/types/api/RawBeverage/RawBeverage.d';

export async function GET({ params }) {
	const { language, shortId } = params;
	const { basics, beverages } = await getDbCollections();

	const beverage: RawBeverage = await beverages.findOne({ shortId });

	if (!beverage) {
		return { status: 404 };
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

	return {
		body: {
			listPage: Math.ceil((beveragesBefore + 1) / BEVERAGES_ON_PAGE),
			previous: previousBasics.length ? previousBasics[0] : null,
			details: formattedDetails,
			next: nextBasics.length ? nextBasics[0] : null
		}
	};
}
