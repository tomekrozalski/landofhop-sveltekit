import { beverages } from '$db/mongo';
import { deleteIfEmpty, translate } from '$lib/utils/api';
import { AppLanguage } from '$types/enums/Globals.enum';
import normalizer from './General/utils/normalizers';
import type { RawGeneralStats } from './General/utils/normalizers/RawGeneralStats.d';

export const prerender = true;

export const load = async () => {
	const language = AppLanguage.pl;
	const rawData: RawGeneralStats[] = [];

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function formatValue(obj: any) {
		if (obj) {
			return {
				...obj,
				value: +obj.value
			};
		}

		return obj;
	}

	await beverages
		.find(
			{},
			{
				projection: {
					_id: 0,
					shortId: 1,
					'label.general.brand': 1,
					'label.brewing.fermentation': 1,
					'producer.brewing.fermentation': 1,
					'editorial.brewing.fermentation': 1,
					'label.brewing.extract': 1,
					'producer.brewing.extract': 1,
					'label.brewing.alcohol': 1,
					'producer.brewing.alcohol': 1,
					'editorial.brewing.alcohol': 1,
					'label.container.type': 1,
					'editorial.ratings.total.value': 1,
					added: 1
				}
			}
		)
		.forEach(({ added, editorial, label, producer, shortId }) => {
			const data = {
				shortId,
				brand: {
					badge: label.general.brand.badge,
					shortId: label.general.brand.shortId,
					name: translate(label.general.brand.name, language)
				},
				fermentation: {
					label: label.brewing?.fermentation,
					producer: producer?.brewing?.fermentation,
					editorial: editorial?.brewing?.fermentation
				},
				extract: {
					label: formatValue(label.brewing?.extract),
					producer: formatValue(producer?.brewing?.extract)
				},
				alcohol: {
					label: formatValue(label.brewing?.alcohol),
					producer: formatValue(producer?.brewing?.alcohol),
					editorial: editorial?.brewing?.alcohol
				},
				ratings: editorial?.ratings?.total?.value,
				container: {
					type: label.container.type
				},
				added
			};

			deleteIfEmpty(
				[
					'fermentation.label',
					'fermentation.producer',
					'fermentation.editorial',
					'fermentation',
					'extract.label',
					'extract.producer',
					'extract',
					'alcohol.label',
					'alcohol.producer',
					'alcohol.editorial',
					'alcohol',
					'ratings'
				],
				data
			);

			rawData.push(data);
		});

	const stats = normalizer(rawData, language);

	return { stats };
};
