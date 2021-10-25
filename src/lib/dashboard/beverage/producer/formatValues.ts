import isBoolean from 'lodash/isBoolean';
import {
	formatInstitutionByShortId,
	formatLanguageValueArray,
	formatTaleArray
} from '$lib/dashboard/utils/dataNormalizers';
import type { ProducerFormValues, ProducerFormOutput } from './ProducerFormValues';

export default function formatValues({
	alcohol,
	cooperation,
	extract,
	filtration,
	pasteurization,
	series,
	style,
	tale
}: ProducerFormValues): ProducerFormOutput {
	return {
		...(series.length && { series: formatLanguageValueArray(series) }),
		...(cooperation && { cooperation: cooperation.map(formatInstitutionByShortId) }),
		...(tale.length && { tale: tale.map(formatTaleArray) }),
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
		...(isBoolean(pasteurization) && { pasteurization })
	};
}
