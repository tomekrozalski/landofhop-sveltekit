import cloneDeep from 'lodash.clonedeep';
import { emptyLanguageValue } from '$lib/dashboard/utils/emptyFieldValues';

export const initialValues = {
	city: [cloneDeep(emptyLanguageValue)],
	country: '',
	institution: '',
	coordinates: {
		longitude: null,
		latitude: null
	}
};
