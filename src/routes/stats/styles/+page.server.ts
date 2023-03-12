import { beverages, styles } from '$db/mongo';
import { translate } from '$lib/utils/api';
import { AppLanguage } from '$types/enums/Globals.enum';
import type { Style as StyleType } from '$lib/utils/stores/types/Style.d';
import type { LanguageValue } from '$types/LanguageValue.d';
import type { RawStylesStats } from './RawStylesStats.d';

export const prerender = true;

export const load = async ({ parent }) => {
	let styleList: StyleType[] = [];
	const rawData: RawStylesStats[] = [];

	await styles.find().forEach(({ badge, name, group }) => {
		rawData.push({
			amount: 0,
			badge,
			name: translate(name, AppLanguage.pl),
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
		.forEach(({ styleTags }) => {
			if (styleTags?.length) {
				styleTags.forEach((styleTag: { badge: string; name: LanguageValue[] }) => {
					const index = rawData.findIndex(({ badge }) => badge === styleTag.badge);

					rawData[index].amount += 1;
				});
			}
		});

	const { authenticated } = await parent();

	if (authenticated) {
		styleList = await styles
			.find(
				{},
				{
					projection: {
						_id: 0,
						badge: 1,
						name: 1,
						group: 1
					}
				}
			)
			.toArray();
	}

	return { statsData: rawData.filter(({ amount }) => amount), styleList };
};
