import { StyleGroup } from '$lib/utils/enums/StyleGroup.enum';
import type { LanguageValue } from '$types/common/LanguageValue';

export type RawStylesWithoutId = {
	_id: string;
	badge: string;
	name: LanguageValue[];
	group: StyleGroup;
};

export type RawStyles = RawStylesWithoutId & {
	_id: string;
};
