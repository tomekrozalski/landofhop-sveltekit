import { get } from 'svelte/store';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { getDbCollections, removeViewFromAbove, removeCover, removeGallery } from '$lib/utils/api';
import authentication from '$lib/utils/stores/authentication';

export const DELETE: RequestHandler = async ({ params }) => {
	const { shortId } = params;
	const { basics, beverages } = await getDbCollections();

	if (!get(authentication).isLoggedIn) {
		throw error(401, 'Unauthorized. Cannot remove beverage');
	}

	const beverageToRemove = await beverages.findOne({ shortId });

	if (!beverageToRemove) {
		throw error(404, 'Could not find the beverage');
	}

	const name = beverageToRemove.badge;
	const brand = beverageToRemove.label.general.brand.badge;
	const path = `${brand}/${name}/${shortId}`;

	try {
		if (beverageToRemove.editorial?.photos?.cover) {
			await removeCover(path);
		}

		if (beverageToRemove.editorial?.photos?.gallery) {
			await removeGallery(path, beverageToRemove.editorial.photos.gallery);
		}

		if (beverageToRemove.editorial?.photos?.viewFromAbove) {
			await removeViewFromAbove(path);
		}
	} catch {
		throw error(500, 'Removing images failed');
	}

	await beverages.deleteOne({
		shortId,
		badge: name,
		'label.general.brand.badge': brand
	});

	await basics.deleteOne({
		shortId,
		badge: name,
		'brand.badge': brand
	});

	return json({
		message: 'Beverage successfully removed'
	});
};
