import { get } from 'svelte/store';
import type { LanguageValue } from '$types/LanguageValue.d';
import type { Place } from '$lib/utils/stores/types/Place.d';
import { placeStore } from '$lib/utils/stores/selects';

type Output = {
	city: LanguageValue[];
	country: string;
	shortId: string;
};

export const formatPlaceByShortId = (value: string): Output => {
	const { city, country, shortId } = get(placeStore).find(
		({ shortId }) => shortId === value
	) as Place;

	return { city, country, shortId };
};
