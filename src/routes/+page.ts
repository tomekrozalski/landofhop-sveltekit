import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';
import { getJsonData } from '$lib/utils/api/communication';
import type { Basics } from '$lib/utils/types/Beverage/Basics';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({ fetch }) => {
	const [total, beverages]: [number, Basics[]] = await Promise.all([
		getJsonData({ fetch, path: '/api/basics/total' }),
		getJsonData({ fetch, path: `/api/basics/list/pl/0/${BEVERAGES_ON_PAGE}` })
	]);

	return {
		beverages,
		total
	};
};
