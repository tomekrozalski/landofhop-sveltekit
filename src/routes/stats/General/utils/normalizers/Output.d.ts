import LanguageValue from '$types/LanguageValue.d';
import { Fermentation } from '$types/enums/Beverage.enum';

export type AddTimelineBar = {
	date: string;
	bottle: number;
	can: number;
};

export type AlcoholChartBar = {
	value: number;
	beverages: number;
};

export type RatingsChartBar = {
	value: number;
	beverages: number;
};

export type FermentationTimelineBar = {
	date: string;
	[Fermentation.top]: number;
	[Fermentation.bottom]: number;
	[Fermentation.spontaneous]: number;
};

export type Brand = {
	amount: number;
	badge: string;
	id: string;
	name: LanguageValue;
};

export type TopBrandsTimelineBar = {
	date: string;
	brands: Brand[];
};

export type GeneralStats = {
	addTimelineData: AddTimelineBar[];
	alcoholChartData: AlcoholChartBar[];
	fermentationTimelineData: FermentationTimelineBar[];
	ratingsChartData: RatingsChartBar[];
	topBrandsTimelineData: TopBrandsTimelineBar[];
	morePopularBrandsData: Brand[];
};
