import { get } from 'svelte/store';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { getDbCollections } from '$lib/utils/api';
import authentication from '$lib/utils/stores/authentication';

export const GET: RequestHandler = async ({ params }) => {
	const shortId = params.shortId ?? '';
	const { beverages } = await getDbCollections();

	if (!get(authentication).isLoggedIn) {
		throw error(401, 'Unauthorized. Cannot get admin beverage photos');
	}

	const data = await beverages.findOne({ shortId });

	if (!data) {
		throw error(404, 'No beverage found');
	}

	const formattedData = {
		...(data.editorial?.photos && { ...data.editorial.photos }),
		type: data.label.container.type
	};

	return json(formattedData);
};
