import type { LanguageValue } from '$types/LanguageValue.d';

export type Input = {
	badge: string;
	name: {
		value: string;
		language: string;
	}[];
	group: string;
};

export type Output = {
	badge: string;
	name: LanguageValue[];
	group: string;
};
