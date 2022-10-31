import type { ContainerType } from '$types/enums/Beverage.enum';

export type PhotosDataTypes = {
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
	type: ContainerType;
};
