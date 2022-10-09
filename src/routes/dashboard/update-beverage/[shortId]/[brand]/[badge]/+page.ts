import { getJsonData } from '$lib/utils/api/communication';
import type { LabelFormValues } from '../../../../Beverage/Label/LabelFormValues';
import type { ProducerFormValues } from '../../../../Beverage/Producer/ProducerFormValues';
import type { EditorialFormValues } from '../../../../Beverage/Editorial/EditorialFormValues';
import type { PageLoad } from './$types';

type DetailsAdmin = {
	label: LabelFormValues;
	producer: ProducerFormValues;
	editorial: EditorialFormValues;
};

export const load: PageLoad = async ({ fetch, params }) => {
	try {
		const beverage: DetailsAdmin = await getJsonData({
			fetch,
			path: `/api/admin/beverages/details/${params.shortId}`
		});

		return { beverage };
	} catch (err) {
		return { beverage: null };
	}
};
