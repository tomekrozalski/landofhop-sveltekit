import type { LanguageValue } from '$types/common/LanguageValue';
import type { InstitutionEssence } from '$types/Institution';

export type PlaceRaw = {
	city: LanguageValue[];
	country: string;
	institution: InstitutionEssence;
	location?: {
		type: 'Point';
		coordinates: [number, number];
	};
};

export type Place = PlaceRaw & { shortId: string };
