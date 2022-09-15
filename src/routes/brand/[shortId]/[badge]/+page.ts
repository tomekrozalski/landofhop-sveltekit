import apiCall, { Endpoints } from '$lib/utils/api/call';
import type { AugmentedDetails } from '$lib/utils/types/Beverage/AugmentedDetails';

// export const prerender = true;

export async function load({ fetch, params }) {
	try {
		const institutionDetails: AugmentedDetails = await apiCall(
			fetch,
			Endpoints.institutionDetails,
			{ pathParams: ['pl', params.shortId] }
		);

		return {
			data: institutionDetails
		};
	} catch (e) {
		throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
		return {
			status: 404,
			error: e.message
		};
	}
}
