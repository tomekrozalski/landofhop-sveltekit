import type { LanguageValue } from '$lib/utils/types/common/LanguageValue';
import { RawBrewing } from './RawBrewing';
import { RawImpressions } from './RawImpressions';
import { RawIngredientsInfo } from './RawIngredientsInfo';
import { RawInstitution } from './RawInstitution';
import { RawPlace } from './RawPlace';
import { RawPrice } from './fragments/RawPrice';
import { RawTale } from './fragments/RawTale';

export type RawProducerGeneral = {
	series?: LanguageValue[];
	brand?: RawInstitution;
	cooperation?: RawInstitution[];
	contract?: RawInstitution;
	isContract?: boolean;
	place?: RawPlace;
	remark?: LanguageValue[];
	tale?: RawTale[];
};

export type RawProducer = {
	general?: RawProducerGeneral;
	brewing?: RawBrewing;
	ingredients?: RawIngredientsInfo;
	impressions?: RawImpressions;
	price?: RawPrice[];
};
