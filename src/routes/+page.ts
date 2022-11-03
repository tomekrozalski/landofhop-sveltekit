import { translations } from 'svelte-intl';
import homePageDictionary from './page/dictionary.json';
import beverageListDictionary from '$lib/templates/BeverageList/dictionary.json';

translations.update(homePageDictionary);
translations.update(beverageListDictionary);
