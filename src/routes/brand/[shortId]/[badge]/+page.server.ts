import { format } from 'date-fns';
import { error } from '@sveltejs/kit';
import { basics, institutions } from '$db/mongo';
import { translate } from '$lib/utils/api';
import generateMonthList from '$lib/utils/helpers/generateMonthList';
import { AppLanguage, DateFormat } from '$types/enums/Globals.enum';
import type { RawInstitution } from '$types/RawInstitution.d';
import type { LanguageValue } from '$types/LanguageValue.d';
import responseNormalizer from './utils/responseNormalizer';
import type { RawBasics } from '$types/RawBasics.d';
import type { PageServerLoad } from './$types';
import type { Beverage } from '$lib/templates/BeverageList/Beverage.d';

export const prerender = true;

type OutputType = { date: string; beverages?: Beverage[] }[];

const createTimelineData = (values: RawBasics[]): OutputType => {
	const domain: { date: string; beverages: LanguageValue[] }[] = [];
	const dateList = generateMonthList();

	dateList.forEach((date) => {
		domain.push({
			date: format(date, 'yyyy-MM'),
			beverages: values
				.filter(({ added }) => {
					if (format(added, 'yyyy-MM') === format(date, 'yyyy-MM')) {
						return true;
					}
				})
				.map(({ added, badge, brand, containerType, coverImage, name, shortId }) => ({
					shortId,
					badge,
					brand: {
						...brand,
						name: translate(brand.name, AppLanguage.pl)
					},
					name: translate(name, AppLanguage.pl),
					...(coverImage && {
						coverImage: {
							height: coverImage.height,
							width: coverImage.width,
							outline: coverImage.outlines
						}
					}),
					containerType,
					added: format(new Date(added), DateFormat[AppLanguage.pl])
				}))
		});
	});

	return domain.map(({ date, beverages }) => ({
		date,
		...(beverages.length && { beverages })
	}));
};

export const load: PageServerLoad = async ({ params }) => {
	const { badge, shortId } = params;
	const rawInstitution: RawInstitution | null = await institutions.findOne({ badge, shortId });

	if (!rawInstitution) {
		throw error(404, 'Institution not found');
	}

	const rawBasics = await basics.find({ 'brand.badge': badge, 'brand.shortId': shortId }).toArray();
	const timelineData: OutputType = createTimelineData(rawBasics);

	return {
		timelineData,
		insitution: responseNormalizer(rawInstitution, AppLanguage.pl)
	};
};
