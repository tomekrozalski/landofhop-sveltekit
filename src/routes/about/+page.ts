import { translations } from 'svelte-intl';
import aboutPageDictionary from './dictionary.json';

export const prerender = true;

translations.update(aboutPageDictionary);
