import { translate } from '$lib/utils/api';
import type { AppLanguage } from '$lib/utils/enums/AppLanguage.enum';
import type { RawInstitution } from '$types/api/RawInstitution.d';
import type { InstitutionDetails } from '$types/Institution.d';

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
