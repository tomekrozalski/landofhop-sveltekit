export type Navigation = {
	active?: boolean;
	badge: string;
	occurrences: number;
}[];

type IngredientTree = {
	badge: string;
	name: LanguageValue;
	occurrences: {
		alone: number;
		withSuccessors: number;
	};
	successors?: IngredientTree[];
	successorsList?: string[];
};

export type IngredientsStats = {
	navigation: IngredientsStatsNavigation;
	tree: IngredientTree;
};
