import { get } from 'svelte/store';

import { getJsonData } from '$lib/utils/api/getData';
import authentication from '$lib/utils/stores/authentication';
import type { IngredientsStats as IngredientsStatsTypes } from '$lib/utils/types/stats/General';
import type { Ingredient as IngredientType } from '$lib/utils/types/Ingredient';
import type { PageLoad } from './$types';

// export const prerender = true;

export const load: PageLoad = async ({ fetch, params }) => {
	try {
		if (get(authentication).isLoggedIn) {
			const [statsData, ingredients]: [IngredientsStatsTypes, IngredientType[]] = await Promise.all(
				[
					getJsonData({ fetch, path: `/api/stats/ingredients/pl/${params.type}` }),
					getJsonData({ fetch, path: '/api/ingredients' })
				]
			);

			return { statsData, ingredients };
		}

		const statsData: IngredientsStatsTypes = await getJsonData({
			fetch,
			path: `/api/stats/ingredients/pl/${params.type}`
		});

		return { statsData, ingredients: null };
	} catch {
		return { statsData: null, ingredients: null };
	}
};
