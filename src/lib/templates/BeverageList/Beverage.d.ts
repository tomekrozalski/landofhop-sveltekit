import type { LanguageValue } from '$types/LanguageValue.d';

export type Beverage = {
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
