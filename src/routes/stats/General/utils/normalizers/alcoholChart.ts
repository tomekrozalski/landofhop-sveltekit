import { isNumber, round } from 'lodash-es';

import type { AlcoholChartBar } from '$types/stats/General';
import type { RawGeneralStats } from '$types/api/RawStats/RawGeneralStats';

export function alcoholChart(values: RawGeneralStats[]): AlcoholChartBar[] {
	const alcoholValues = values
		.map(({ alcohol }) => {
			const label = alcohol?.label?.value;

			if (isNumber(label)) {
				return label;
			}

			const producer = alcohol?.producer?.value;

			if (isNumber(producer)) {
				return producer;
			}

			return false;
		})
		.filter((val) => isNumber(val)) as number[];

	const domain: AlcoholChartBar[] = [];
	const max = Math.max(...alcoholValues) + 1;

	for (let value = 0; value <= max; value = round(value + 0.1, 1)) {
		domain.push({
			beverages: 0,
			value
		});
	}

	alcoholValues.forEach((alcohol) => {
		const match = domain.find(({ value }) => value === alcohol);

		if (match && isNumber(match.beverages)) {
			match.beverages += 1;
		}
	});

	return domain;
}
