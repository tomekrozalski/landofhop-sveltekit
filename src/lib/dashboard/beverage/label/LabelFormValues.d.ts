import type { InstitutionInsideBeverage } from '$lib/utils/types/Institution';
import type { Price } from '$lib/utils/types/Beverage/fragments/Price';
import type { Tale } from '$lib/utils/types/Beverage/fragments/Tale';
import type { LanguageValue } from '$lib/utils/types/common/LanguageValue';
import {
	AlcoholRelate,
	AlcoholScope,
	AlcoholUnit,
	ContainerColor,
	ContainerMaterial,
	ContainerType,
	ContainerUnit,
	ExtractRelate,
	ExtractUnit,
	Fermentation
} from '$lib/utils/enums/Beverage.enum';

export type LabelFormValues = {
	badge: string;
	// -----------
	name: {
		language: string;
		value: string;
	}[];
	series: {
		language: string;
		value: string;
	}[];
	brand: string;
	cooperation: string[] | null;
	contract: string | null;
	place: string | null;
	remark: {
		language: string;
		value: string;
	}[];
	tale: {
		article: string;
		language: string;
		lead: string;
	}[];
	barcode: string | null;
	// -----------
	fermentation: Fermentation[] | null;
	style: {
		language: string;
		value: string;
	}[];
	extract: {
		value: string | null;
		unit: ExtractUnit | null;
		relate: ExtractRelate | null;
	};
	alcohol: {
		value: string | null;
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
		value: string;
	};
	price: {
		currency: string;
		date: string;
		shop: string | null;
		value: string;
	}[];
};

export type LabelFormOutput = {
	badge: string;
	// -----------
	name: LanguageValue[];
	series?: LanguageValue[];
	brand: InstitutionInsideBeverage;
	cooperation?: InstitutionInsideBeverage[];
	contract?: string;
	isContract?: true;
	place?: {
		city: LanguageValue[];
		country: string;
		shortId: string;
	};
	remark?: LanguageValue[];
	tale?: Tale[];
	barcode?: string;
	// -----------
	fermentation?: Fermentation[];
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
	price?: Price[];
};
