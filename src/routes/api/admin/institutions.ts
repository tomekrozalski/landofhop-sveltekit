import { authenticate, getDbCollections } from '$lib/utils/api';
import type { RawInstitutionWithoutId } from '$lib/utils/types/api/RawInstitution';

export async function get({ request }) {
	const { institutions } = await getDbCollections();
	const [isAuthenticated, headers] = await authenticate(request);

	if (!isAuthenticated) {
		return {
			status: 401,
			body: 'Unauthorized. List of institutions cannot be sent'
		};
	}

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

	return {
		headers,
		body: data
	};
}
