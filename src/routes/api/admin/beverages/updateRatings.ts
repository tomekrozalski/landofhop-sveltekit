import { updateRateBeerRating, updateUntappdRating } from '$lib/utils/api';

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
		await Promise.all([
			...(rateBeerId ? [updateRateBeerRating(rateBeerId, beverageShortId)] : []),
			...(untappdBeverageSlug ? [updateUntappdRating(untappdBeverageSlug, beverageShortId)] : [])
		]);
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
