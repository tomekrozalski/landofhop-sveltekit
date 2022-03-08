import { format } from 'date-fns';

import { authenticate, getDbCollections } from '$lib/utils/api';
import { DateFormat } from '$lib/utils/enums/DateFormat.enum';

export async function get({ params, request }) {
	const [isAuthenticated, headers] = await authenticate(request);

	if (!isAuthenticated) {
		return {
			status: 401,
			body: 'Unauthorized. List of ingredients cannot be sent'
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
			body: 'No beverage found'
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

	return {
		headers,
		body: formattedData
	};
}
