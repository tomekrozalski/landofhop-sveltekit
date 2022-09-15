import { json } from '@sveltejs/kit';
import { getDbCollections, removeViewFromAbove, removeCover, removeGallery } from '$lib/utils/api';

export async function DELETE({ locals, params }) {
	const { shortId } = params;
	const { basics, beverages } = await getDbCollections();

	if (!locals.authenticated) {
		return json({
			message: 'Unauthorized. Cannot remove beverage'
		}, {
			status: 401
		});
	}

	const beverageToRemove = await beverages.findOne({ shortId });

	if (!beverageToRemove) {
		return json({
			message: 'Could not find the beverage'
		}, {
			status: 404
		});
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

		if (beverageToRemove.editorial?.photos?.cap) {
			await removeViewFromAbove(path);
		}
	} catch (error) {
		return json({
			message: 'Removing images failed'
		}, {
			status: 500
		});
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
}
