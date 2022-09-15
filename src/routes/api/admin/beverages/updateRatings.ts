import { getDbCollections, updateRateBeerRating, updateUntappdRating } from '$lib/utils/api';

export async function post({ locals, request }) {
	if (!locals.authenticated) {
		return {
			status: 401,
			body: {
				message: 'Unauthorized. Cannot add update beverage'
			}
		};
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
		return {
			status: 500,
			body: {
				message: 'Updating beverage ratings failed'
			}
		};
	}

	return {
		body: {
			message: 'Beverage ratings updated successfully'
		}
	};
}
