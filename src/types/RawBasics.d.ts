import type { ContainerType } from './enums/Beverage.enum';
import type { LanguageValue } from './LanguageValue.d';

export type RawBasics = {
	_id: string;
	shortId: string;
	badge: string;
	brand: {
		badge: string;
		name: LanguageValue[];
		shortId: string;
	};
	name: LanguageValue[];
	coverImage?: {
		height: number;
		width: number;
		outlines: string;
	};
	containerType: ContainerType;
	added: Date;
};
