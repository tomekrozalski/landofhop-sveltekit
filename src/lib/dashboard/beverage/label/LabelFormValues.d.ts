import type { InstitutionInsideBeverage } from '$lib/utils/types/Institution';
import type { Tale } from '$lib/utils/types/Beverage/fragments/Tale';
import {
	ContainerColor,
	ContainerMaterial,
	ContainerType,
	ContainerUnit
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
	tale: {
		article: string;
		language: string;
		lead: string;
	}[];
	barcode: string | null;
	// -----------
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
