import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';
import apiCall, { Endpoints } from '$lib/utils/api/call';
import type { Basics } from '$lib/utils/types/Beverage/Basics';

import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({ fetch }) => {
	const [total, beverages]: [number, Basics[]] = await Promise.all([
		apiCall(fetch, Endpoints.beverageTotal),
		apiCall(fetch, Endpoints.beverageBasics, {
			pathParams: ['pl', 0, BEVERAGES_ON_PAGE]
		})
	]);

	return {
		beverages,
		total
	};
};
