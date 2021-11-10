import type { ContainerType } from '$lib/utils/enums/Beverage.enum';

export type PhotosData = {
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
};

// Type for dashboard update beverage photos
export type PhotosDataWithContainerType = PhotosData & { type: ContainerType };
