import type { LanguageValue } from '$lib/utils/types/common/LanguageValue';

export type RawInstitution = {
	badge: string;
	name: LanguageValue[];
	shortId: string;
	owner?: Institution;
};
