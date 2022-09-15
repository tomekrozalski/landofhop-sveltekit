import { getDbCollections } from '$lib/utils/api';
import { translate } from '$lib/utils/api';
import type { RawStyleTag } from '$lib/utils/types/api/RawBeverage/RawEditorial';
import type { RawStylesStats } from '$lib/utils/types/api/RawStats/RawStylesStats.d';

export async function GET({ params }) {
	const { language } = params;
	const { beverages, styles } = await getDbCollections();

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

	throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
	// Suggestion (check for correctness before using):
	// return new Response(rawData.filter(({ amount }) => amount));
	return {
		body: rawData.filter(({ amount }) => amount)
	};
}
