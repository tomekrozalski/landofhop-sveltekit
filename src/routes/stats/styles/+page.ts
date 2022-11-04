import { translations } from 'svelte-intl';
import commonStatsDictionary from '../commonStatsDictionary.json';
import styleStatsDictionary from './dictionary.json';
import styleGroupsDictionary from './styleGroupDictionary.json';

translations.update(commonStatsDictionary);
translations.update(styleStatsDictionary);
translations.update(styleGroupsDictionary);
