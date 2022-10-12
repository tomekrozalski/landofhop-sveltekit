import { format } from 'date-fns';
import {
	AgedTimeUnit,
	AlcoholRelate,
	AlcoholUnit,
	ExpirationDateUnit,
	ExtractRelate,
	ExtractUnit,
	HopRateUnit,
	TemperatureUnit
} from '$types/enums/Beverage.enum';

export const emptyLanguageValue = { language: '', value: '' };
export const emptyTale = { article: '', language: '', lead: '' };
export const emptyExtract = {
	value: '0',
	unit: ExtractUnit.percent,
	relate: ExtractRelate.weight
};
export const emptyAlcohol = {
	value: 0,
	unit: AlcoholUnit.percent,
	relate: AlcoholRelate.capacity,
	scope: '--'
};
export function getNullishObject(obj) {
	return Object.entries(obj).reduce((acc, [key]) => ({ ...acc, [key]: null }), {});
}
export const emptyPrice = {
	currency: 'PLN',
	date: format(new Date(), 'dd.MM.yyyy'),
	shop: null,
	value: '0'
};
export const emptyHopRate = { value: '0', unit: HopRateUnit.gl };
export const emptyTemperature = { from: '0', to: '0', unit: TemperatureUnit.celcius };
export const emptyExpirationDate = { value: '0', unit: ExpirationDateUnit.month };
export const emptyAged = {
	previousContent: [],
	time: {
		value: '0',
		unit: AgedTimeUnit.month
	},
	type: null,
	wood: null
};
export const emptyIngredients = {
	complete: true,
	language: null,
	list: ['']
};
