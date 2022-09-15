import { json as json$1 } from '@sveltejs/kit';
import { getDbCollections, updateRateBeerRating, updateUntappdRating } from '$lib/utils/api';

export async function POST({ locals, request }) {
	if (!locals.authenticated) {
		return json$1({
			message: 'Unauthorized. Cannot add update beverage'
		}, {
			status: 401
		});
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

		const { beverages } = await getDbCollections();

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
		return json$1({
			message: 'Updating beverage ratings failed'
		}, {
			status: 500
		});
	}

	return json$1({
		message: 'Beverage ratings updated successfully'
	});
}
