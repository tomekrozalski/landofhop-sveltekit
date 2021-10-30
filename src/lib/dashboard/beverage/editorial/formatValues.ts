import isBoolean from 'lodash.isboolean';
import {
	formatDateFromString,
	formatInstitutionByShortId,
	formatLanguageValueArray,
	formatPlaceByShortId,
	parseFieldNumber
} from '$lib/dashboard/utils/dataNormalizers';
import type { EditorialFormValues, EditorialFormOutput } from './EditorialFormValues';

export default function formatValues({
	alcoholScope,
	contract,
	cooperation,
	fermentation,
	filtration,
	notes,
	pasteurization,
	place,
	price,
	remark,
	style
}: EditorialFormValues): EditorialFormOutput {
	return {
		...(cooperation && { cooperation: cooperation.map(formatInstitutionByShortId) }),
		...(contract && contract !== '--' && { contract: formatInstitutionByShortId(contract) }),
		...(contract === '--' && { isContract: true }),
		...(place && { place: formatPlaceByShortId(place) }),
		...(remark.length && { remark: formatLanguageValueArray(remark) }),
		// -----------
		...(fermentation && fermentation.length && { fermentation }),
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
