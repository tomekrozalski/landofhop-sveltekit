import isBoolean from 'lodash/isBoolean';
import {
	formatInstitutionByShortId,
	formatLanguageValueArray
} from '$lib/dashboard/utils/dataNormalizers';
import type { EditorialFormValues, EditorialFormOutput } from './EditorialFormValues';

export default function formatValues({
	alcoholScope,
	cooperation,
	filtration,
	notes,
	pasteurization,
	style
}: EditorialFormValues): EditorialFormOutput {
	return {
		...(cooperation && { cooperation: cooperation.map(formatInstitutionByShortId) }),
		// -----------
		...(style.length && { style: formatLanguageValueArray(style) }),
		...(alcoholScope && { alcoholScope }),
		...(isBoolean(filtration) && { filtration }),
		...(isBoolean(pasteurization) && { pasteurization }),
		// -----------
		...(notes && { notes })
	};
}
