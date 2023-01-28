import { get } from 'svelte/store';
import { translations } from 'svelte-intl';
import authentication from '$lib/utils/stores/authentication';
import placesPageDictionary from './dictionary.json';
import dashboardDictionary from '../dashboard/Beverage/utils/dictionary/dictionary.json';
import dashboardLabelsDictionary from '../dashboard/Beverage/utils/dictionary/labels.json';

translations.update(placesPageDictionary);

if (get(authentication).isLoggedIn) {
	translations.update(dashboardDictionary);
	translations.update(dashboardLabelsDictionary);
}
