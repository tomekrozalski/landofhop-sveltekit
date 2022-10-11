import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { beverages, styles } from '$db/mongo';
import { translate } from '$lib/utils/api';
import type { RawStyleTag } from '$types/api/RawBeverage/RawEditorial';
import type { RawStylesStats } from '$types/api/RawStats/RawStylesStats.d';

export const GET: RequestHandler = async ({ params }) => {
	const { language } = params;
	const rawData: RawStylesStats[] = [];

	await styles.find().forEach(({ badge, name, group }) => {
		rawData.push({
			amount: 0,
			badge,
			name: translate(name, language),
			group
		});
	});

	await beverages
		.find(
			{},
			{
				projection: {
					styleTags: '$editorial.brewing.styleTags'
				}
			}
		)
		.forEach(({ styleTags }: { _id: string; styleTags?: RawStyleTag[] }) => {
			if (styleTags?.length) {
				styleTags.forEach((styleTag: RawStyleTag) => {
					const index = rawData.findIndex(({ badge }) => badge === styleTag.badge);

					rawData[index].amount += 1;
				});
			}
		});

	const formattedData = rawData.filter(({ amount }) => amount);

	return json(formattedData);
};
