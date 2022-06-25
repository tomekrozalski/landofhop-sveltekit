import {
	formatBeverage,
	getDbCollections,
	updateRateBeerRating,
	updateUntappdRating
} from '$lib/utils/api';
import type {
	RawBeverage,
	RawBeverageWithoutId
} from '$lib/utils/types/api/RawBeverage/RawBeverage.d';
import type { RawEditorialPhotos } from '$lib/utils/types/api/RawBeverage/RawEditorial.d';

export async function put({ locals, params, request }) {
	const { shortId } = params;
	const beverageData = await request.json();
	const { beverages } = await getDbCollections();

	if (!locals.authenticated) {
		return {
			status: 401,
			body: {
				message: 'Unauthorized. Cannot add update beverage'
			}
		};
	}

	try {
		type UpdatingBeverageTypes =
			| {
					_id: string;
					added: Date;
					badge: string;
					photos?: RawEditorialPhotos;
			  }
			| undefined;

		const updatingBeverage: UpdatingBeverageTypes = await beverages.findOne(
			{ shortId },
			{ projection: { added: 1, badge: 1, photos: '$editorial.photos' } }
		);

		if (!updatingBeverage) {
			return {
				status: 404,
				body: {
					message: 'No beverage found'
				}
			};
		}

		const formattedBeverage: RawBeverageWithoutId = formatBeverage(
			beverageData,
			{
				_id: updatingBeverage._id,
				badge: updatingBeverage.badge,
				shortId,
				added: updatingBeverage.added,
				updated: new Date()
			},
			updatingBeverage.photos
		);

		await beverages.replaceOne({ shortId }, formattedBeverage as RawBeverage);
	} catch (err) {
		return {
			status: 500,
			body: {
				message: 'Updating beverage failed'
			}
		};
	}

	if (beverageData.editorial?.rateBeer) {
		await updateRateBeerRating(beverageData.editorial.rateBeer, shortId);
	}

	if (beverageData.editorial?.untappd) {
		await updateUntappdRating(beverageData.editorial.untappd, shortId);
	}

	return {
		body: {
			message: 'Beverage updated successfully'
		}
	};
}
