import { error } from '@sveltejs/kit';
import type { RawInstitution } from '$types/api/RawInstitution.d';
import { AppLanguage } from '$lib/utils/enums/AppLanguage.enum';
import { institutions } from '$db/mongo';
import responseNormalizer from './utils/responseNormalizer';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async ({ params }) => {
	const { badge, shortId } = params;
	const rawInstitution: RawInstitution | null = await institutions.findOne({ badge, shortId });

	if (!rawInstitution) {
		throw error(404, 'Not found');
	}

	const insitution = responseNormalizer(rawInstitution, AppLanguage.pl);

	return { insitution };
};
