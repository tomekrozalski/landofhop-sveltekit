import { json } from '@sveltejs/kit';
import { generateShortId, getDbCollections } from '$lib/utils/api';
import type { RawInstitutionWithoutId } from '$lib/utils/types/api/RawInstitution';

export async function POST({ locals, request }) {
	const institutionData = await request.json();
	const { institutions } = await getDbCollections();

	if (!locals.authenticated) {
		return json(
			{
				message: 'Unauthorized. Cannot add institution'
			},
			{
				status: 401
			}
		);
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

	return json$1(data);
}
