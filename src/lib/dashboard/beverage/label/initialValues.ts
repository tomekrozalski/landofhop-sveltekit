import cloneDeep from 'lodash/cloneDeep.js';

import { ContainerUnit } from '$lib/utils/enums/Beverage.enum';
import { emptyLanguageValue } from '$lib/dashboard/utils/emptyFieldValues';

export const initialValues = {
	badge: '',
	name: [cloneDeep(emptyLanguageValue)],
	series: [],
	brand: '',
	cooperation: null,
	barcode: null,
	container: {
		color: '',
		hasCapWireFlip: false,
		hasCork: false,
		material: '',
		type: '',
		unit: ContainerUnit.ml,
		value: 0
	}
};
