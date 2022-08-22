import { getDbCollections, removeViewFromAbove, removeCover, removeGallery } from '$lib/utils/api';

export async function del({ locals, params }) {
	const { shortId } = params;
	const { basics, beverages } = await getDbCollections();

	if (!locals.authenticated) {
		return {
			status: 401,
			body: {
				message: 'Unauthorized. Cannot remove beverage'
			}
		};
	}

	const beverageToRemove = await beverages.findOne({ shortId });

	if (!beverageToRemove) {
		return {
			status: 404,
			body: {
				message: 'Could not find the beverage'
			}
		};
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
		return {
			status: 500,
			body: {
				message: 'Removing images failed'
			}
		};
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

	return {
		body: {
			message: 'Beverage successfully removed'
		}
	};
}
