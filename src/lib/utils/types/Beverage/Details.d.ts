import { LanguageValue } from 'utils/types/common';
import {
	AlcoholRelate,
	AlcoholScope,
	AlcoholUnit,
	Clarity,
	ExpirationDateUnit,
	ExtractRelate,
	ExtractUnit,
	Fermentation,
	HopRateUnit,
	IngredientType,
	TemperatureUnit
} from 'utils/enums/Beverage';
import { Aged, Container, Price, Tale } from './fragments';

export type Details = {
	shortId: string;
	badge: string;
	name: LanguageValue;
	series?: {
		label?: LanguageValue[];
		producer?: LanguageValue[];
	};
	brand: InsitutionOutput;
	cooperation?: {
		label?: InsitutionOutput[];
		producer?: InsitutionOutput[];
		editorial?: InsitutionOutput[];
	};
	contract?: {
		label?: InsitutionOutput;
		producer?: InsitutionOutput;
		editorial?: InsitutionOutput;
	};
	isContract?: {
		label?: boolean;
		producer?: boolean;
		editorial?: boolean;
	};
	place?: {
		label?: {
			city: LanguageValue;
			country: string;
		};
		producer?: {
			city: LanguageValue;
			country: string;
		};
		editorial?: {
			city: LanguageValue;
			country: string;
		};
	};
	remark?: {
		label?: LanguageValue;
		producer?: LanguageValue;
		editorial?: LanguageValue;
	};
	tale?: {
		label?: Tale[];
		producer?: Tale;
	};
	barcode?: string;
	fermentation?: {
		label?: Fermentation[];
		producer?: Fermentation[];
		editorial?: Fermentation[];
	};
	extract?: {
		label?: {
			relate: ExtractRelate;
			unit: ExtractUnit;
			value: number;
		};
		producer?: {
			relate: ExtractRelate;
			unit: ExtractUnit;
			value: number;
		};
	};
	alcohol?: {
		label?: {
			relate: AlcoholRelate;
			unit: AlcoholUnit;
			value: number;
			scope?: AlcoholScope;
		};
		producer?: {
			relate: AlcoholRelate;
			unit: AlcoholUnit;
			value: number;
			scope?: AlcoholScope;
		};
		editorial?: {
			scope: AlcoholScope;
		};
	};
	filtration?: {
		label?: boolean;
		producer?: boolean;
		editorial?: boolean;
	};
	pasteurization?: {
		label?: boolean;
		producer?: boolean;
		editorial?: boolean;
	};
	isAged?: {
		label?: boolean;
		producer?: boolean;
		editorial?: boolean;
	};
	aged?: {
		label?: Aged[];
		producer?: Aged[];
		editorial?: Aged[];
	};
	style?: {
		label?: LanguageValue[];
		producer?: LanguageValue[];
		editorial?: LanguageValue[];
	};
	isDryHopped?: {
		label?: boolean;
		producer?: boolean;
		editorial?: boolean;
	};
	dryHopped?: {
		label?: {
			badge: string;
			name: LanguageValue;
			type: IngredientType;
		}[];
		producer?: {
			badge: string;
			name: LanguageValue;
			type: IngredientType;
		}[];
		editorial?: {
			badge: string;
			name: LanguageValue;
			type: IngredientType;
		}[];
	};
	hopRate?: {
		label?: {
			unit: HopRateUnit;
			value: number;
		};
		producer?: {
			unit: HopRateUnit;
			value: number;
		};
	};
	expirationDate?: {
		label?: {
			value: number;
			unit: ExpirationDateUnit;
		};
		producer?: {
			value: number;
			unit: ExpirationDateUnit;
		};
	};
	ingredients?: {
		label?: {
			complete: boolean;
			language: string;
			list: string[];
		};
		producer?: {
			complete: boolean;
			language: string;
			list: string[];
		};
	};
	ingredientsTags?: {
		label?: {
			badge: string;
			name: LanguageValue;
			type: IngredientType;
		}[];
		producer?: {
			badge: string;
			name: LanguageValue;
			type: IngredientType;
		}[];
	};
	smokedMalt?: {
		label?: boolean;
		producer?: boolean;
	};
	bitterness?: {
		label?: number;
		producer?: number;
	};
	sweetness?: {
		label?: number;
		producer?: number;
	};
	fullness?: {
		label?: number;
		producer?: number;
	};
	power?: {
		label?: number;
		producer?: number;
	};
	hoppyness?: {
		label?: number;
		producer?: number;
	};
	temperature?: {
		label?: {
			from: number;
			to: number;
			unit: TemperatureUnit;
		};
		producer?: {
			from: number;
			to: number;
			unit: TemperatureUnit;
		};
	};
	color?: {
		editorial?: string;
	};
	clarity?: {
		editorial?: Clarity;
	};
	container: Container;
	price?: {
		label?: Price[];
		producer?: Price[];
		editorial?: Price[];
	};
	photos?: {
		cap?: boolean;
		gallery?: number;
		outline?: string;
	};
	added: string;
	updated?: string;
};
