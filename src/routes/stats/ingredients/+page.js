import { redirect } from '@sveltejs/kit';

export async function load() {
	throw redirect(301, '/stats/ingredients/malt');
}
