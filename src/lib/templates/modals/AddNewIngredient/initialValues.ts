import { cloneDeep } from 'lodash-es';
import { emptyLanguageValue } from '$lib/utils/helpers/emptyFieldValues';

export const initialValues = {
	badge: '',
	name: [cloneDeep(emptyLanguageValue)],
	type: '',
	parent: ''
};
