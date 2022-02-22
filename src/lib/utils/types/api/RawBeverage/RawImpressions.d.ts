import { TemperatureUnit } from '$lib/utils/enums/Beverage.enum';

export type RawImpressions = {
	bitterness?: number;
	sweetness?: number;
	fullness?: number;
	power?: number;
	hoppyness?: number;
	temperature?: {
		from: number;
		to: number;
		unit: TemperatureUnit;
	};
};
