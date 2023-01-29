import type { LanguageValue } from './LanguageValue.d';

export type Place = {
	city: LanguageValue;
	country: string; // As full name, eg. Poland
	institution: {
		badge: string;
		name: LanguageValue;
		shortId: string;
	};
	coordinates: [number, number];
	shortId: string;
};
