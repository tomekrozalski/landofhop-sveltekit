import { json } from '@sveltejs/kit';
import { getDbCollections } from '$lib/utils/api';

export async function GET({ locals, params }) {
	if (!locals.authenticated) {
		return json(
			{
				message: 'Unauthorized. Cannot get admin beverage photos'
			},
			{
				status: 401
			}
		);
	}

	const { shortId } = params;
	const { beverages } = await getDbCollections();

	const data = await beverages.findOne({ shortId });

	if (!data) {
		return json(
			{
				message: 'No beverage found'
			},
			{
				status: 404
			}
		);
	}

	const formattedData = {
		...(data.editorial?.photos && { ...data.editorial.photos }),
		type: data.label.container.type
	};

	return json(formattedData);
}
