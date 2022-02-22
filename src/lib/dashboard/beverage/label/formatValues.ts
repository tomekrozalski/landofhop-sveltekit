import isBoolean from 'lodash/isBoolean';
import {
	formatDateFromString,
	formatIngredientByBadge,
	formatInstitutionByShortId,
	formatLanguageValueArray,
	formatPlaceByShortId,
	formatTaleArray,
	parseFieldNumber
} from '$lib/dashboard/utils/dataNormalizers';
import type {
	ContainerColor,
	ContainerMaterial,
	ContainerType,
	ContainerUnit
} from '$lib/utils/enums/Beverage.enum';
import type { LabelFormValues, LabelFormOutput } from './LabelFormValues';

export default function formatValues({
	aged,
	alcohol,
	badge,
	barcode,
	bitterness,
	brand,
	container,
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
	name,
	nitrogen,
	pasteurization,
	place,
	power,
	price,
	remark,
	series,
	smokedMalt,
	style,
	sweetness,
	tale,
	temperature
}: LabelFormValues): LabelFormOutput {
	return {
		badge: badge.trim(),
		// -----------
		name: formatLanguageValueArray(name),
		...(series.length && { series: formatLanguageValueArray(series) }),
		brand: formatInstitutionByShortId(brand),
		...(cooperation && { cooperation: cooperation.map(formatInstitutionByShortId) }),
		...(contract && contract !== '--' && { contract: formatInstitutionByShortId(contract) }),
		...(contract === '--' && { isContract: true }),
		...(place && { place: formatPlaceByShortId(place) }),
		...(remark.length && { remark: formatLanguageValueArray(remark) }),
		...(tale.length && { tale: tale.map(formatTaleArray) }),
		...(barcode && { barcode: barcode.trim() }),
		// -----------
		...(fermentation && fermentation.length && { fermentation }),
		...(style.length && { style: formatLanguageValueArray(style) }),
		...(!Object.values(extract).every((prop) => prop === null) && {
			extract: {
				value: parseFieldNumber(extract.value),
				unit: extract.unit,
				relate: extract.relate
			}
		}),
		...(!Object.values(alcohol).every((prop) => prop === null) && {
			alcohol: {
				value: parseFieldNumber(alcohol.value),
				unit: alcohol.unit,
				relate: alcohol.relate,
				...(alcohol.scope !== '--' && { scope: alcohol.scope })
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
		container: {
			color: container.color as ContainerColor,
			...(container.hasCapWireFlip && { hasCapWireFlip: container.hasCapWireFlip }),
			...(container.hasCork && { hasCork: container.hasCork }),
			material: container.material as ContainerMaterial,
			type: container.type as ContainerType,
			unit: container.unit as ContainerUnit,
			value: parseFieldNumber(container.value)
		},
		...(price.length && {
			price: price.map(({ currency, date, shop, value }) => ({
				currency,
				date: formatDateFromString(date),
				...(shop && { shop }),
				value: parseFieldNumber(value)
			}))
		})
	};
}
