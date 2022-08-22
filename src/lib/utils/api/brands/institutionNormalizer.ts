import { translate } from '$lib/utils/api';
import type { AppLanguage } from '$lib/utils/enums/AppLanguage.enum';
import type { RawInstitution } from '$lib/utils/types/api/RawInstitution.d';
import type { InstitutionDetails } from '$lib/utils/types/Institution.d';

function instutionNormalizer(
	{ name, owner, website }: RawInstitution,
	desiredLanguage: AppLanguage
): InstitutionDetails {
	return {
		name: translate(name, desiredLanguage),
		...(owner && { owner: instutionNormalizer(owner, desiredLanguage) }),
		...(website && { website })
	};
}

export default instutionNormalizer;
