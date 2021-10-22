import {
	formatInstitutionByShortId,
	formatLanguageValueArray
} from '$lib/dashboard/utils/dataNormalizers';
import type {
	ContainerColor,
	ContainerMaterial,
	ContainerType,
	ContainerUnit
} from '$lib/utils/enums/Beverage.enum';
import type { LabelFormValues, LabelFormOutput } from './LabelFormValues';

export default function formatValues({
	badge,
	barcode,
	brand,
	container,
	cooperation,
	name,
	series
}: LabelFormValues): LabelFormOutput {
	return {
		badge: badge.trim(),
		name: formatLanguageValueArray(name),
		...(series.length && { series: formatLanguageValueArray(series) }),
		brand: formatInstitutionByShortId(brand),
		...(cooperation && { cooperation: cooperation.map(formatInstitutionByShortId) }),
		...(barcode && { barcode: barcode.trim() }),
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
