import type { LanguageValue } from '$types/LanguageValue';

export type FormattedInsitutionsType = {
	badge: string;
	name: LanguageValue;
	shortId: string;
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
