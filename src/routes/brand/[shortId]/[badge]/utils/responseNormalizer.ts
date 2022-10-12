import { translate } from '$lib/utils/api';
import type { AppLanguage } from '$lib/utils/enums/AppLanguage.enum';
import type { RawInstitution } from '$types/api/RawInstitution.d';
import type { InstitutionDetails } from '$types/Institution.d';

function responseNormalizer(
	{ name, owner, website }: RawInstitution,
	desiredLanguage: AppLanguage
): InstitutionDetails {
	return {
		name: translate(name, desiredLanguage),
		...(owner && { owner: responseNormalizer(owner, desiredLanguage) }),
		...(website && { website })
	};
}

export default responseNormalizer;
