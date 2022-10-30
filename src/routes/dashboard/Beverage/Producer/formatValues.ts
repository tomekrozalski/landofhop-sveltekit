import { isBoolean } from 'lodash-es';
import {
	formatDateFromString,
	formatIngredientByBadge,
	formatPlaceByShortId,
	formatTaleArray,
	parseFieldNumber
} from '$Beverage/utils/normalizers';
import type { Currency } from '$types/enums/Beverage.enum';
import formatInstitutionByShortId from '$lib/utils/normalizers/institution';
import { formatLanguageValueToDb } from '$lib/utils/normalizers/language';
import type { ProducerFormValues, ProducerFormOutput } from './ProducerFormValues';

export default function formatValues({
	aged,
	alcohol,
	bitterness,
	contract,
	cooperation,
	dryHopped,
	expirationDate,
	extract,
	fermentation,
	filtration,
	fullness,
	hoppyness,
	hopRate,
	ingredients,
	ingredientTags,
	nitrogen,
	pasteurization,
	place,
	power,
	price,
	series,
	smokedMalt,
	style,
	sweetness,
	remark,
	tale,
	temperature
}: ProducerFormValues): ProducerFormOutput {
	return {
		...(series.length && { series: formatLanguageValueToDb(series) }),
		...(cooperation && {
			cooperation: cooperation.map((props) => formatInstitutionByShortId(props))
		}),
		...(contract && contract !== '--' && { contract: formatInstitutionByShortId(contract) }),
		...(contract === '--' && { isContract: true }),
		...(place && { place: formatPlaceByShortId(place) }),
		...(remark.length && { remark: formatLanguageValueToDb(remark) }),
		...(tale.length && { tale: tale.map(formatTaleArray) }),
		// -----------
		...(fermentation && fermentation.length && { fermentation }),
		...(style.length && { style: formatLanguageValueToDb(style) }),
		...(extract.value &&
			extract.unit &&
			extract.relate && {
				extract: {
					value: parseFieldNumber(extract.value),
					unit: extract.unit,
					relate: extract.relate
				}
			}),
		...(alcohol.value &&
			alcohol.unit &&
			alcohol.relate && {
				alcohol: {
					value: parseFieldNumber(alcohol.value),
					unit: alcohol.unit,
					relate: alcohol.relate,
					...(alcohol.scope && alcohol.scope !== '--' && { scope: alcohol.scope })
				}
			}),
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
		...(hopRate.value &&
			hopRate.unit && {
				hopRate: {
					value: +hopRate.value,
					unit: hopRate.unit
				}
			}),
		...(isBoolean(nitrogen) && { nitrogen }),
		...(expirationDate.value &&
			expirationDate.unit && {
				expirationDate: {
					value: +expirationDate.value,
					unit: expirationDate.unit
				}
			}),
		// -----------
		...(ingredients.length && {
			ingredients: ingredients.map(({ complete, language, list }) => ({
				complete,
				language,
				list: list.map((value) => value.trim())
			}))
		}),
		...(ingredientTags && { ingredientTags: ingredientTags.map(formatIngredientByBadge) }),
		...(isBoolean(smokedMalt) && { smokedMalt }),
		// -----------
		...(bitterness && { bitterness: +bitterness }),
		...(sweetness && { sweetness: +sweetness }),
		...(fullness && { fullness: +fullness }),
		...(power && { power: +power }),
		...(hoppyness && { hoppyness: +hoppyness }),
		...(temperature.from &&
			temperature.to &&
			temperature.unit && {
				temperature: {
					from: +temperature.from,
					to: +temperature.to,
					unit: temperature.unit
				}
			}),
		// -----------
		...(price.length && {
			price: price.map(({ currency, date, shop, value }) => ({
				currency: currency as Currency,
				date: formatDateFromString(date),
				...(shop && { shop }),
				value: parseFieldNumber(value)
			}))
		})
	};
}
