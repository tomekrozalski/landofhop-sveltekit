import {
	formatInstitutionByShortId,
	formatLanguageValueArray
} from '$lib/dashboard/utils/dataNormalizers';
import type { LabelFormValues, LabelFormOutput } from './LabelFormValues';

export default function formatValues({
	badge,
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
		container: {
			color: container.color,
			...(container.hasCapWireFlip && { hasCapWireFlip: container.hasCapWireFlip }),
			...(container.hasCork && { hasCork: container.hasCork }),
			material: container.material,
			type: container.type,
			unit: container.unit,
			value: +container.value
		}
	};
}
