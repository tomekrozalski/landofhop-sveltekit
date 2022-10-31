import type { PhotosDataTypes } from './utils/types.d';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	try {
		const { badge, brand, shortId } = params;
		const response = await fetch(
			`/dashboard/update-beverage-photos/${shortId}/${brand}/${badge}/api/get-photos-data`
		);
		const photosData: PhotosDataTypes = await response.json();

		return { photosData };
	} catch {
		return { photosData: null };
	}
};
