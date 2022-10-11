import { getJsonData } from '$lib/utils/api/communication';
import type { AugmentedDetails } from '$types/Beverage/AugmentedDetails';

// export const prerender = true;

export async function load({ fetch, params }) {
	try {
		const institutionDetails: AugmentedDetails = await getJsonData({
			fetch,
			path: `/api/brands/pl/${params.shortId}`
		});

		return {
			data: institutionDetails
		};
	} catch (e) {
		throw new Error(
			'@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)'
		);
		return {
			status: 404,
			error: e.message
		};
	}
}
