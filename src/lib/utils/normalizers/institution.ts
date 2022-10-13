import { get } from 'svelte/store';
import { institutionStore } from '$lib/utils/stores/selects';
import type { Institution as StoreInstitution } from '$lib/utils/stores/types/Institution.d';
import type { LanguageValue } from '$types/LanguageValue.d';

type Output = {
	badge: string;
	name: LanguageValue[];
	owner?: {
		badge: string;
		name: LanguageValue[];
		website?: string;
		shortId: string;
	};
	website?: string;
	shortId: string;
};

function formatInstitutionByShortId(value: string, skipOwner = false): Output {
	const selectedInstitution = get(institutionStore).find(
		({ shortId }) => shortId === value
	) as StoreInstitution;

	return {
		badge: selectedInstitution.badge,
		name: selectedInstitution.name,
		shortId: selectedInstitution.shortId,
		...(!skipOwner &&
			selectedInstitution.owner && {
				owner: formatInstitutionByShortId(selectedInstitution.owner.shortId, true)
			})
	};
}

export default formatInstitutionByShortId;
