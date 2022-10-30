import { get } from 'svelte/store';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { beverages } from '$db/mongo';
import authentication from '$lib/utils/stores/authentication';
import type { RawBeverage } from '$types/RawBeverage.d';
import type { LabelFormValues } from '$Beverage/Label/LabelFormValues';
import type { ProducerFormValues } from '$Beverage/Producer/ProducerFormValues';
import type { EditorialFormValues } from '$Beverage/Editorial/EditorialFormValues';
import { adminDetailsNormalizer } from '$Beverage/utils/apiNormalizers';

export const GET: RequestHandler = async ({ params }) => {
	if (!get(authentication).isLoggedIn) {
		throw error(401, 'Unauthorized. Cannot load beverage admin details');
	}

	const beverage: RawBeverage | null = await beverages.findOne({ shortId: params.shortId });

	if (!beverage) {
		return new Response('Beverage not found', { status: 404 });
	}

	const formattedDetails: {
		label: LabelFormValues;
		producer: ProducerFormValues;
		editorial: EditorialFormValues;
	} = adminDetailsNormalizer(beverage);

	return json(formattedDetails);
};
