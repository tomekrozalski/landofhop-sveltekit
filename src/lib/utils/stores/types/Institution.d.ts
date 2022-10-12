import type { LanguageValue } from '$types/LanguageValue.d';

export type Institution = {
	_id: string;
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
