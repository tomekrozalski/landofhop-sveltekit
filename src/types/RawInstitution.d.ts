import type { LanguageValue } from './LanguageValue.d';

export type RawInstitution = {
	// _id: string;
	badge: string;
	name: LanguageValue[];
	owner?: Institution;
	shortId: string;
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
