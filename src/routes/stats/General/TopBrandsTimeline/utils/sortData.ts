import type { Brand, TopBrandsTimelineBar } from '$lib/utils/types/stats/General';

function checkTrend(
	months: TopBrandsTimelineBar[],
	a: Brand,
	b: Brand,
	monthIndex: number
): 1 | -1 {
	/* Check a and b in previous month */
	const values: { [id: string]: { amount: number } } = months[monthIndex].brands
		.filter(({ id }) => [a.id, b.id].includes(id))
		.reduce((acc, { id, ...rest }) => ({ ...acc, [id]: rest }), {});

	const sign = Math.sign(values[a.id].amount - values[b.id].amount);

	/*
	 * if a was bigger than b, move it upfront: 1
	 * if a was lower than b, move it backward: -1
	 * so if a was lower than b and now a quals b
	 * the trend is upward - so we should show it before
	 * as higher, so move it backward: -1
	 */

	switch (sign) {
		case 1:
			return 1;
		case -1:
			return -1;
		default:
			return checkTrend(months, a, b, monthIndex - 1);
	}
}

function sortData(months: TopBrandsTimelineBar[]): Brand[] {
	const monthIndex = months.length - 1;

	/* Sort brands, by last month */
	return months[monthIndex].brands.sort((a, b) => {
		const sign = Math.sign(a.amount - b.amount);

		switch (sign) {
			case 1:
				return -1;
			case -1:
				return 1;
			default:
				return checkTrend(months, a, b, monthIndex - 1);
		}
	});
}

export default sortData;
