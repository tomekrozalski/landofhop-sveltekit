import { getJsonData } from '$lib/utils/api/communication';
import type { GeneralStats as GeneralStatsTypes } from '$lib/utils/types/stats/General';
import type { PageLoad } from './$types';

export const prerender = false;

export const load: PageLoad = async ({ fetch }) => {
	const statsData: GeneralStatsTypes = await getJsonData({ fetch, path: '/api/stats/general/pl' });

	return { statsData };
};
