import { getDbCollections } from '$lib/utils/api';

export async function get({ locals, params }) {
	if (!locals.authenticated) {
		return {
			status: 401,
			body: {
				message: 'Unauthorized. Cannot get admin beverage photos'
			}
		};
	}

	const { shortId } = params;
	const { beverages } = await getDbCollections();

	const data = await beverages.findOne({ shortId });

	if (!data) {
		return {
			status: 404,
			body: {
				message: 'No beverage found'
			}
		};
	}

	const formattedData = {
		...(data.editorial?.photos && { ...data.editorial.photos }),
		type: data.label.container.type
	};

	return { body: formattedData };
}
