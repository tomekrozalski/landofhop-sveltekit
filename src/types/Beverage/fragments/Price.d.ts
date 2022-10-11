import { Currency } from 'utils/enums/Beverage';

export type Price = {
	currency: Currency;
	date: Date;
	shop?: string;
	value: number;
};
