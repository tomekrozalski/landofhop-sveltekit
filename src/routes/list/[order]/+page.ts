import { redirect, error } from '@sveltejs/kit';
import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';
import apiCall, { Endpoints } from '$lib/utils/api/call';
import type { Basics } from '$lib/utils/types/Beverage/Basics';

export const prerender = true;

export async function load({ fetch, params }) {
	const order = +params.order;
	const skip = order * BEVERAGES_ON_PAGE - BEVERAGES_ON_PAGE;

	if (!order || order === 1) {
		throw redirect(301, '/');
	}

	const total: number = await apiCall(fetch, Endpoints.beverageTotal);

	if (skip > total) {
		throw error(404, 'Not found. List order is too high');
	}

	const beverages: any = await apiCall(fetch, Endpoints.beverageBasics, {
		pathParams: ['pl', skip, BEVERAGES_ON_PAGE]
	});

	return {
		order,
		beverages,
		total
	};
}
