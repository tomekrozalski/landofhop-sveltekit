import {
	formatInstitutionByShortId,
	formatLanguageValueArray
} from '$lib/dashboard/utils/dataNormalizers';
import type { ProducerFormValues, ProducerFormOutput } from './ProducerFormValues';

export default function formatValues(props: ProducerFormValues): ProducerFormOutput {
	console.log('ProducerFormValues', props);

	const { cooperation, series } = props;

	const data = {
		...(series.length && { series: formatLanguageValueArray(series) }),
		...(cooperation && { cooperation: cooperation.map(formatInstitutionByShortId) })
	};

	console.log('output', data);

	return data;
}
