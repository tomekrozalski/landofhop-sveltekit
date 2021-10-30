import { format } from 'date-fns';
import {
	AlcoholRelate,
	AlcoholUnit,
	ExtractRelate,
	ExtractUnit
} from '$lib/utils/enums/Beverage.enum';

export const emptyLanguageValue = { language: '', value: '' };
export const emptyTale = { article: '', language: '', lead: '' };
export const emptyExtract = {
	value: 0,
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
	value: 0
};
