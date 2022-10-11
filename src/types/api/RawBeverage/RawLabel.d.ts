import type { LanguageValue } from '$types/common/LanguageValue';
import { RawBrewing } from './RawBrewing';
import { RawContainer } from './RawContainer';
import { RawImpressions } from './RawImpressions';
import { RawIngredientsInfo } from './RawIngredientsInfo';
import { RawInstitution } from './RawInstitution';
import { RawPlace } from './RawPlace';
import { RawPrice } from './RawPrice';
import { RawTale } from './RawTale';

export type RawLabelGeneral = {
	name: LanguageValue[];
	series?: LanguageValue[];
	brand: RawInstitution;
	cooperation?: RawInstitution[];
	contract?: RawInstitution;
	isContract?: boolean;
	place?: RawPlace;
	remark?: LanguageValue[];
	tale?: RawTale[];
	barcode?: string;
};

export type RawLabel = {
	general: RawLabelGeneral;
	brewing?: RawBrewing;
	ingredients?: RawIngredientsInfo;
	impressions?: RawImpressions;
	container: RawContainer;
	price?: RawPrice[];
};
