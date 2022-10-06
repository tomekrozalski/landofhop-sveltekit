import { get } from 'svelte/store';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import authentication from '$lib/utils/stores/authentication';

export const POST: RequestHandler = async ({ request }) => {
	if (!get(authentication).isLoggedIn) {
		throw error(401, 'Unauthorized. Cannot translate');
	}

	const { queries = [], source = 'pl', target = 'en' } = await request.json();

	const urlParts = [
		'https://www.googleapis.com/language/translate/v2/',
		'?key=' + import.meta.env.VITE_GCP_KEY,
		`&target=${target}`,
		`&source=${source}`,
		`&format=text`,
		...queries.map((query: string) => `&q=${query}`)
	];

	const response = await fetch(urlParts.join(''));
	const data = await response.json();
	const formattedData = data.data.translations.map(({ translatedText }) => translatedText);

	return json(formattedData);
};
