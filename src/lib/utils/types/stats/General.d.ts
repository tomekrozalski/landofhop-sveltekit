import LanguageValue from '$lib/utils/types/common/LanguageValue';
import { Fermentation } from '$lib/utils/enums/Beverage';
import type { IngredientTree } from '$lib/utils/types/Ingredient';

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
	topBrandsTimelineData: TopBrandsTimelineBar[];
	morePopularBrandsData: Brand[];
};

export type IngredientsStatsNavigation = {
	active?: boolean;
	badge: string;
	occurrences: number;
}[];

export type IngredientsStats = {
	navigation: IngredientsStatsNavigation;
	tree: IngredientTree;
};
