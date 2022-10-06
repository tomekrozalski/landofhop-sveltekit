import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { getDbCollections, institutionNormalizer } from '$lib/utils/api';
import type { RawInstitution } from '$lib/utils/types/api/RawInstitution.d';

export const GET: RequestHandler = async ({ params }) => {
	const { language, shortId } = params;
	const { institutions } = await getDbCollections();

	const institution: RawInstitution | null = await institutions.findOne({ shortId });

	if (!institution) {
		throw error(404);
	}

	const formattedInsitution = institutionNormalizer(institution, language);

	return json(formattedInsitution);
};
