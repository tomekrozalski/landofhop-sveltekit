import type { LanguageValue } from '$types/LanguageValue.d';

export type Input = {
	city: {
		value: string;
		language: string;
	}[];
	country: string;
	institution: string;
	coordinates: {
		latitude: string;
		longitude: string;
	};
};

export type Output = {
	city: LanguageValue[];
	country: string;
	institution: {
		badge: string;
		name: LanguageValue[];
		shortId: string;
	};
	coordinates: [number, number];
};
