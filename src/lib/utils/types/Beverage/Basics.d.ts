import type { LanguageValue } from '$lib/utils/types/common/LanguageValue';
import { ContainerType } from '$lib/utils/enums/Beverage';

export type Basics = {
	shortId: string;
	badge: string;
	brand: {
		badge: string;
		name: LanguageValue;
	};
	name: LanguageValue;
	coverImage?: {
		height: number;
		width: number;
		outline: string;
	};
	containerType: ContainerType;
	added: string;
};
