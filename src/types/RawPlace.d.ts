import type { LanguageValue } from './LanguageValue.d';

export type RawPlace = {
	// _id: string;
	city: LanguageValue[];
	country: string;
	institution: {
		badge: string;
		name: LanguageValue[];
		shortId: string;
	};
	coordinates: [number, number];
	shortId: string;
};
