import type { LanguageValue } from '$lib/utils/types/common/LanguageValue';
import { ContainerType } from '$lib/utils/enums/Beverage.enum';

export type RawBasics = {
	_id: string;
	shortId: string;
	badge: string;
	brand: {
		badge: string;
		name: LanguageValue[];
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
