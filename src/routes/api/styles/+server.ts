import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { styles } from '$db/mongo';
import type { RawStyle } from '$types/RawStyle';

export const GET: RequestHandler = async () => {
	const data: RawStyle[] = await styles
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
