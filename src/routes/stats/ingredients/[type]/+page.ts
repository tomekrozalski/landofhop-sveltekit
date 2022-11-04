import { translations } from 'svelte-intl';
import commonStatsDictionary from '../../commonStatsDictionary.json';
import ingredientsStatsDictionary from './dictionary.json';

translations.update(commonStatsDictionary);
translations.update(ingredientsStatsDictionary);
