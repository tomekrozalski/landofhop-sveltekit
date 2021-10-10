import cloneDeep from 'lodash/cloneDeep.js';
import { emptyLanguageValue } from '$lib/dashboard/utils/emptyFieldValues';

export const initialValues = {
	badge: '',
	name: [cloneDeep(emptyLanguageValue)],
	owner: null,
	website: null
};
