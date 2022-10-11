import { RawIngredientTag } from './RawIngredientTag';
import { RawIngredientDescriptive } from './RawIngredientDescriptive';

export type RawIngredientsInfo = {
	descriptive?: RawIngredientDescriptive[];
	tags?: RawIngredientTag[];
	smokedMalt?: boolean;
};
