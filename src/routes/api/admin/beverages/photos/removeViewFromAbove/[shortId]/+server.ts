import { get } from 'svelte/store';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { removeViewFromAbove } from '$lib/utils/api';
import authentication from '$lib/utils/stores/authentication';
import { beverages } from '$db/mongo';

export const DELETE: RequestHandler = async ({ params }) => {
	const { shortId } = params;

	if (!get(authentication).isLoggedIn) {
		throw error(401, 'Unauthorized. Cannot remove beverage');
	}

	const beverageToRemove = await beverages.findOne({ shortId });

	if (!beverageToRemove) {
		return json(
			{
				message: 'Could not find the beverage'
			},
			{
				status: 404
			}
		);
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
};
