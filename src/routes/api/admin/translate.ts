import { authenticate } from '$lib/utils/api';

export async function post({ request }) {
	const [isAuthenticated, headers] = await authenticate(request);

	if (!isAuthenticated) {
		return {
			status: 401,
			body: {
				message: 'Unauthorized. Cannot translate'
			}
		};
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

	return {
		headers,
		body: data.data.translations.map(({ translatedText }) => translatedText)
	};
}
