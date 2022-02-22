import { Currency } from '$lib/utils/enums/Beverage.enum';

export type RawPrice = {
	currency: Currency;
	date: Date;
	shop?: string;
	value: number;
};
