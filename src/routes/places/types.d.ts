import type { LanguageValue } from './LanguageValue.d';

export type Place = {
	city: LanguageValue;
	institution: {
		badge: string;
		name: LanguageValue;
		shortId: string;
	};
	coordinates: [number, number];
	shortId: string;
};
