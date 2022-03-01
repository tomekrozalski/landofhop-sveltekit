import { getDbCollections } from '$lib/utils/api';
import { deleteIfEmpty, translate } from '$lib/utils/api';
import { normalizer } from '$lib/utils/api/stats/general/normalizer';
import type { RawGeneralStats } from '$lib/utils/types/api/RawStats/RawGeneralStats.d';

export async function get({ params }) {
	const { language } = params;
	const { beverages } = await getDbCollections();

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
					'alcohol'
				],
				data
			);

			rawData.push(data);
		});

	return {
		body: normalizer(rawData, language)
	};
}
