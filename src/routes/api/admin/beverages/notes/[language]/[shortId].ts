import { format } from 'date-fns';

import { getDbCollections } from '$lib/utils/api';
import { DateFormat } from '$lib/utils/enums/DateFormat.enum';
import type { RawRatings } from '$lib/utils/types/api/RawBeverage/RawEditorial.d';
import type { AdminNotes } from '$lib/utils/types/Beverage/AdminNotes.d';

export async function get({ locals, params }) {
	if (!locals.authenticated) {
		return {
			status: 401,
			body: {
				message: 'Unauthorized. Cannot load admin beverage notes'
			}
		};
	}

	const { language, shortId } = params;
	const { beverages } = await getDbCollections();

	type RawData = {
		notes?: string;
		updated?: Date;
		ratings?: RawRatings;
	};

	const data: RawData | undefined = await beverages.findOne(
		{ shortId },
		{ projection: { _id: 0, notes: '$editorial.notes', ratings: '$editorial.ratings', updated: 1 } }
	);

	if (!data) {
		return {
			status: 404,
			body: {
				message: 'No beverage found'
			}
		};
	}

	const formattedData: AdminNotes = {
		...(data.notes && { notes: data.notes }),
		...(data.updated && {
			updated: format(new Date(data.updated), DateFormat[language])
		}),
		...(data.ratings && {
			ratings: {
				...(data.ratings.rateBeer?.beverageId && { rateBeer: data.ratings.rateBeer.beverageId }),
				...(data.ratings.untappd?.beverageSlug && { untappd: data.ratings.untappd.beverageSlug })
			}
		})
	};

	return { body: formattedData };
}
