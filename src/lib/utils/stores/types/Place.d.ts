import type { LanguageValue } from '$types/LanguageValue.d';

export type Place = {
	city: LanguageValue[];
	country: string;
	institution: {
		badge: string;
		name: LanguageValue[];
		owner?: {
			badge: string;
			name: LanguageValue[];
			shortId: string;
			website?: string;
		};
		shortId: string;
		website?: string;
	};
	location?: {
		type: 'Point';
		coordinates: [number, number];
	};
	shortId: string;
};
