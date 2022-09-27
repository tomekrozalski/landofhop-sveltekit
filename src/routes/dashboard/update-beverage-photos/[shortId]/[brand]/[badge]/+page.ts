import { getJsonData } from '$lib/utils/api/communication';
import type { PhotosDataWithContainerType as PhotosDataTypes } from '$lib/utils/types/Beverage/PhotosData';

export async function load({ fetch, params }) {
	try {
		const photosData: PhotosDataTypes = await getJsonData({
			fetch,
			path: `/api/admin/beverages/photos/${params.shortId}`
		});

		return { forbidden: false, photosData };
	} catch (err) {
		return { forbidden: err.message === 'Unauthorized', photosData: {} };
	}
}
