import cloneDeep from 'lodash/cloneDeep.js';

import { ContainerUnit } from '$lib/utils/enums/Beverage.enum';
import { emptyLanguageValue } from '$lib/dashboard/utils/emptyFieldValues';

export const initialValues = {
	badge: '',
	// -----------
	name: [cloneDeep(emptyLanguageValue)],
	series: [],
	brand: '',
	cooperation: null,
	contract: null,
	tale: [],
	barcode: null,
	// -----------
	// fermentation: null,
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
	// -----------
	container: {
		color: '',
		hasCapWireFlip: false,
		hasCork: false,
		material: '',
		type: '',
		unit: ContainerUnit.ml,
		value: 0
	},
	price: []
};
