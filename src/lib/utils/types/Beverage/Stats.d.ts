import LanguageValue from '$lib/utils/types/common/LanguageValue';
import { Fermentation } from '$lib/utils/enums/Beverage';

export type AddTimelineBar = {
	date: string;
	bottle: number;
	can: number;
};

export type AlcoholChartBar = {
	value: number;
	beverages: number;
};

export type FermentationTimelineBar = {
	date: string;
	[Fermentation.top]: number;
	[Fermentation.bottom]: number;
	[Fermentation.spontaneous]: number;
};

export type TopBrandsTimelineBar = {
	date: string;
	brands: {
		amount: number;
		badge: string;
		id: string;
		name: LanguageValue;
	}[];
};

export type Stats = {
	addTimelineData: AddTimelineBar[];
	alcoholChartData: AlcoholChartBar[];
	fermentationTimelineData: FermentationTimelineBar[];
	topBrandsTimelineData: TopBrandsTimelineBar[];
};