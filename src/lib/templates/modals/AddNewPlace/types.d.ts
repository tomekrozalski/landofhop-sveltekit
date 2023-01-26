import type { LanguageValue } from '$types/LanguageValue.d';

export type Input = {
	city: {
		value: string;
		language: string;
	}[];
	country: string;
	institution: string;
	coordinates: {
		longitude: string;
		latitude: string;
	};
};

// @ToDo is it correct type?
export type Output = {
	city: LanguageValue[];
	country: string;
	institution: {
		badge: string;
		name: LanguageValue[];
		owner?: {
			badge: string;
			name: LanguageValue[];
			website?: string;
			shortId: string;
		};
		website?: string;
		shortId: string;
	};
	location: [number, number];
};
