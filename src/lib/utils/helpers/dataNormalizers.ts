import { get } from 'svelte/store';
import type { LanguageValue } from '$types/LanguageValue.d';
import { ingredientsStore, placeStore, styleStore } from '$lib/utils/stores/selects';

export function formatTaleArray({
	article,
	language,
	lead
}: {
	article: string;
	language: string;
	lead: string;
}) {
	return {
		...(article && { article: article.trim() }),
		language,
		lead: lead.trim()
	};
}

export function parseFieldNumber(value: string): number {
	return +value.toString().replace(',', '.');
}

export function formatDateFromString(value: string): Date {
	const [day, month, year] = value.split('.');

	return new Date(`${year}-${month}-${day}`);
}

export function formatPlaceByShortId(value: string): {
	city: LanguageValue[];
	country: string;
	shortId: string;
} {
	const { city, country, shortId } = get(placeStore).find(({ shortId }) => shortId === value);

	return { city, country, shortId };
}

export function formatIngredientByBadge(value: string) {
	const { badge, name, type } = get(ingredientsStore).find(({ badge }) => badge === value);

	return { badge, name, type };
}

export function formatStyleByBadge(value: string) {
	const { badge, name } = get(styleStore).find(({ badge }) => badge === value);

	return { badge, name };
}
