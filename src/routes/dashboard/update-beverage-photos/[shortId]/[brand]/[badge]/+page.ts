import apiCall, { Endpoints } from '$lib/utils/api/call';
import type { PhotosDataWithContainerType as PhotosDataTypes } from '$lib/utils/types/Beverage/PhotosData';

export async function load({ fetch, params }) {
	try {
		const photosData: PhotosDataTypes = await apiCall(fetch, Endpoints.beveragePhotos, {
			pathParams: [params.shortId]
		});
		return { forbidden: false, photosData };
	} catch (err) {
		return { forbidden: err.message === 'Unauthorized', photosData: {} };
	}
}
