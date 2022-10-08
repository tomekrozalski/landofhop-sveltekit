import { getJsonData } from '$lib/utils/api/communication';
import type { PhotosDataWithContainerType as PhotosDataTypes } from '$lib/utils/types/Beverage/PhotosData';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	try {
		const photosData: PhotosDataTypes = await getJsonData({
			fetch,
			path: `/api/admin/beverages/photos/${params.shortId}`
		});

		return { photosData };
	} catch {
		return { photosData: null };
	}
};
