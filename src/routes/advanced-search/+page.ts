import { translations } from 'svelte-intl';
import commonFormsDictionary from '$lib/utils/dictionary/form.json';
import dictionary from './dictionary.json';

translations.update(dictionary);
translations.update(commonFormsDictionary);
