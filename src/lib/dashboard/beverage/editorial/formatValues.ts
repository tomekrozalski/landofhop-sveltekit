import { formatInstitutionByShortId } from '$lib/dashboard/utils/dataNormalizers';
import type { EditorialFormValues, EditorialFormOutput } from './EditorialFormValues';

export default function formatValues({
	cooperation,
	notes
}: EditorialFormValues): EditorialFormOutput {
	return {
		...(cooperation && { cooperation: cooperation.map(formatInstitutionByShortId) }),
		...(notes && { notes })
	};
}
