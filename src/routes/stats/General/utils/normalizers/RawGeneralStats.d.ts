import type { LanguageValue } from '$types/LanguageValue.d';
import {
	AlcoholRelate,
	AlcoholScope,
	AlcoholUnit,
	ContainerType,
	ExtractRelate,
	ExtractUnit,
	Fermentation
} from '$types/enums/Beverage.enum';

export type RawGeneralStats = {
	shortId: string;
	brand: {
		badge: string;
		shortId: string;
		name: LanguageValue;
	};
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
	ratings?: number;
	container: {
		type: ContainerType;
	};
	added: Date;
};
