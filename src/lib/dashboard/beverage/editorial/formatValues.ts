import isBoolean from 'lodash.isboolean';
import {
	formatDateFromString,
	formatIngredientByBadge,
	formatInstitutionByShortId,
	formatLanguageValueArray,
	formatPlaceByShortId,
	parseFieldNumber
} from '$lib/dashboard/utils/dataNormalizers';
import type { EditorialFormValues, EditorialFormOutput } from './EditorialFormValues';

export default function formatValues({
	aged,
	alcoholScope,
	clarity,
	color,
	contract,
	cooperation,
	dryHopped,
	fermentation,
	filtration,
	nitrogen,
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
		...(aged.length && {
			aged: aged.map((props) => ({
				...(props.type && { type: props.type }),
				...(props.wood && { wood: props.wood }),
				...(props.time.value !== '0' && {
					time: {
						value: +props.time.value,
						unit: props.time.unit
					}
				}),
				...(props.previousContent.length && { previousContent: props.previousContent })
			}))
		}),
		...(dryHopped && !dryHopped.length && { isDryHopped: true }),
		...(dryHopped && dryHopped.length && { dryHopped: dryHopped.map(formatIngredientByBadge) }),
		...(isBoolean(nitrogen) && { nitrogen }),
		// -----------
		...(color && { color }),
		...(clarity && { clarity }),
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
