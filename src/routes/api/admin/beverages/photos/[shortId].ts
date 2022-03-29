import { authenticate, getDbCollections } from '$lib/utils/api';

export async function get({ params, request }) {
	const [isAuthenticated, headers] = await authenticate(request);

	if (!isAuthenticated) {
		return {
			status: 401,
			body: {
				message: 'Unauthorized. Cannot load admin beverage notes'
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

	return {
		headers,
		body: formattedData
	};
}
