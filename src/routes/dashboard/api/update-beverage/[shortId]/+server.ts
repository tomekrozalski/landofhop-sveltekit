import { get } from 'svelte/store';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import type { RawBeverage } from '$types/RawBeverage.d';
import { beverages } from '$db/mongo';
import authentication from '$lib/utils/stores/authentication';
import { formatBeverageToDb } from '$Beverage/utils/apiNormalizers';

export const PUT: RequestHandler = async ({ params, request }) => {
	const { shortId } = params;
	const beverageData = await request.json();

	if (!shortId || !get(authentication).isLoggedIn) {
		throw error(401, 'Unauthorized. Cannot add update beverage');
	}

	try {
		const updatingBeverage: {
			_id: string;
			added: Date;
			badge: string;
			photos?: {
				cap?: boolean;
				cover?: {
					height: number;
					width: number;
				};
				gallery?: number;
				outlines?: {
					cover?: string;
					gallery?: string;
				};
				viewFromAbove?: boolean;
			};
			ratings?: {
				rateBeer: {
					beverageId: number;
					quantity?: number;
					value?: number;
					date?: Date;
				};
				untappd: {
					beverageSlug: string;
					quantity?: number;
					value?: number;
					date?: Date;
				};
				total?: {
					quantity: number;
					value: number;
					date?: Date;
				};
			};
		} | null = await beverages.findOne(
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

		const formattedBeverage: RawBeverage = formatBeverageToDb(
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

		await beverages.replaceOne({ shortId }, formattedBeverage);
	} catch {
		throw error(500, 'Updating beverage failed');
	}

	return json({ message: 'Beverage updated successfully' });
};
