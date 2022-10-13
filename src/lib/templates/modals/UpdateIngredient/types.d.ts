import type { LanguageValue } from '$types/LanguageValue.d';
import type { IngredientType } from '$types/enums/Beverage.enum';

export type Input = {
	badge: string;
	name: {
		value: string;
		language: string;
	}[];
	occurrences: { alone: number; withSuccessors: number };
	parent: string;
	type: IngredientType;
};

export type Output = {
	badge: string;
	name: LanguageValue[];
	occurrences: {
		alone: number;
		withSuccessors: number;
	};
	parent?: string;
	type: IngredientType;
};
