import { getDbCollections, institutionNormalizer } from '$lib/utils/api';
import type { RawInstitution } from '$lib/utils/types/api/RawInstitution.d';

export async function get({ params }) {
	const { language, shortId } = params;
	const { institutions } = await getDbCollections();

	const institution: RawInstitution = await institutions.findOne({ shortId });

	if (!institution) {
		return { status: 404 };
	}

	const formattedInsitution = institutionNormalizer(institution, language);

	return { body: formattedInsitution };
}
