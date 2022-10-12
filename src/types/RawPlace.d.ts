import type { LanguageValue } from './LanguageValue.d';

export type RawPlace = {
	_id: string;
	city: LanguageValue[];
	country: string;
	institution: {
		badge: string;
		name: LanguageValue[];
		owner?: Institution;
		shortId: string;
		website?: string;
	};
	location?: {
		type: 'Point';
		coordinates: [number, number];
	};
	shortId: string;
};
