import { json } from '@sveltejs/kit';
import { institutions } from '$db/mongo';
import type { RawInstitutionWithoutId } from '$types/api/RawInstitution';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
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
