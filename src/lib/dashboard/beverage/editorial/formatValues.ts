import isBoolean from 'lodash/isBoolean';
import { formatInstitutionByShortId } from '$lib/dashboard/utils/dataNormalizers';
import type { EditorialFormValues, EditorialFormOutput } from './EditorialFormValues';

export default function formatValues({
	cooperation,
	filtration,
	notes,
	pasteurization
}: EditorialFormValues): EditorialFormOutput {
	return {
		...(cooperation && { cooperation: cooperation.map(formatInstitutionByShortId) }),
		// -----------
		...(isBoolean(filtration) && { filtration }),
		...(isBoolean(pasteurization) && { pasteurization }),
		// -----------
		...(notes && { notes })
	};
}
