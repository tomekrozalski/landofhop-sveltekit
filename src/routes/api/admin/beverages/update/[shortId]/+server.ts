import { get } from 'svelte/store';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { formatBeverage, getDbCollections } from '$lib/utils/api';
import type {
	RawBeverage,
	RawBeverageWithoutId
} from '$lib/utils/types/api/RawBeverage/RawBeverage.d';
import type { RawEditorialPhotos } from '$lib/utils/types/api/RawBeverage/RawEditorial.d';
import type { RawRatings } from '$lib/utils/types/api/RawBeverage/RawEditorial.d';
import authentication from '$lib/utils/stores/authentication';

export const PUT: RequestHandler = async ({ params, request }) => {
	const { shortId } = params;
	const beverageData = await request.json();
	const { beverages } = await getDbCollections();

	if (!get(authentication).isLoggedIn) {
		throw error(401, 'Unauthorized. Cannot add update beverage');
	}

	try {
		type UpdatingBeverageTypes =
			| {
					_id: string;
					added: Date;
					badge: string;
					photos?: RawEditorialPhotos;
					ratings?: RawRatings;
			  }
			| undefined;

		const updatingBeverage: UpdatingBeverageTypes = await beverages.findOne(
			{ shortId },
			{
				projection: {
					added: 1,
					badge: 1,
					photos: '$editorial.photos',
					ratings: '$editorial.ratings'
				}
			}
		);

		if (!updatingBeverage) {
			throw error(404, 'No beverage found');
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
			updatingBeverage.photos,
			updatingBeverage.ratings
		);

		await beverages.replaceOne({ shortId }, formattedBeverage as RawBeverage);
	} catch {
		throw error(500, 'Updating beverage failed');
	}

	return json({ message: 'Beverage updated successfully' });
};
