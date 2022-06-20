import { formatBasics, getDbCollections } from '$lib/utils/api';
import type { RawBasics, RawBasicsWithoutId } from '$lib/utils/types/api/RawBasics.d';

export async function put({ locals, params, request }) {
	const { shortId } = params;
	const beverageData = await request.json();

	const { basics } = await getDbCollections();

	if (!locals.authenticated) {
		return {
			status: 401,
			body: {
				message: 'Unauthorized. Cannot add new beverage'
			}
		};
	}

	try {
		const updatingBasics = await basics.findOne(
			{ shortId },
			{ projection: { added: 1, badge: 1, coverImage: 1 } }
		);

		if (!updatingBasics) {
			return {
				status: 404,
				body: {
					message: 'No basics found'
				}
			};
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
		return {
			status: 500,
			body: {
				message: 'Updating basics failed'
			}
		};
	}

	return {
		body: {
			message: 'Beverage basics updated successfully'
		}
	};
}
