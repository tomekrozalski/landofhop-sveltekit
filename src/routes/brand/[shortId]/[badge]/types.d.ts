import type { LanguageValue } from '$types/LanguageValue.d';
import type { Basics } from '$lib/templates/BeverageList/Basics.d';

export type InstitutionDetails = {
	name: LanguageValue;
	owner?: {
		badge: string;
		name: LanguageValue;
		website?: string;
	};
	website?: string;
	statsData: {
		beverages: number;
		asCooperator: number;
		asContractor: number;
		avrScore?: {
			value: string;
			ranking: number;
		};
		points: {
			value: number;
			ranking: number;
		};
	};
};

export type BrandTimelineData = {
	date: string;
	beverages?: Basics[];
	asCooperator?: Basics[];
	asContractor?: Basics[];
};

export type BrandPlaceData = {
	beverages: number;
	asCooperator: number;
	asContractor: number;
	coordinates: [number, number];
	shortId: string;
	city: LanguageValue;
	country: string;
};

export type SelectedBar = {
	date: string;
	items: Basics[];
	type: 'beverages' | 'cooperator' | 'contractor';
};

export type FormattedPlaceData = {
	cooperationCircleData: {
		size: number;
		stroke: number;
	};
	contractorCircleData: {
		size: number;
		stroke: number;
	};
	beverageCircleData: {
		size: number;
		stroke: number;
	};
	city: LanguageValue;
	coordinates: [number, number];
	country: string;
	size: number;
	shortId: string;
};
