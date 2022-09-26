import { cloneDeep } from 'lodash-es';
import { emptyLanguageValue } from '$lib/utils/admin/emptyFieldValues';

export const initialValues = {
	city: [cloneDeep(emptyLanguageValue)],
	country: '',
	institution: '',
	coordinates: {
		longitude: null,
		latitude: null
	}
};
