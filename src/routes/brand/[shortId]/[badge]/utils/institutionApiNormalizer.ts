import { translate } from '$lib/utils/api';
import type { AppLanguage } from '$types/enums/Globals.enum';
import type { RawInstitution } from '$types/RawInstitution.d';
import type { InstitutionDetails } from '../types.d';

const institutionApiNormalizer = (
	{ name, owner, website, statsData }: RawInstitution,
	desiredLanguage: AppLanguage
): InstitutionDetails => ({
	name: translate(name, desiredLanguage),
	...(owner && {
		owner: {
			badge: owner.badge,
			name: translate(owner.name, desiredLanguage),
			website: owner.website
		}
	}),
	...(website && { website }),
	statsData: {
		...statsData,
		...(statsData.avrScore && {
			avrScore: {
				value: new Intl.NumberFormat(desiredLanguage, { maximumSignificantDigits: 3 }).format(
					statsData.avrScore.value
				),
				ranking: statsData.avrScore.ranking
			}
		})
	}
});

export default institutionApiNormalizer;
