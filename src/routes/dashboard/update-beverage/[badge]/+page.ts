import { getJsonData } from '$lib/utils/api/communication';
import type { LabelFormValues } from '$lib/dashboard/Beverage/Label/LabelFormValues';
import type { ProducerFormValues } from '$lib/dashboard/Beverage/Producer/ProducerFormValues';
import type { EditorialFormValues } from '$lib/dashboard/Beverage/Editorial/EditorialFormValues';

type DetailsAdmin = {
	label: LabelFormValues;
	producer: ProducerFormValues;
	editorial: EditorialFormValues;
};

export async function load({ fetch, params }) {
	try {
		const beverage: DetailsAdmin = await getJsonData({
			fetch,
			path: `/api/admin/beverages/details/${params.shortId}`
		});

		return { beverage };
	} catch (err) {
		return { beverage: null };
	}
}
