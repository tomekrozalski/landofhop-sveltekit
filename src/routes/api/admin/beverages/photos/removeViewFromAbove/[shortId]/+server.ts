import { json } from '@sveltejs/kit';
import { getDbCollections, removeViewFromAbove } from '$lib/utils/api';

export async function DELETE({ locals, params }) {
	const { shortId } = params;
	const { beverages } = await getDbCollections();

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

	await removeViewFromAbove(`${brand}/${name}/${shortId}`);

	await beverages.updateOne({ shortId }, { $unset: { 'editorial.photos.viewFromAbove': '' } });
	const updatedBeverage = await beverages.findOne({ shortId });

	return json({
		...(updatedBeverage.editorial?.photos && { ...updatedBeverage.editorial.photos }),
		type: updatedBeverage.label.container.type
	});
}
