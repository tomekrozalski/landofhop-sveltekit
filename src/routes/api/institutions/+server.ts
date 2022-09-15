import { json } from '@sveltejs/kit';
import { getDbCollections } from '$lib/utils/api';
import type { RawInstitutionWithoutId } from '$lib/utils/types/api/RawInstitution';

export async function GET() {
	const { institutions } = await getDbCollections();

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
	// return json(data);
	return { body: data };
}
