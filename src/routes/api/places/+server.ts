import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { places } from '$db/mongo';
import type { RawPlace } from '$types/RawPlace';

export const GET: RequestHandler = async () => {
	const data: RawPlace[] = await places
		.find(
			{},
			{
				projection: {
					_id: 0,
					city: 1,
					country: 1,
					institution: 1,
					location: 1,
					shortId: 1
				}
			}
		)
		.toArray();

	return json(data);
};
