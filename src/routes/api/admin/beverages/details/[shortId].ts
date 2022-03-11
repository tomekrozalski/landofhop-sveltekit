import { adminDetailsNormalizer, authenticate, getDbCollections } from '$lib/utils/api';
import type { RawBeverage } from '$lib/utils/types/api/RawBeverage/RawBeverage.d';
import type { LabelFormValues } from '$lib/dashboard/beverage/label/LabelFormValues';
import type { ProducerFormValues } from '$lib/dashboard/beverage/producer/ProducerFormValues';
import type { EditorialFormValues } from '$lib/dashboard/beverage/editorial/EditorialFormValues';

export async function get({ params, request }) {
	const [isAuthenticated, headers] = await authenticate(request);

	if (!isAuthenticated) {
		return {
			status: 401,
			body: 'Unauthorized. List of ingredients cannot be sent'
		};
	}

	const { shortId } = params;
	const { beverages } = await getDbCollections();

	const beverage: RawBeverage = await beverages.findOne({ shortId });

	if (!beverage) {
		return { status: 404 };
	}

	const formattedDetails: {
		label: LabelFormValues;
		producer: ProducerFormValues;
		editorial: EditorialFormValues;
	} = adminDetailsNormalizer(beverage);

	return {
		headers,
		body: formattedDetails
	};
}
