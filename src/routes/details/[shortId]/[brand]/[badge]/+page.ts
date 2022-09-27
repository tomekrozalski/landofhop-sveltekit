import { error } from '@sveltejs/kit';
import { getJsonData } from '$lib/utils/api/communication';
import type { AugmentedDetails } from '$lib/utils/types/Beverage/AugmentedDetails';

import type { PageLoad } from './$types';

// export const prerender = true;

export const load: PageLoad = async ({ fetch, params }) => {
	try {
		const augmentedBeverageDetails: AugmentedDetails = await getJsonData({
			fetch,
			path: `/api/beverages/details/pl/${params.shortId}`
		});

		return augmentedBeverageDetails;
	} catch {
		throw error(404, 'Beverage details load failed');
	}
};
