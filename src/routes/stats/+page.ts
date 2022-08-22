import apiCall, { Endpoints } from '$lib/utils/api/call';
import type { GeneralStats as GeneralStatsTypes } from '$lib/utils/types/stats/General';

export const prerender = true;

export async function load({ fetch }) {
	const statsData: GeneralStatsTypes = await apiCall(fetch, Endpoints.statsGeneral, {
		pathParams: ['pl']
	});

	return { statsData };
}
