import { get } from 'svelte/store';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { removeViewFromAbove } from '$lib/utils/api';
import authentication from '$lib/utils/stores/authentication';
import { beverages } from '$db/mongo';

export const DELETE: RequestHandler = async ({ params }) => {
	const { badge, brand, shortId } = params;

	if (!get(authentication).isLoggedIn) {
		throw error(401, 'Unauthorized. Cannot remove beverage');
	}

	const beverageToRemove = await beverages.findOne({ badge, shortId });

	if (!beverageToRemove) {
		throw error(404, 'Could not find the beverage');
	}

	await removeViewFromAbove(`${brand}/${badge}/${shortId}`);

	await beverages.updateOne({ shortId }, { $unset: { 'editorial.photos.viewFromAbove': '' } });
	const updatedBeverage = await beverages.findOne({ shortId });

	return json({
		...(updatedBeverage.editorial?.photos && { ...updatedBeverage.editorial.photos }),
		type: updatedBeverage.label.container.type
	});
};
