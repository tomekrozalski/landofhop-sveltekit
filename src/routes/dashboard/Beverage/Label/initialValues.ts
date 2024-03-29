import { cloneDeep } from 'lodash-es';
import { emptyLanguageValue } from '$lib/utils/helpers/emptyFieldValues';
import { ContainerUnit } from '$types/enums/Beverage.enum';
import type { LabelFormValues } from './LabelFormValues.d';

export const initialValues: LabelFormValues = {
	badge: '',
	// -----------
	name: [cloneDeep(emptyLanguageValue)],
	series: [],
	brand: '',
	cooperation: null,
	contract: null,
	place: null,
	remark: [],
	tale: [],
	barcode: null,
	// -----------
	fermentation: null,
	style: [],
	extract: {
		value: null,
		unit: null,
		relate: null
	},
	alcohol: {
		value: null,
		unit: null,
		relate: null,
		scope: null
	},
	filtration: null,
	pasteurization: null,
	aged: [],
	dryHopped: null,
	hopRate: {
		value: null,
		unit: null
	},
	nitrogen: null,
	expirationDate: {
		value: null,
		unit: null
	},
	// -----------
	ingredients: [],
	ingredientTags: null,
	smokedMalt: null,
	// -----------
	bitterness: null,
	sweetness: null,
	fullness: null,
	power: null,
	hoppyness: null,
	temperature: {
		from: null,
		to: null,
		unit: null
	},
	// -----------
	container: {
		color: '',
		hasCapWireFlip: false,
		hasCork: false,
		material: '',
		type: '',
		unit: ContainerUnit.ml,
		value: '0'
	},
	price: []
};
