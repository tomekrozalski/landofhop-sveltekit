import { get } from 'svelte/store';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { generateShortId } from '$lib/utils/api';
import type { RawInstitutionWithoutId } from '$types/api/RawInstitution';
import authentication from '$lib/utils/stores/authentication';
import { institutions } from '$db/mongo';

export const POST: RequestHandler = async ({ request }) => {
	const institutionData = await request.json();

	if (!get(authentication).isLoggedIn) {
		throw error(401, 'Unauthorized. Cannot add institution');
	}

	await institutions.insertOne({
		...institutionData,
		shortId: generateShortId()
	});

	const data: RawInstitutionWithoutId[] = await institutions
		.find(
			{},
			{
				projection: {
					_id: 0,
					badge: 1,
					name: 1,
					owner: 1,
					shortId: 1,
					website: 1
				}
			}
		)
		.toArray();

	return json(data);
};
