import isBoolean from 'lodash/isBoolean';
import {
	formatInstitutionByShortId,
	formatLanguageValueArray,
	formatTaleArray
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
	brand,
	container,
	cooperation,
	extract,
	filtration,
	name,
	pasteurization,
	series,
	style,
	tale
}: LabelFormValues): LabelFormOutput {
	return {
		badge: badge.trim(),
		// -----------
		name: formatLanguageValueArray(name),
		...(series.length && { series: formatLanguageValueArray(series) }),
		brand: formatInstitutionByShortId(brand),
		...(cooperation && { cooperation: cooperation.map(formatInstitutionByShortId) }),
		...(tale.length && { tale: tale.map(formatTaleArray) }),
		...(barcode && { barcode: barcode.trim() }),
		// -----------
		...(style.length && { style: formatLanguageValueArray(style) }),
		...(!Object.values(extract).every((prop) => prop === null) && { extract }),
		...(!Object.values(alcohol).every((prop) => prop === null) && {
			alcohol: {
				value: alcohol.value,
				unit: alcohol.unit,
				relate: alcohol.relate,
				...(alcohol.scope !== '--' && { scope: alcohol.scope })
			}
		}),
		...(isBoolean(filtration) && { filtration }),
		...(isBoolean(pasteurization) && { pasteurization }),
		// -----------
		container: {
			color: container.color as ContainerColor,
			...(container.hasCapWireFlip && { hasCapWireFlip: container.hasCapWireFlip }),
			...(container.hasCork && { hasCork: container.hasCork }),
			material: container.material as ContainerMaterial,
			type: container.type as ContainerType,
			unit: container.unit as ContainerUnit,
			value: +container.value
		}
	};
}
