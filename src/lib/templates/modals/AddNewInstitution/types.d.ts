import type { LanguageValue } from './LanguageValue.d';

export type Input = {
	badge: string;
	name: {
		value: string;
		language: string;
	}[];
	owner: string | null;
	website: string | null;
};

export type Output = {
	// _id: string;
	badge: string;
	name: LanguageValue[];
	owner?: {
		badge: string;
		name: LanguageValue[];
		website?: string;
	};
	website?: string;
	statsData: {
		beverages: number;
		asCooperator: number;
		asContractor: number;
		avrScore?: {
			value: number;
			ranking: number;
		};
		points: {
			value: number;
			ranking: number;
		};
	};
};
