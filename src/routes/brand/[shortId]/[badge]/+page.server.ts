import { add, format, isBefore, max, min } from 'date-fns';
import { error } from '@sveltejs/kit';
import { basics, institutions } from '$db/mongo';
import { translate } from '$lib/utils/api';
import { AppLanguage } from '$types/enums/Globals.enum';
import type { RawInstitution } from '$types/RawInstitution.d';
import type { LanguageValue } from '$types/LanguageValue.d';
import responseNormalizer from './utils/responseNormalizer';
import type { PageServerLoad } from './$types';

export const prerender = true;

type OutputType = { date: string; beverages?: LanguageValue[] }[];

const abc = (values: { added: Date; name: LanguageValue[] }[]): OutputType => {
	const domain: { date: string; beverages: LanguageValue[] }[] = [];
	const dates = values.map(({ added }) => new Date(added));
	const earliest = min(dates);
	const latest = max(dates);
	const endpoint = new Date(`${format(add(latest, { months: 1 }), 'yyyy-MM', {})}-01`);
	let current = earliest;

	do {
		domain.push({
			date: format(current, 'yyyy-MM'),
			beverages: values
				.filter(({ added }) => {
					if (format(added, 'yyyy-MM') === format(current, 'yyyy-MM')) {
						return true;
					}
				})
				.map(({ name }) => translate(name, AppLanguage.pl))
		});

		current = add(current, { months: 1 });
	} while (isBefore(current, endpoint));

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

	const abb = await basics
		.find(
			{ 'brand.badge': badge, 'brand.shortId': shortId },
			{
				projection: {
					_id: 0,
					name: 1,
					added: 1
				}
			}
		)
		.toArray();

	const formattedBasics: OutputType = abc(abb);

	return { formattedBasics, insitution: responseNormalizer(rawInstitution, AppLanguage.pl) };
};
