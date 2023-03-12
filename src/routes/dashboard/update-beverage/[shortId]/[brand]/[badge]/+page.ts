import type { LabelFormValues } from '$Beverage/Label/LabelFormValues';
import type { ProducerFormValues } from '$Beverage/Producer/ProducerFormValues';
import type { EditorialFormValues } from '$Beverage/Editorial/EditorialFormValues';

type DetailsAdmin = {
	label: LabelFormValues;
	producer: ProducerFormValues;
	editorial: EditorialFormValues;
};

export const load = async ({ fetch, params }) => {
	try {
		const response = await fetch(`/dashboard/api/get-beverage-details/${params.shortId}`);
		const beverage: DetailsAdmin = await response.json();

		return { beverage };
	} catch (err) {
		return { beverage: null };
	}
};
