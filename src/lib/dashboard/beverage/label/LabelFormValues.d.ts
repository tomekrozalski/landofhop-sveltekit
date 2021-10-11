import type { InstitutionInsideBeverage } from '$lib/utils/types/Institution';
import {
	ContainerColor,
	ContainerMaterial,
	ContainerType,
	ContainerUnit
} from '$lib/utils/enums/Beverage.enum';

export type LabelFormValues = {
	badge: string;
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
	container: {
		color: ContainerColor;
		hasCapWireFlip: boolean;
		hasCork: boolean;
		material: ContainerMaterial;
		type: ContainerType;
		unit: ContainerUnit;
		value: number;
	};
};

export type LabelFormOutput = {
	badge: string;
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
