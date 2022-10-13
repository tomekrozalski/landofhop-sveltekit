import type { LanguageValue } from '$types/LanguageValue.d';

export type Input = {
	badge: string;
	name: {
		value: string;
		language: string;
	}[];
	owner: string | null;
	website: string | null;
};

// @ToDo: is it correct type?
export type Output = {
	badge: string;
	name: LanguageValue[];
	owner?: {
		badge: string;
		name: LanguageValue[];
		website?: string;
	};
	website?: string;
};
