import { error } from '@sveltejs/kit';
import { institutions } from '$db/mongo';
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
		statsData: {
			beverages: number;
			asCooperator: number;
			asContractor: number;
			avrScore?: {
				value: number;
				ranking: number;
			};
			points: {
				value: number;
				ranking: number;
			};
		};
	}[] = [];

	await institutions
		.find(
			{},
			{
				projection: {
					_id: 0,
					badge: 1,
					name: 1,
					shortId: 1,
					statsData: 1
				}
			}
		)
		.forEach(({ badge, name, shortId, statsData }: RawInstitution) => {
			formattedInsitutions.push({
				badge,
				name: translate(name, AppLanguage.pl),
				shortId,
				statsData
			});
		});

	if (!formattedInsitutions?.length) {
		throw error(404, 'No institution found');
	}

	return {
		insitutions: formattedInsitutions.sort((a, b) =>
			(a.statsData.points.value ?? 0) < (b.statsData.points.value ?? 0) ? 1 : -1
		)
	};
};
