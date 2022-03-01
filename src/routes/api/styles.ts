import { getDbCollections } from '$lib/utils/api';
import type { StyleGroup } from '$lib/utils/enums/StyleGroup.enum';
import type { LanguageValue } from '$lib/utils/types/common/LanguageValue';

export type Styles = {
	badge: string;
	name: LanguageValue[];
	group: StyleGroup;
};

export async function get() {
	const { styles } = await getDbCollections();

	const data: Styles[] = await styles
		.find(
			{},
			{
				projection: {
					_id: 0,
					badge: 1,
					name: 1,
					group: 1
				}
			}
		)
		.toArray();

	return {
		body: data
	};
}
