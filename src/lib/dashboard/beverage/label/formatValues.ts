import isBoolean from 'lodash/isBoolean';
import isNumber from 'lodash/isNumber';
import {
	formatDateFromString,
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
	alcohol,
	badge,
	barcode,
	bitterness,
	brand,
	container,
	contract,
	cooperation,
	extract,
	fermentation,
	filtration,
	fullness,
	hoppyness,
	name,
	pasteurization,
	place,
	power,
	price,
	remark,
	series,
	style,
	sweetness,
	tale
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
		// -----------
		...(bitterness && { bitterness: +bitterness }),
		...(sweetness && { sweetness: +sweetness }),
		...(fullness && { fullness: +fullness }),
		...(power && { power: +power }),
		...(hoppyness && { hoppyness: +hoppyness }),
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
