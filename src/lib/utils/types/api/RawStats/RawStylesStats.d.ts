import { StyleGroup } from '$lib/utils/enums/StyleGroup.enum';
import type { LanguageValue } from '$lib/utils/types/common/LanguageValue';

export type RawStylesStats = {
	amount: number;
	badge: string;
	name: LanguageValue;
	group: StyleGroup;
};
