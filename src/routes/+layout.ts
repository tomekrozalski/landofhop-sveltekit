import { locale, translations } from 'svelte-intl';
import authentication from '$lib/utils/stores/authentication';
import { Status } from '$types/enums/Globals.enum';
import dictionary from './layout/utils/dictionary.json';

translations.update(dictionary);
locale.set('pl');

export const load = async ({ data }) => {
	if (data.authenticated) {
		authentication.setLoginStatus(Status.fulfilled);
	} else {
		authentication.logOut();
	}

	return data;
};
