import type { LanguageValue } from '$types/common/LanguageValue';
import { ContainerType } from '$lib/utils/enums/Beverage.enum';

export type RawCommonBasicsBeverage = {
	_id?: string;
	badge: string;
	shortId: string;
	added: Date;
	updated?: Date;
};

export type RawBasicsCoverImage = {
	height: number;
	width: number;
	outlines: string;
};

export type RawBasicsWithoutId = {
	shortId: string;
	badge: string;
	brand: {
		badge: string;
		name: LanguageValue[];
	};
	name: LanguageValue[];
	coverImage?: RawBasicsCoverImage;
	containerType: ContainerType;
	added: Date;
};

export type RawBasics = RawBasicsWithoutId & {
	_id: string;
};
