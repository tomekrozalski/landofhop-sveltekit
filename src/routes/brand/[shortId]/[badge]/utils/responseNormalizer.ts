import { translate } from '$lib/utils/api';
import type { AppLanguage } from '$types/enums/Globals.enum';
import type { RawInstitution } from '$types/RawInstitution.d';
import type { InstitutionDetails } from '../types.d';

function responseNormalizer(
	{ name, owner, website }: RawInstitution,
	desiredLanguage: AppLanguage
): InstitutionDetails {
	return {
		name: translate(name, desiredLanguage),
		...(owner && {
			owner: {
				badge: owner.badge,
				name: translate(owner.name, desiredLanguage),
				website: owner.website
			}
		}),
		...(website && { website })
	};
}

export default responseNormalizer;
