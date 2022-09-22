import { error } from '@sveltejs/kit';

import apiCall, { Endpoints } from '$lib/utils/api/call';
import type { AugmentedDetails } from '$lib/utils/types/Beverage/AugmentedDetails';

import type { PageLoad } from './$types';

// export const prerender = true;

export const load: PageLoad = async ({ fetch, params }) => {
	try {
		const augmentedBeverageDetails: AugmentedDetails = await apiCall(
			fetch,
			Endpoints.beverageDetails,
			{
				pathParams: ['pl', params.shortId]
			}
		);

		return augmentedBeverageDetails;
	} catch {
		throw error(404, 'Beverage details load failed');
	}
};
