import { cloneDeep } from 'lodash-es';
import { emptyLanguageValue } from '$lib/utils/helpers/emptyFieldValues';
import type { Input } from './types.d';

export const initialValues: Input = {
	city: [cloneDeep(emptyLanguageValue)],
	country: '',
	institution: '',
	coordinates: {
		latitude: '',
		longitude: ''
	}
};
