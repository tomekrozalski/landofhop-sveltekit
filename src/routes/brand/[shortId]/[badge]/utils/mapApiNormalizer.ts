import type { RawBeverage } from '$types/RawBeverage.d';
import type { RawPlace } from '$types/RawPlace';
import type { BrandPlaceData } from '../types.d';

type MapApiNormalizerTypes = {
	rawBeverages: RawBeverage[];
	rawPlaces: RawPlace[];
};

const checkIsCooperation = (
	badge: string,
	shortId: string,
	values?: { badge: string; shortId: string }[]
) =>
	!!values?.find((props) => props.badge === badge) &&
	!!values?.find((props) => props.shortId === shortId);

const mapApiNormalizer = ({ rawBeverages, rawPlaces }: MapApiNormalizerTypes): BrandPlaceData[] => {
	// const a: {
	//   placeId: string;
	//   type: 'beverage' | 'asCooperator' | 'asCooperator'
	// }[] = [];

	const pl = rawBeverages.reduce((acc, { badge, shortId, label, producer, editorial }) => {
		const isCooperation =
			checkIsCooperation(badge, shortId, label.general.cooperation) ||
			checkIsCooperation(badge, shortId, producer?.general?.cooperation) ||
			checkIsCooperation(badge, shortId, editorial?.general?.cooperation);
		const isContractor =
			(label.general.contract?.badge === badge && label.general.contract?.shortId === shortId) ||
			(producer?.general?.contract?.badge === badge &&
				producer?.general?.contract?.shortId === shortId) ||
			(editorial?.general?.contract?.badge === badge &&
				editorial?.general?.contract?.shortId === shortId);

		const placeId =
			label.general.place?.shortId ||
			producer?.general?.place?.shortId ||
			editorial?.general?.place?.shortId;

		if (placeId) {
			if (acc[placeId]) {
				acc[placeId] = {
					beverages:
						!isCooperation && !isContractor ? acc[placeId].beverages + 1 : acc[placeId].beverages,
					asCooperator: isCooperation ? acc[placeId].asCooperator + 1 : acc[placeId].asCooperator,
					asContractor: isContractor ? acc[placeId].asContractor + 1 : acc[placeId].asContractor
				};
			} else {
				acc[placeId] = {
					beverages: !isCooperation && !isContractor ? 1 : 0,
					asCooperator: isCooperation ? 1 : 0,
					asContractor: isContractor ? 1 : 0
				};
			}
		}

		return acc;
	}, {});

	const a = Object.entries(pl)
		.map(([key, values]) => {
			const place = rawPlaces.find(({ shortId }) => shortId === key);

			return {
				...values,
				...(place?.location?.coordinates?.length && { coordinates: place.location.coordinates })
			};
		})
		.filter(({ coordinates }) => !!coordinates?.length);

	return a;
};

export default mapApiNormalizer;
