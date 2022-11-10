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

	// 	await beverages
	// 		.aggregate([
	// 			{
	// 				$group: {
	// 					_id: '$label.general.brand.shortId',
	// 					avgRating: { $avg: '$editorial.ratings.total.value' },
	// 					beverages: { $count: {} }
	// 				}
	// 			},
	// 			{ $sort: { avgRating: -1 } },
	// 			{
	// 				$project: {
	// 					_id: 0,
	// 					shortId: '$_id',
	// 					avgRating: 1,
	// 					beverages: 1,
	// 					test: 1
	// 				}
	// 			}
	// 		])
	// 		.forEach((props) => {
	// 			const foundInsitution = formattedInsitutions.find(({ shortId }) => shortId === props.shortId);
	//
	// 			if (foundInsitution && props.avgRating) {
	// 				foundInsitution.avgRating = props.avgRating;
	// 				foundInsitution.beverages = props.beverages;
	// 			}
	// 		});

	return {
		insitutions: formattedInsitutions.sort((a, b) =>
			(a.statsData.points.value ?? 0) < (b.statsData.points.value ?? 0) ? 1 : -1
		)
	};
};
