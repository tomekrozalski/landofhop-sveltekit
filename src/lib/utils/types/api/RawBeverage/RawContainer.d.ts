import {
	ContainerColor,
	ContainerMaterial,
	ContainerType,
	ContainerUnit
} from '$lib/utils/enums/Beverage.enum';

export type RawContainer = {
	color: ContainerColor;
	material: ContainerMaterial;
	unit: ContainerUnit;
	type: ContainerType;
	value: number;
	hasCork?: boolean;
	hasCapWireFlip?: boolean;
};
