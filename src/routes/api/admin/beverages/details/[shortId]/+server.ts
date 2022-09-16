import { json } from '@sveltejs/kit';
import { adminDetailsNormalizer, getDbCollections } from '$lib/utils/api';
import type { RawBeverage } from '$lib/utils/types/api/RawBeverage/RawBeverage.d';
import type { LabelFormValues } from '$lib/dashboard/Beverage/Label/LabelFormValues';
import type { ProducerFormValues } from '$lib/dashboard/Beverage/Producer/ProducerFormValues';
import type { EditorialFormValues } from '$lib/dashboard/Beverage/Editorial/EditorialFormValues';

export async function GET({ locals, params }) {
	if (!locals.authenticated) {
		return json(
			{
				message: 'Unauthorized. Cannot load beverage admin details'
			},
			{
				status: 401
			}
		);
	}

	const { shortId } = params;
	const { beverages } = await getDbCollections();

	const beverage: RawBeverage = await beverages.findOne({ shortId });

	if (!beverage) {
		return new Response(undefined, { status: 404 });
	}

	const formattedDetails: {
		label: LabelFormValues;
		producer: ProducerFormValues;
		editorial: EditorialFormValues;
	} = adminDetailsNormalizer(beverage);

	return json(formattedDetails);
}
