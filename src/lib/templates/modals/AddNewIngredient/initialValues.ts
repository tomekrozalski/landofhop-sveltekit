import { cloneDeep } from 'lodash-es';

import { emptyLanguageValue } from '$lib/utils/admin/emptyFieldValues';

export const initialValues = {
	badge: '',
	name: [cloneDeep(emptyLanguageValue)],
	type: '',
	parent: ''
};
