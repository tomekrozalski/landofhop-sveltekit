import { json } from '@sveltejs/kit';
import { getDbCollections } from '$lib/utils/api';
import type { RawInstitutionWithoutId } from '$lib/utils/types/api/RawInstitution';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
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

	return json(data);
};
