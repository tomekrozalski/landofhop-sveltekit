import { format } from 'date-fns';

import { getDbCollections } from '$lib/utils/api';
import { DateFormat } from '$lib/utils/enums/DateFormat.enum';

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
	};

	const data: RawData | undefined = await beverages.findOne(
		{ shortId },
		{ projection: { _id: 0, notes: '$editorial.notes', updated: 1 } }
	);

	if (!data) {
		return {
			status: 404,
			body: {
				message: 'No beverage found'
			}
		};
	}

	const formattedData: {
		notes?: string;
		updated?: string;
	} = {
		...(data.notes && { notes: data.notes }),
		...(data.updated && {
			updated: format(new Date(data.updated), DateFormat[language])
		})
	};

	return { body: formattedData };
}
