import { get } from 'svelte/store';
import { styleStore } from '$lib/utils/stores/selects';
import type { LanguageValue } from '$types/LanguageValue.d';
import type { Style } from '$lib/utils/stores/types/Style.d';

type Output = {
	badge: string;
	name: LanguageValue[];
};

export const formatStyleByBadge = (value: string): Output => {
	const { badge, name } = get(styleStore).find(({ badge }) => badge === value) as Style;

	return { badge, name };
};
