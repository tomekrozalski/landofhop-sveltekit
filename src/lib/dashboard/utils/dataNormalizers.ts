import { get } from 'svelte/store';
import { institutionStore } from '$lib/dashboard/utils/stores';

export function formatInstitutionByShortId(value: string) {
	const selectedInstitution = get(institutionStore).find(({ shortId }) => shortId === value);

	return {
		badge: selectedInstitution.badge,
		name: selectedInstitution.name,
		shortId: selectedInstitution.shortId,
		...(selectedInstitution.owner && {
			owner: formatInstitutionByShortId(selectedInstitution.owner.shortId)
		})
	};
}

export function formatLanguageValueArray(
	arr: {
		language: string;
		value: string;
	}[]
) {
	return arr.map(({ language, value }) => ({
		...(language !== '--' && { language }),
		value: value.trim()
	}));
}
