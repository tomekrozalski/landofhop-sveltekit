import { json as json$1 } from '@sveltejs/kit';
import { generateShortId, getDbCollections } from '$lib/utils/api';
import type { RawInstitutionWithoutId } from '$lib/utils/types/api/RawInstitution';

export async function POST({ locals, request }) {
	const institutionData = await request.json();
	const { institutions } = await getDbCollections();

	if (!locals.authenticated) {
		return json$1({
			message: 'Unauthorized. Cannot add institution'
		}, {
			status: 401
		});
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

	throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
	// Suggestion (check for correctness before using):
	// return json$1(data);
	return { body: data };
}
