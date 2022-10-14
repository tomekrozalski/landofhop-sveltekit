import { add, format, isBefore, max, min } from 'date-fns';

import type { LanguageValue } from '$types/common/LanguageValue';
import type { Brand, TopBrandsTimelineBar } from '$types/stats/General';
import type { RawGeneralStats } from '$types/api/RawStats/RawGeneralStats';

export function getTopBrands(values: RawGeneralStats[], skip = 0, limit = 10): Brand[] {
	type AccType = {
		[name: string]: {
			amount: number;
			badge: string;
			id: string;
			name: LanguageValue;
		};
	};

	const accumulator = values.reduce(
		(acc: AccType, { brand }) => ({
			...acc,
			[brand.shortId]: {
				amount: acc[brand.shortId] ? acc[brand.shortId].amount + 1 : 1,
				badge: brand.badge,
				id: brand.shortId,
				name: brand.name
			}
		}),
		{}
	);

	return Object.values(accumulator)
		.sort((a, b) => (a.amount < b.amount ? 1 : -1))
		.slice(skip, skip + limit);
}

export function topBrandsTimeline(values: RawGeneralStats[]): TopBrandsTimelineBar[] {
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
			brands: topBrands.map(({ badge, id, name }) => ({
				amount: 0,
				badge,
				id,
				name
			}))
		});

		current = add(current, { months: 1 });
	} while (isBefore(current, endpoint));

	values.forEach(({ added, brand }) => {
		if (!topBrands.map(({ id }) => id).includes(brand.shortId)) {
			return false;
		}

		const index = domain.findIndex(({ date }) => date === format(new Date(added), 'yyyy-MM'));

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
