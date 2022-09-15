import { json } from '@sveltejs/kit';
import { getDbCollections } from '$lib/utils/api';

export async function GET() {
	const { basics } = await getDbCollections();
	const total: number = await basics.count();

	throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
	// Suggestion (check for correctness before using):
	// return json(total);
	return {
		body: total
	};
}
