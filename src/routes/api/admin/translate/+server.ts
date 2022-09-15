import { json as json$1 } from '@sveltejs/kit';

export async function POST({ locals, request }) {
	if (!locals.authenticated) {
		return json$1({
			message: 'Unauthorized. Cannot translate'
		}, {
			status: 401
		});
	}

	const { queries = [], source = 'pl', target = 'en' } = await request.json();

	const urlParts = [
		'https://www.googleapis.com/language/translate/v2/',
		'?key=' + import.meta.env.VITE_GCP_KEY,
		`&target=${target}`,
		`&source=${source}`,
		`&format=text`,
		...queries.map((query) => `&q=${query}`)
	];

	const response = await fetch(urlParts.join(''));
	const data = await response.json();

	throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
	// Suggestion (check for correctness before using):
	// return new Response(data.data.translations.map(({ translatedText }) => translatedText));
	return {
		body: data.data.translations.map(({ translatedText }) => translatedText)
	};
}
