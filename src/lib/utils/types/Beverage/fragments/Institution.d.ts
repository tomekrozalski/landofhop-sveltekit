import type { LanguageValue } from '$lib/utils/types/common/LanguageValue';

export type Institution = {
	badge: string;
	name: LanguageValue[];
	owner?: Institution;
	shortId: string;
};
