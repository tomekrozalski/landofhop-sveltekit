import isBoolean from 'lodash/isBoolean';
import {
	formatDateFromString,
	formatInstitutionByShortId,
	formatLanguageValueArray,
	parseFieldNumber
} from '$lib/dashboard/utils/dataNormalizers';
import type { EditorialFormValues, EditorialFormOutput } from './EditorialFormValues';

export default function formatValues({
	alcoholScope,
	contract,
	cooperation,
	filtration,
	notes,
	pasteurization,
	price,
	style
}: EditorialFormValues): EditorialFormOutput {
	return {
		...(cooperation && { cooperation: cooperation.map(formatInstitutionByShortId) }),
		...(contract && contract !== '--' && { contract: formatInstitutionByShortId(contract) }),
		...(contract === '--' && { isContract: true }),
		// -----------
		...(style.length && { style: formatLanguageValueArray(style) }),
		...(alcoholScope && { alcoholScope }),
		...(isBoolean(filtration) && { filtration }),
		...(isBoolean(pasteurization) && { pasteurization }),
		// -----------
		...(price.length && {
			price: price.map(({ currency, date, shop, value }) => ({
				currency,
				date: formatDateFromString(date),
				...(shop && { shop }),
				value: parseFieldNumber(value)
			}))
		}),
		...(notes && { notes })
	};
}
