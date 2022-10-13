import { isBoolean } from 'lodash-es';
import {
	formatDateFromString,
	formatIngredientByBadge,
	formatPlaceByShortId,
	formatStyleByBadge,
	parseFieldNumber
} from '$lib/utils/helpers/dataNormalizers';
import formatInstitutionByShortId from '$lib/utils/normalizers/institution';
import formatLanguageValueArray from '$lib/utils/normalizers/language';
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
	rateBeer,
	remark,
	series,
	styleTags,
	untappd
}: EditorialFormValues): EditorialFormOutput {
	return {
		...(series.length && { series: formatLanguageValueArray(series) }),
		...(cooperation && { cooperation: cooperation.map(formatInstitutionByShortId) }),
		...(contract && contract !== '--' && { contract: formatInstitutionByShortId(contract) }),
		...(contract === '--' && { isContract: true }),
		...(place && { place: formatPlaceByShortId(place) }),
		...(remark.length && { remark: formatLanguageValueArray(remark) }),
		// -----------
		...(fermentation && fermentation.length && { fermentation }),
		...(styleTags && { styleTags: styleTags.map(formatStyleByBadge) }),
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
		...(rateBeer && { rateBeer: +rateBeer }),
		...(untappd && { untappd }),
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
