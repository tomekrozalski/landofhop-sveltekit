import isBoolean from 'lodash/isBoolean';
import {
	formatInstitutionByShortId,
	formatLanguageValueArray,
	formatTaleArray
} from '$lib/dashboard/utils/dataNormalizers';
import type { ProducerFormValues, ProducerFormOutput } from './ProducerFormValues';

export default function formatValues({
	cooperation,
	filtration,
	pasteurization,
	series,
	tale
}: ProducerFormValues): ProducerFormOutput {
	return {
		...(series.length && { series: formatLanguageValueArray(series) }),
		...(cooperation && { cooperation: cooperation.map(formatInstitutionByShortId) }),
		...(tale.length && { tale: tale.map(formatTaleArray) }),
		// -----------
		...(isBoolean(filtration) && { filtration }),
		...(isBoolean(pasteurization) && { pasteurization })
	};
}
