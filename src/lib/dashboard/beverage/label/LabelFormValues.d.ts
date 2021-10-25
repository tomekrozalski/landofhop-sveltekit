import type { InstitutionInsideBeverage } from '$lib/utils/types/Institution';
import type { Tale } from '$lib/utils/types/Beverage/fragments/Tale';
import {
	AlcoholRelate,
	AlcoholScope,
	AlcoholUnit,
	ContainerColor,
	ContainerMaterial,
	ContainerType,
	ContainerUnit,
	ExtractRelate,
	ExtractUnit
} from '$lib/utils/enums/Beverage.enum';

type LanguageValue = {
	language: string;
	value: string;
};

export type LabelFormValues = {
	badge: string;
	// -----------
	name: LanguageValue[];
	series: LanguageValue[];
	brand: string;
	cooperation: string[] | null;
	tale: {
		article: string;
		language: string;
		lead: string;
	}[];
	barcode: string | null;
	// -----------
	// fermentation: null,
	style: LanguageValue[];
	extract: {
		value: number | null;
		unit: ExtractUnit | null;
		relate: ExtractRelate | null;
	};
	alcohol: {
		value: number | null;
		unit: AlcoholUnit | null;
		relate: AlcoholRelate | null;
		scope: AlcoholScope | '--' | null;
	};
	filtration: boolean | null;
	pasteurization: boolean | null;
	// -----------
	container: {
		color: ContainerColor | string;
		hasCapWireFlip: boolean;
		hasCork: boolean;
		material: ContainerMaterial | string;
		type: ContainerType | string;
		unit: ContainerUnit | string;
		value: number;
	};
};

export type LabelFormOutput = {
	badge: string;
	// -----------
	name: {
		language?: string;
		value: string;
	}[];
	series?: {
		language?: string;
		value: string;
	}[];
	brand: InstitutionInsideBeverage;
	cooperation?: InstitutionInsideBeverage[];
	tale?: Tale[];
	barcode?: string;
	// -----------
	style?: LanguageValue[];
	extract?: {
		value: number;
		unit: ExtractUnit;
		relate: ExtractRelate;
	};
	alcohol?: {
		value: number;
		unit: AlcoholUnit;
		relate: AlcoholRelate;
		scope?: AlcoholScope;
	};
	filtration?: boolean;
	pasteurization?: boolean;
	// -----------
	container: {
		color: ContainerColor;
		hasCapWireFlip?: boolean;
		hasCork?: boolean;
		material: ContainerMaterial;
		type: ContainerType;
		unit: ContainerUnit;
		value: number;
	};
};
