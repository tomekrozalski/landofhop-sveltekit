import type { LanguageValue } from '$lib/utils/types/common/LanguageValue';
import type { RawInstitutionWithoutId } from './RawInstitution';

export type RawPlaceWithoutId = {
	city: LanguageValue[];
	country: string;
	institution: RawInstitutionWithoutId;
	location?: {
		type: 'Point';
		coordinates: [number, number];
	};
	shortId: string;
};

export type RawPlace = RawPlaceWithoutId & {
	_id: string;
};
