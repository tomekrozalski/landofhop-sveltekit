import { formatInstitutionByShortId } from '$lib/dashboard/utils/dataNormalizers';
import type { EditorialFormValues, EditorialFormOutput } from './EditorialFormValues';

export default function formatValues(props: EditorialFormValues): EditorialFormOutput {
	console.log('EditorialFormValues', props);

	const { cooperation } = props;

	const data = {
		...(cooperation && { cooperation: cooperation.map(formatInstitutionByShortId) })
	};

	console.log('output', data);

	return data;
}
