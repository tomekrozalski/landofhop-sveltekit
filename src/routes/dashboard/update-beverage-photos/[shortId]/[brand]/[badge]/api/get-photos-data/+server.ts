import { get } from 'svelte/store';
import { error, json } from '@sveltejs/kit';
import { beverages } from '$db/mongo';
import authentication from '$lib/utils/stores/authentication';
import type { RequestHandler } from '@sveltejs/kit';
import type { PhotosDataTypes } from '../../utils/types.d';

export const GET: RequestHandler = async ({ params }) => {
	if (!get(authentication).isLoggedIn) {
		throw error(401, 'Unauthorized. Cannot get admin beverage photos');
	}

	const data = await beverages.findOne({ shortId: params.shortId });

	if (!data) {
		throw error(404, 'No beverage found');
	}

	const formattedData: PhotosDataTypes = {
		...(data.editorial?.photos && { ...data.editorial.photos }),
		type: data.label.container.type
	};

	return json(formattedData);
};
