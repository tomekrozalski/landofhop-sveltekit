import type { RawBeverage } from '$types/RawBeverage.d';
import type { RawPlace } from '$types/RawPlace';
import type { BrandPlaceData } from '../types.d';

type MapApiNormalizerTypes = {
	rawBeverages: RawBeverage[];
	rawPlaces: RawPlace[];
};

const mapApiNormalizer = ({ rawBeverages, rawPlaces }: MapApiNormalizerTypes): BrandPlaceData[] => {
	console.log('->', rawBeverages, rawPlaces);

	return [];
};

export default mapApiNormalizer;
