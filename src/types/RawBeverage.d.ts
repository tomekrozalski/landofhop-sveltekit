import {
	AgedPreviousContent,
	AgedTimeUnit,
	AgedType,
	AgedWood,
	AlcoholRelate,
	AlcoholScope,
	AlcoholUnit,
	Clarity,
	ContainerColor,
	ContainerMaterial,
	ContainerType,
	ContainerUnit,
	Currency,
	ExpirationDateUnit,
	ExtractRelate,
	ExtractUnit,
	Fermentation,
	HopRateUnit,
	IngredientType,
	TemperatureUnit
} from './enums/Beverage.enum';
import type { LanguageValue } from './LanguageValue.d';

export type RawBeverage = {
	_id: string;
	shortId: string;
	badge: string;
	// label
	label: {
		general: {
			name: LanguageValue[];
			series?: LanguageValue[];
			brand: {
				badge: string;
				name: LanguageValue[];
				shortId: string;
				owner?: {
					badge: string;
					name: LanguageValue[];
					shortId: string;
				};
			};
			cooperation?: {
				badge: string;
				name: LanguageValue[];
				shortId: string;
				owner?: {
					badge: string;
					name: LanguageValue[];
					shortId: string;
				};
			}[];
			contract?: {
				badge: string;
				name: LanguageValue[];
				shortId: string;
				owner?: {
					badge: string;
					name: LanguageValue[];
					shortId: string;
				};
			};
			isContract?: boolean;
			place?: {
				city: LanguageValue[];
				country: string;
				shortId: string;
			};
			remark?: LanguageValue[];
			tale?: {
				article?: string;
				language: string;
				lead: string;
			}[];
			barcode?: string;
		};
		brewing?: {
			fermentation?: Fermentation[];
			extract?: {
				relate: ExtractRelate;
				unit: ExtractUnit;
				value: number;
			};
			alcohol?: {
				relate: AlcoholRelate;
				unit: AlcoholUnit;
				value: number;
				scope?: AlcoholScope;
			};
			filtration?: boolean;
			pasteurization?: boolean;
			aged?: {
				type?: AgedType;
				wood?: AgedWood;
				time?: {
					value: number;
					unit: AgedTimeUnit;
				};
				previousContent?: AgedPreviousContent[];
			}[];
			style?: LanguageValue[];
			isDryHopped?: boolean;
			dryHopped?: {
				badge: string;
				name: LanguageValue[];
				type: IngredientType;
			}[];
			hopRate?: {
				unit: HopRateUnit;
				value: number;
			};
			nitrogen?: boolean;
			expirationDate?: {
				value: number;
				unit: ExpirationDateUnit;
			};
		};
		ingredients?: {
			descriptive?: {
				complete: boolean;
				language: string;
				list: string[];
			}[];
			tags?: {
				badge: string;
				name: LanguageValue[];
				type: IngredientType;
			}[];
			smokedMalt?: boolean;
		};
		impressions?: {
			bitterness?: number;
			sweetness?: number;
			fullness?: number;
			power?: number;
			hoppyness?: number;
			temperature?: {
				from: number;
				to: number;
				unit: TemperatureUnit;
			};
		};
		container: {
			color: ContainerColor;
			material: ContainerMaterial;
			unit: ContainerUnit;
			type: ContainerType;
			value: number;
			hasCork?: boolean;
			hasCapWireFlip?: boolean;
		};
		price?: {
			currency: Currency;
			date: Date;
			shop?: string;
			value: number;
		}[];
	};
	// producer
	producer?: {
		general?: {
			series?: LanguageValue[];
			brand?: {
				badge: string;
				name: LanguageValue[];
				shortId: string;
				owner?: {
					badge: string;
					name: LanguageValue[];
					shortId: string;
				};
			};
			cooperation?: {
				badge: string;
				name: LanguageValue[];
				shortId: string;
				owner?: {
					badge: string;
					name: LanguageValue[];
					shortId: string;
				};
			}[];
			contract?: {
				badge: string;
				name: LanguageValue[];
				shortId: string;
				owner?: {
					badge: string;
					name: LanguageValue[];
					shortId: string;
				};
			};
			isContract?: boolean;
			place?: {
				city: LanguageValue[];
				country: string;
				shortId: string;
			};
			remark?: LanguageValue[];
			tale?: {
				article?: string;
				language: string;
				lead: string;
			}[];
		};
		brewing?: {
			fermentation?: Fermentation[];
			extract?: {
				relate: ExtractRelate;
				unit: ExtractUnit;
				value: number;
			};
			alcohol?: {
				relate: AlcoholRelate;
				unit: AlcoholUnit;
				value: number;
				scope?: AlcoholScope;
			};
			filtration?: boolean;
			pasteurization?: boolean;
			aged?: {
				type?: AgedType;
				wood?: AgedWood;
				time?: {
					value: number;
					unit: AgedTimeUnit;
				};
				previousContent?: AgedPreviousContent[];
			}[];
			style?: LanguageValue[];
			isDryHopped?: boolean;
			dryHopped?: {
				badge: string;
				name: LanguageValue[];
				type: IngredientType;
			}[];
			hopRate?: {
				unit: HopRateUnit;
				value: number;
			};
			nitrogen?: boolean;
			expirationDate?: {
				value: number;
				unit: ExpirationDateUnit;
			};
		};
		ingredients?: {
			descriptive?: {
				complete: boolean;
				language: string;
				list: string[];
			}[];
			tags?: {
				badge: string;
				name: LanguageValue[];
				type: IngredientType;
			}[];
			smokedMalt?: boolean;
		};
		impressions?: {
			bitterness?: number;
			sweetness?: number;
			fullness?: number;
			power?: number;
			hoppyness?: number;
			temperature?: {
				from: number;
				to: number;
				unit: TemperatureUnit;
			};
		};
		price?: {
			currency: Currency;
			date: Date;
			shop?: string;
			value: number;
		}[];
	};
	// editorial
	editorial?: {
		general?: {
			series?: LanguageValue[];
			cooperation?: {
				badge: string;
				name: LanguageValue[];
				shortId: string;
				owner?: {
					badge: string;
					name: LanguageValue[];
					shortId: string;
				};
			}[];
			contract?: {
				badge: string;
				name: LanguageValue[];
				shortId: string;
				owner?: {
					badge: string;
					name: LanguageValue[];
					shortId: string;
				};
			};
			isContract?: boolean;
			place?: {
				city: LanguageValue[];
				country: string;
				shortId: string;
			};
			remark?: LanguageValue[];
		};
		brewing?: {
			fermentation?: Fermentation[];
			styleTags?: {
				badge: string;
				name: LanguageValue[];
			}[];
			alcohol?: {
				scope: AlcoholScope;
			};
			filtration?: boolean;
			pasteurization?: boolean;
			aged?: {
				type?: AgedType;
				wood?: AgedWood;
				time?: {
					value: number;
					unit: AgedTimeUnit;
				};
				previousContent?: AgedPreviousContent[];
			}[];
			isDryHopped?: boolean;
			dryHopped?: {
				badge: string;
				name: LanguageValue[];
				type: IngredientType;
			}[];
			nitrogen?: boolean;
		};
		impressions?: {
			color?: string;
			clarity?: Clarity;
		};
		ratings?: {
			rateBeer: {
				beverageId: number;
				quantity?: number;
				value?: number;
				date?: Date;
			};
			untappd: {
				beverageSlug: string;
				quantity?: number;
				value?: number;
				date?: Date;
			};
			total?: {
				quantity: number;
				value: number;
				date?: Date;
			};
		};
		price?: {
			currency: Currency;
			date: Date;
			shop?: string;
			value: number;
		}[];
		photos?: {
			cap?: boolean;
			cover?: {
				height: number;
				width: number;
			};
			gallery?: number;
			outlines?: {
				cover?: string;
				gallery?: string;
			};
			viewFromAbove?: boolean;
		};
		notes?: string;
	};
	added: Date;
	updated?: Date;
};
