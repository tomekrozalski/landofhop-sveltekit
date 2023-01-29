import { get } from 'svelte/store';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import authentication from '$lib/utils/stores/authentication';
import { places } from '$db/mongo';

export const PUT: RequestHandler = async ({ params, request }) => {
	if (!get(authentication).isLoggedIn) {
		throw error(401, 'Unauthorized. Cannot update ingredient');
	}

	const placeData = await request.json();
	const shortId = params.shortId ?? '';

	await places.updateOne({ shortId }, { $set: placeData });

	return json({ message: 'Place successfully updated' });
};
