import { error } from '@sveltejs/kit';
import { basics, institutions } from '$db/mongo';
import { AppLanguage } from '$types/enums/Globals.enum';
import type { RawInstitution } from '$types/RawInstitution.d';
import institutionApiNormalizer from './utils/institutionApiNormalizer';
import timelineApiNormalizer from './utils/timelineApiNormalizer';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async ({ params }) => {
	const { badge, shortId } = params;
	const rawInstitution: RawInstitution | null = await institutions.findOne({ badge, shortId });

	if (!rawInstitution) {
		throw error(404, 'Institution not found');
	}

	const rawBasics = await basics.find({ 'brand.badge': badge, 'brand.shortId': shortId }).toArray();

	return {
		timelineData: timelineApiNormalizer(rawBasics),
		insitution: institutionApiNormalizer(rawInstitution, AppLanguage.pl)
	};
};
