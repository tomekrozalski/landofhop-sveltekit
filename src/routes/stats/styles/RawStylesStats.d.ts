import { StyleGroup } from '$lib/utils/enums/StyleGroup.enum';
import type { LanguageValue } from '$types/common/LanguageValue.d';

export type RawStylesStats = {
	amount: number;
	badge: string;
	name: LanguageValue;
	group: StyleGroup;
};
