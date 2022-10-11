import { get } from 'svelte/store';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import type { RawBasics, RawBasicsWithoutId } from '$types/api/RawBasics.d';
import { formatBasics } from '$lib/utils/api';
import authentication from '$lib/utils/stores/authentication';
import { basics } from '$db/mongo';

export const PUT: RequestHandler = async ({ params, request }) => {
	const shortId = params.shortId ?? '';
	const beverageData = await request.json();

	if (!get(authentication).isLoggedIn) {
		throw error(401, 'Unauthorized. Cannot add new beverage');
	}

	try {
		const updatingBasics = await basics.findOne(
			{ shortId },
			{ projection: { added: 1, badge: 1, coverImage: 1 } }
		);

		if (!updatingBasics) {
			throw error(404, 'No basics found');
		}

		const formattedBasics: RawBasicsWithoutId = formatBasics(
			beverageData,
			{
				_id: updatingBasics._id,
				badge: updatingBasics.badge,
				shortId,
				added: updatingBasics.added
			},
			updatingBasics.coverImage
		);

		await basics.replaceOne({ shortId }, formattedBasics as RawBasics);
	} catch (err) {
		throw error(500, 'Updating basics failed');
	}

	return json({
		message: 'Beverage basics updated successfully'
	});
};
