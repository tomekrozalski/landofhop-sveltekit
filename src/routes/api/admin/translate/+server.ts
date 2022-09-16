import { json } from '@sveltejs/kit';

export async function POST({ locals, request }) {
	if (!locals.authenticated) {
		return json(
			{
				message: 'Unauthorized. Cannot translate'
			},
			{
				status: 401
			}
		);
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
	const formattedData = data.data.translations.map(({ translatedText }) => translatedText);

	return json(formattedData);
}
