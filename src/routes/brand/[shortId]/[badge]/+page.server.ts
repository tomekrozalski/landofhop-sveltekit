import { error } from '@sveltejs/kit';
import { beverages, institutions } from '$db/mongo';
import { AppLanguage } from '$types/enums/Globals.enum';
import type { RawInstitution } from '$types/RawInstitution.d';
import type { RawBeverage } from '$types/RawBeverage.d';
import institutionApiNormalizer from './utils/institutionApiNormalizer';
import timelineApiNormalizer from './utils/timelineApiNormalizer';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async ({ params }) => {
	const { badge, shortId } = params;
	const rawInstitution: RawInstitution | null = await institutions.findOne({ badge, shortId });

	if (!rawInstitution) {
		throw error(404, 'Institution not found');
	}

	const rawBeverages: RawBeverage[] = await beverages
		.find({
			$or: [
				{ 'label.general.brand.badge': badge, 'label.general.brand.shortId': shortId },
				{ 'label.general.cooperation.badge': badge, 'label.general.cooperation.shortId': shortId },
				{
					'producer.general.cooperation.badge': badge,
					'producer.general.cooperation.shortId': shortId
				},
				{
					'editorial.general.cooperation.badge': badge,
					'editorial.general.cooperation.shortId': shortId
				},
				{ 'label.general.contract.badge': badge, 'label.general.contract.shortId': shortId },
				{ 'producer.general.contract.badge': badge, 'producer.general.contract.shortId': shortId },
				{ 'editorial.general.contract.badge': badge, 'editorial.general.contract.shortId': shortId }
			]
		})
		.toArray();

	let avgRating = '';
	let ratingPlace = 0;
	let ratingCount = 0;

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
			ratingCount = ratingCount + 1;

			if (props.shortId === shortId) {
				avgRating = new Intl.NumberFormat(AppLanguage.pl, { maximumSignificantDigits: 3 }).format(
					props.avgRating
				);
				ratingPlace = ratingCount;
			}
		});

	return {
		timelineData: timelineApiNormalizer({ badge, rawBeverages, shortId }),
		insitution: institutionApiNormalizer(rawInstitution, AppLanguage.pl),
		...(avgRating && { ratingsData: { avgRating, ratingPlace, ratingCount } })
	};
};
