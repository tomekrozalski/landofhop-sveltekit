import { authenticate, getDbCollections, removeViewFromAbove } from '$lib/utils/api';

export async function del({ params, request }) {
	const { shortId } = params;
	const { beverages } = await getDbCollections();
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

	await removeViewFromAbove(`${brand}/${name}/${shortId}`);

	await beverages.updateOne({ shortId }, { $unset: { 'editorial.photos.viewFromAbove': '' } });
	const updatedBeverage = await beverages.findOne({ shortId });

	return {
		headers,
		body: {
			...(updatedBeverage.editorial?.photos && { ...updatedBeverage.editorial.photos }),
			type: updatedBeverage.label.container.type
		}
	};
}
