import { redirect, error } from '@sveltejs/kit';
import { basics } from '$db/mongo';
import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';
import normalizeApiData from '$lib/templates/BeverageList/normalizeApiData';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async ({ params }) => {
	const order = +params.order;

	if (!order || order === 1) {
		throw redirect(301, '/');
	}

	const skip = order * BEVERAGES_ON_PAGE - BEVERAGES_ON_PAGE;
	const total: number = await basics.countDocuments();

	if (skip > total) {
		throw error(404, 'Not found. List order is too high');
	}

	const rawBasics = await basics
		.find()
		.sort({ added: -1 })
		.skip(skip)
		.limit(BEVERAGES_ON_PAGE)
		.toArray();

	const beverages = normalizeApiData(rawBasics);

	return {
		order,
		beverages,
		total
	};
};
