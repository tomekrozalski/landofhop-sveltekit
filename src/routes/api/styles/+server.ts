import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { styles } from '$db/mongo';
import type { RawStylesWithoutId } from '$types/api/RawStyles';

export const GET: RequestHandler = async () => {
	const data: RawStylesWithoutId[] = await styles
		.find(
			{},
			{
				projection: {
					_id: 0,
					badge: 1,
					name: 1,
					group: 1
				}
			}
		)
		.toArray();

	return json(data);
};
