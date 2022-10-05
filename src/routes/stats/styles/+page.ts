import { get } from 'svelte/store';
import { getJsonData } from '$lib/utils/api/communication';
import authentication from '$lib/utils/stores/authentication';
import type { Style as StyleType } from '$lib/utils/types/Style';
import type { StylesStats as StylesStatsTypes } from '$lib/utils/types/stats/Styles';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	try {
		if (get(authentication).isLoggedIn) {
			const [statsData, styles]: [StylesStatsTypes[], StyleType[]] = await Promise.all([
				getJsonData({ fetch, path: '/api/stats/styles/pl' }),
				getJsonData({ fetch, path: '/api/styles' })
			]);

			return { statsData, styles };
		}

		const statsData = await getJsonData({ fetch, path: '/api/stats/styles/pl' });

		return { statsData, styles: [] };
	} catch {
		return { statsData: [], styles: [] };
	}
};
