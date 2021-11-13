import { StyleGroup } from '$lib/utils/enums/StyleGroup.enum';
import { LanguageValue } from '$lib/utils/types/common/LanguageValue';

export type StylesStats = {
	amount: number;
	badge: string;
	name: LanguageValue;
	group: StyleGroup;
};
