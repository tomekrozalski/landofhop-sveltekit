import { error } from '@sveltejs/kit';
import { beverages, institutions, places } from '$db/mongo';
import { AppLanguage } from '$types/enums/Globals.enum';
import type { RawInstitution } from '$types/RawInstitution.d';
import type { RawBeverage } from '$types/RawBeverage.d';
import type { RawPlace } from '$types/RawPlace';
import institutionApiNormalizer from './utils/institutionApiNormalizer';
import timelineApiNormalizer from './utils/timelineApiNormalizer';
import mapApiNormalizer from './utils/mapApiNormalizer';
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

	const rawPlaces: RawPlace[] = [];

	await places.find().forEach(({ city, country, institution, location, shortId }) => {
		rawPlaces.push({
			city,
			country,
			institution,
			...(location && {
				location: {
					type: location.type,
					coordinates: [+location.coordinates[0], +location.coordinates[1]]
				}
			}),
			shortId
		});
	});

	const brewingInstitution = await beverages
		.aggregate([
			{
				$group: {
					_id: '$label.general.brand.shortId'
				}
			}
		])
		.toArray();

	const ratings = await beverages
		.aggregate([
			{
				$group: {
					_id: null,
					avgRating: { $avg: '$editorial.ratings.total.value' }
				}
			}
		])
		.toArray();

	return {
		averageScoreForAllBeverages: ratings[0].avgRating,
		timelineData: timelineApiNormalizer({ badge, rawBeverages, shortId }),
		institution: institutionApiNormalizer(rawInstitution, AppLanguage.pl),
		ratingCount: brewingInstitution.length,
		mapData: mapApiNormalizer({ rawBeverages, rawPlaces })
	};
};
