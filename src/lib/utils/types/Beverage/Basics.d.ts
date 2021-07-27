import { LanguageValue } from '$lib/utils/types/common/LanguageValue';
import { ContainerType } from '$lib/utils/enums/Beverage';

export type Basics = {
	id: string;
	shortId: string;
	badge: string;
	brand: {
		badge: string;
		name: LanguageValue;
	};
	name: LanguageValue;
	photos?: {
		cover?: {
			height: number;
			width: number;
		};
		outlines?: {
			cover?: string;
		};
	};
	container: {
		type: ContainerType;
	};
	added: Date;
};
