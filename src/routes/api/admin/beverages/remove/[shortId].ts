import { authenticate, getDbCollections } from '$lib/utils/api';

export async function del({ params, request }) {
	const { shortId } = params;
	const { basics, beverages } = await getDbCollections();
	const [isAuthenticated, headers] = await authenticate(request);

	if (!isAuthenticated) {
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

	console.log('!', name, brand);

	try {
		if (beverageToRemove.editorial?.photos?.cover) {
			// await fetch(`${Deno.env.get("IMAGES_API")}/beverage/remove/cover`, {
			// 	method: "DELETE",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// 	body: JSON.stringify({ path: `${brand}/${name}/${shortId}` }),
			// });
		}

		if (beverageToRemove.editorial?.photos?.gallery) {
			// await fetch(`${Deno.env.get("IMAGES_API")}/beverage/remove/gallery`, {
			// 	method: "DELETE",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// 	body: JSON.stringify({
			// 		path: `${brand}/${name}/${shortId}`,
			// 		files: beverageToRemove.editorial.photos.gallery,
			// 	}),
			// });
		}

		if (beverageToRemove.editorial?.photos?.cap) {
			// await fetch(`${Deno.env.get("IMAGES_API")}/beverage/remove/cap`, {
			// 	method: "DELETE",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// 	body: JSON.stringify({ path: `${brand}/${name}/${shortId}` }),
			// });
		}
	} catch (error) {
		return {
			headers,
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
		headers,
		body: {
			message: 'Beverage successfully removed'
		}
	};
}
