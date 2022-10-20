import { isNumber, round } from 'lodash-es';
import type { RatingsChartBar } from './Output.d';
import type { RawGeneralStats } from './RawGeneralStats.d';

export function ratingsChart(values: RawGeneralStats[]): RatingsChartBar[] {
	const domain: RatingsChartBar[] = [];

	for (let value = 1; value <= 5; value = round(value + 0.1, 1)) {
		domain.push({
			beverages: 0,
			value
		});
	}

	values
		.map(({ ratings }) => ratings)
		.filter((value) => isNumber(value))
		.forEach((rating) => {
			const match = domain.find(({ value }) => value === Number(rating.toFixed(1)));

			if (match && isNumber(match.beverages)) {
				match.beverages += 1;
			}
		});

	return domain;
}
