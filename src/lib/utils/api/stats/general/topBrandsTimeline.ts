import { add, format, isBefore, max, min } from 'date-fns';

import type { LanguageValue } from '$lib/utils/types/common/LanguageValue';
import type { TopBrandsTimelineBar } from '$lib/utils/types/stats/General';
import type { RawGeneralStats } from '$lib/utils/types/api/RawStats/RawGeneralStats';

export function getTopBrands(values: RawGeneralStats[]) {
	type AccType = {
		[name: string]: {
			amount: number;
			badge: string;
			shortId: string;
			name: LanguageValue;
		};
	};

	const accumulator = values.reduce(
		(acc: AccType, { brand }) => ({
			...acc,
			[brand.shortId]: {
				...brand,
				amount: acc[brand.shortId] ? acc[brand.shortId].amount + 1 : 1
			}
		}),
		{}
	);

	return Object.values(accumulator)
		.sort((a, b) => (a.amount < b.amount ? 1 : -1))
		.slice(0, 10);
}

export function topBrandsTimeline(values: RawData[]): TopBrandsTimelineBar[] {
	const domain: TopBrandsTimelineBar[] = [];
	const dates = values.map(({ added }) => new Date(added));
	const earliest = min(dates);
	const latest = max(dates);
	const endpoint = new Date(`${format(add(latest, { months: 1 }), 'yyyy-MM', {})}-01`);
	let current = earliest;

	const topBrands = getTopBrands(values);

	do {
		domain.push({
			date: format(current, 'yyyy-MM'),
			brands: topBrands.map(({ badge, name, shortId }) => ({
				amount: 0,
				badge,
				id: shortId,
				name
			}))
		});

		current = add(current, { months: 1 });
	} while (isBefore(current, endpoint));

	values.forEach(({ added, brand }) => {
		if (!topBrands.map(({ shortId }) => shortId).includes(brand.shortId)) {
			return false;
		}

		const index = domain.findIndex(({ date }) => date === format(new Date(added), 'yyyy-MM', {}));

		for (let i = index; i < domain.length; i += 1) {
			const selectedBrand = domain[i].brands.find(({ id }) => id === brand.shortId);

			if (selectedBrand) {
				selectedBrand.amount += 1;
			}
		}

		return true;
	});

	return domain;
}
