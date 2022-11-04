import { translations } from 'svelte-intl';
import commonStatsDictionary from './commonStatsDictionary.json';
import generalStatsDictionary from './General/dictionary.json';

translations.update(commonStatsDictionary);
translations.update(generalStatsDictionary);
