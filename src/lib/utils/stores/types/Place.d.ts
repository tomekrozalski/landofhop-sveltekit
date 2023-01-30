import type { LanguageValue } from '$types/LanguageValue.d';

export type Place = {
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
