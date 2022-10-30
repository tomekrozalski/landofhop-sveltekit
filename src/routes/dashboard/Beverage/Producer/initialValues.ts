import type { ProducerFormValues } from './ProducerFormValues.d';

export const initialValues: ProducerFormValues = {
	series: [],
	cooperation: null,
	contract: null,
	place: null,
	remark: [],
	tale: [],
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
	price: []
};
