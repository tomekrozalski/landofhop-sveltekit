import apiCall, { Endpoints } from '$lib/utils/api/call';
import type { GeneralStats as GeneralStatsTypes } from '$lib/utils/types/stats/General';

import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({ fetch }) => {
	const statsData: GeneralStatsTypes = await apiCall(fetch, Endpoints.statsGeneral, {
		pathParams: ['pl']
	});

	return { statsData };
};
