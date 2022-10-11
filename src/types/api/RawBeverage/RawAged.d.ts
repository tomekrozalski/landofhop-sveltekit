import type {
	AgedPreviousContent,
	AgedTimeUnit,
	AgedType,
	AgedWood
} from '$lib/utils/enums/Beverage.enum';

export type RawAged = {
	type?: AgedType;
	wood?: AgedWood;
	time?: {
		value: number;
		unit: AgedTimeUnit;
	};
	previousContent?: AgedPreviousContent[];
};
