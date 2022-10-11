import type { LanguageValue } from '$types/common/LanguageValue';

export type RawInstitutionWithoutId = {
	badge: string;
	name: LanguageValue[];
	owner?: Institution;
	shortId: string;
	website?: string;
};

export type RawInstitution = RawInstitutionWithoutId & {
	_id: string;
};
