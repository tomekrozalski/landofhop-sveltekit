import type { LanguageValue } from '$types/common/LanguageValue';

export type RawInstitution = {
	badge: string;
	name: LanguageValue[];
	shortId: string;
	owner?: Institution;
};
