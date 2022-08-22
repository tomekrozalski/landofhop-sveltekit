import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';
import apiCall, { Endpoints } from '$lib/utils/api/call';
import type { Basics } from '$lib/utils/types/Beverage/Basics';

export const prerender = true;

export async function load({ fetch }) {
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
}
