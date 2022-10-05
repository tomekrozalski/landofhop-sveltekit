import { redirect, error } from '@sveltejs/kit';
import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';
import { getJsonData } from '$lib/utils/api/communication';
import type { Basics } from '$lib/utils/types/Beverage/Basics';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({ fetch, params }) => {
	const order = +params.order;
	const skip = order * BEVERAGES_ON_PAGE - BEVERAGES_ON_PAGE;

	if (!order || order === 1) {
		throw redirect(301, '/');
	}

	const total: number = await getJsonData({ fetch, path: '/api/basics/total' });

	if (skip > total) {
		throw error(404, 'Not found. List order is too high');
	}

	const beverages: Basics[] = await getJsonData({
		fetch,
		path: `/api/basics/list/pl/${skip}/${BEVERAGES_ON_PAGE}`
	});

	return {
		order,
		beverages,
		total
	};
};
