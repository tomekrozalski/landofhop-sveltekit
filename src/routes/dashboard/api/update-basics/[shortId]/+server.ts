import { get } from 'svelte/store';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { basics } from '$db/mongo';
import type { NewBeverageRequest } from '$Beverage/utils/apiNormalizers/ApiTypes.d';
import authentication from '$lib/utils/stores/authentication';
import { formatBasicsToDb } from '$Beverage/utils/apiNormalizers';

export const PUT: RequestHandler = async ({ params, request }) => {
	const shortId = params.shortId as string;
	const beverageData: NewBeverageRequest = await request.json();

	if (!params.shortId || !get(authentication).isLoggedIn) {
		throw error(401, 'Unauthorized. Cannot update new beverage');
	}

	try {
		const updatingBasics = await basics.findOne(
			{ shortId },
			{ projection: { added: 1, badge: 1, coverImage: 1 } }
		);

		if (!updatingBasics) {
			throw error(404, 'No basics found');
		}

		const formattedBasics = formatBasicsToDb(
			beverageData,
			{
				_id: updatingBasics._id,
				badge: updatingBasics.badge,
				shortId,
				added: updatingBasics.added
			},
			updatingBasics.coverImage
		);

		await basics.replaceOne({ shortId }, formattedBasics);
	} catch (err) {
		throw error(500, 'Updating basics failed');
	}

	return json({
		message: 'Beverage basics updated successfully'
	});
};
