import type { BrandPlaceData, FormattedPlaceData } from '../types.d';

const getCircleSize = (value = 1, min = 5, max = 30) => (value + min > max ? max : value + min);

const formatPlaces = (places: BrandPlaceData[]): FormattedPlaceData[] =>
	places
		.map(({ asContractor, asCooperator, beverages, city, coordinates, country, shortId }) => {
			const total = asContractor + asCooperator + beverages;
			const size = getCircleSize(total);
			const cooperationSize = (asCooperator / total) * size;
			const contractorSize = (asContractor / total) * size;
			const beveragesSize = (beverages / total) * size;

			return {
				cooperationCircleData: {
					size,
					stroke: cooperationSize
				},
				contractorCircleData: {
					size: size - cooperationSize,
					stroke: contractorSize
				},
				beverageCircleData: {
					size: size - cooperationSize - contractorSize,
					stroke: beveragesSize
				},
				city,
				coordinates,
				country,
				size,
				shortId
			};
		})
		.sort((a, b) => (a.size > b.size ? -1 : 1));

export default formatPlaces;
