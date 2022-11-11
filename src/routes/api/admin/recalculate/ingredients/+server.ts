import { get } from 'svelte/store';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import authentication from '$lib/utils/stores/authentication';
import recalculateIngredients from './recalculateIngredients';

export const GET: RequestHandler = async () => {
	if (!get(authentication).isLoggedIn) {
		throw error(401, 'Unauthorized. Cannot recalculate data');
	}

	try {
		await recalculateIngredients();
	} catch (e) {
		throw error(500, 'Recalculate failed');
	}

	return json({ message: 'Recalculatation finished' });
};
