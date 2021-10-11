import {
	formatInstitutionByShortId,
	formatLanguageValueArray
} from '$lib/dashboard/utils/dataNormalizers';
import type { ProducerFormValues, ProducerFormOutput } from './ProducerFormValues';

export default function formatValues({
	cooperation,
	series
}: ProducerFormValues): ProducerFormOutput {
	return {
		...(series.length && { series: formatLanguageValueArray(series) }),
		...(cooperation && { cooperation: cooperation.map(formatInstitutionByShortId) })
	};
}
