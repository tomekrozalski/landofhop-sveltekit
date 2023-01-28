import { AppLanguage } from '$types/enums/Globals.enum';
import { translate } from '$lib/utils/api';
import type { RawBeverage } from '$types/RawBeverage.d';
import type { RawPlace } from '$types/RawPlace';
import type { BrandPlaceData } from '../types.d';

type MapApiNormalizerTypes = {
	badge: string;
	rawBeverages: RawBeverage[];
	rawPlaces: RawPlace[];
	shortId: string;
};

type RawPlaceTypeData = {
	placeId: string;
	type: 'beverage' | 'asContractor' | 'asCooperator';
};

const getPlaceId = (beverage: RawBeverage): string | null =>
	beverage.label.general.place?.shortId ||
	beverage.producer?.general?.place?.shortId ||
	beverage.editorial?.general?.place?.shortId ||
	null;

const checkIsContractor = (
	{ editorial, label, producer }: RawBeverage,
	badge: string,
	shortId: string
): boolean => {
	const isLabelContractor =
		label.general.contract?.badge === badge && label.general.contract?.shortId === shortId;
	const isProducerContractor =
		producer?.general?.contract?.badge === badge &&
		producer?.general?.contract?.shortId === shortId;
	const isEditorialContractor =
		editorial?.general?.contract?.badge === badge &&
		editorial?.general?.contract?.shortId === shortId;

	return isLabelContractor || isProducerContractor || isEditorialContractor;
};

const checkIsCooperation = (
	{ editorial, label, producer }: RawBeverage,
	badge: string,
	shortId: string
): boolean => {
	const isLabelCooperation =
		!!label.general.cooperation?.find((props) => props.badge === badge) &&
		!!label.general.cooperation?.find((props) => props.shortId === shortId);
	const isProducerCooperation =
		!!producer?.general?.cooperation?.find((props) => props.badge === badge) &&
		!!producer?.general?.cooperation?.find((props) => props.shortId === shortId);
	const isEditorialCooperation =
		!!editorial?.general?.cooperation?.find((props) => props.badge === badge) &&
		!!editorial?.general?.cooperation?.find((props) => props.shortId === shortId);

	return isLabelCooperation || isProducerCooperation || isEditorialCooperation;
};

const mapApiNormalizer = ({
	badge,
	rawBeverages,
	rawPlaces,
	shortId
}: MapApiNormalizerTypes): BrandPlaceData[] => {
	const rawData: RawPlaceTypeData[] = rawBeverages
		.filter((beverage) => !!getPlaceId(beverage))
		.map((beverage) => {
			const placeId = getPlaceId(beverage) as string;

			if (checkIsContractor(beverage, badge, shortId)) {
				return {
					placeId,
					type: 'asContractor'
				};
			}

			if (checkIsCooperation(beverage, badge, shortId)) {
				return {
					placeId,
					type: 'asCooperator'
				};
			}

			return {
				placeId,
				type: 'beverage'
			};
		});

	return rawData.reduce((acc: BrandPlaceData[], { placeId, type }: RawPlaceTypeData) => {
		const selectedIndex = acc.findIndex(({ shortId }) => shortId === placeId);

		if (selectedIndex >= 0) {
			switch (type) {
				case 'beverage':
					acc[selectedIndex].beverages += 1;
					break;
				case 'asContractor':
					acc[selectedIndex].asContractor += 1;
					break;
				case 'asCooperator':
					acc[selectedIndex].asCooperator += 1;
			}
		} else {
			const selectedPlace = rawPlaces.find(({ shortId }) => shortId === placeId) as RawPlace;

			if (selectedPlace.coordinates) {
				acc.push({
					beverages: type === 'beverage' ? 1 : 0,
					asCooperator: type === 'asCooperator' ? 1 : 0,
					asContractor: type === 'asContractor' ? 1 : 0,
					coordinates: selectedPlace.coordinates,
					shortId: placeId,
					city: translate(selectedPlace?.city, AppLanguage.pl),
					country: selectedPlace?.country
				});
			}
		}

		return acc;
	}, []);
};

export default mapApiNormalizer;
