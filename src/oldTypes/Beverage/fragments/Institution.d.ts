import type { LanguageValue } from '$types/common/LanguageValue';

export type Institution = {
	badge: string;
	name: LanguageValue[];
	owner?: Institution;
	shortId: string;
};
