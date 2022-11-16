import { get } from 'svelte/store';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { beverages } from '$db/mongo';
import authentication from '$lib/utils/stores/authentication';
import updateRateBeerRating from './updateRateBeerRating';
import updateUntappdRating from './updateUntappdRating';

export const POST: RequestHandler = async ({ request }) => {
	if (!get(authentication).isLoggedIn) {
		throw error(401, 'Unauthorized. Cannot update beverage ratings');
	}

	const { rateBeerId, untappdBeverageSlug, beverageShortId } = await request.json();

	try {
		const results = await Promise.all([
			...(rateBeerId ? [updateRateBeerRating(rateBeerId, beverageShortId)] : []),
			...(untappdBeverageSlug ? [updateUntappdRating(untappdBeverageSlug, beverageShortId)] : [])
		]);

		const totalQuantity = results.reduce((acc, { quantity }) => acc + quantity, 0);
		const totalValue = results.reduce((acc, { quantity, value }) => acc + quantity * value, 0);
		const total = Number((Math.round((totalValue / totalQuantity) * 100000) / 100000).toFixed(5));

		await beverages.updateOne(
			{ shortId: beverageShortId },
			{
				$set: {
					'editorial.ratings.total.quantity': totalQuantity,
					'editorial.ratings.total.value': total,
					'editorial.ratings.total.date': new Date()
				}
			}
		);
	} catch (err) {
		throw error(500, 'Updating beverage ratings failed');
	}

	return json({
		message: 'Beverage ratings updated successfully'
	});
};
