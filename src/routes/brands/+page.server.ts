import { error } from '@sveltejs/kit';
import { beverages, institutions } from '$db/mongo';
import { translate } from '$lib/utils/api';
import { AppLanguage } from '$types/enums/Globals.enum';
import type { RawInstitution } from '$types/RawInstitution.d';
import type { LanguageValue } from '$types/LanguageValue';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const formattedInsitutions: {
		badge: string;
		name: LanguageValue;
		shortId: string;
		avgRating?: string;
	}[] = [];

	await institutions
		.find(
			{},
			{
				projection: {
					_id: 0,
					badge: 1,
					name: 1,
					shortId: 1
				}
			}
		)
		.forEach(({ badge, name, shortId }: RawInstitution) => {
			formattedInsitutions.push({
				badge,
				name: translate(name, AppLanguage.pl),
				shortId
			});
		});

	if (!formattedInsitutions?.length) {
		throw error(404, 'No institution found');
	}

	await beverages
		.aggregate([
			{
				$group: {
					_id: '$label.general.brand.shortId',
					avgRating: { $avg: '$editorial.ratings.total.value' }
				}
			},
			{ $sort: { avgRating: -1 } },
			{
				$project: {
					_id: 0,
					shortId: '$_id',
					avgRating: 1
				}
			}
		])
		.forEach((props) => {
			const a = formattedInsitutions.find(({ shortId }) => shortId === props.shortId);

			if (a) {
				a.avgRating = new Intl.NumberFormat(AppLanguage.pl, { maximumSignificantDigits: 3 }).format(
					props.avgRating
				);
			}
		});

	return {
		insitutions: formattedInsitutions.sort((a, b) => a.name.value.localeCompare(b.name.value))
	};
};
