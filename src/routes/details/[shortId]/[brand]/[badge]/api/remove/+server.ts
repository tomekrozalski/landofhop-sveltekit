import { get } from 'svelte/store';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { removeViewFromAbove, removeCover, removeGallery } from '$lib/utils/api';
import authentication from '$lib/utils/stores/authentication';
import { basics, beverages } from '$db/mongo';

export const DELETE: RequestHandler = async ({ params }) => {
	const { badge, brand, shortId } = params;

	if (!get(authentication).isLoggedIn) {
		throw error(401, 'Unauthorized. Cannot remove beverage');
	}

	const beverageToRemove = await beverages.findOne({ badge, shortId });

	if (!beverageToRemove) {
		throw error(404, 'Could not find the beverage');
	}

	const path = `${brand}/${badge}/${shortId}`;

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
		badge,
		'label.general.brand.badge': brand
	});

	await basics.deleteOne({
		shortId,
		badge,
		'brand.badge': brand
	});

	return json({
		message: 'Beverage successfully removed'
	});
};
