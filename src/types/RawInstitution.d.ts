import type { LanguageValue } from './LanguageValue.d';

export type RawInstitution = {
	_id: string;
	badge: string;
	name: LanguageValue[];
	owner?: Institution;
	shortId: string;
	website?: string;
};
