import { get } from 'svelte/store';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import type { RawBeverage } from '$lib/utils/types/api/RawBeverage/RawBeverage.d';
import { adminDetailsNormalizer } from '$lib/utils/api';
import authentication from '$lib/utils/stores/authentication';
import type { LabelFormValues } from '../../../../../dashboard/Beverage/Label/LabelFormValues';
import type { ProducerFormValues } from '../../../../../dashboard/Beverage/Producer/ProducerFormValues';
import type { EditorialFormValues } from '../../../../../dashboard/Beverage/Editorial/EditorialFormValues';
import { beverages } from '$db/mongo';

export const GET: RequestHandler = async ({ params }) => {
	const shortId = params.shortId ?? '';

	if (!get(authentication).isLoggedIn) {
		throw error(401, 'Unauthorized. Cannot load beverage admin details');
	}

	const beverage: RawBeverage | null = await beverages.findOne({ shortId });

	if (!beverage) {
		return new Response(undefined, { status: 404 });
	}

	const formattedDetails: {
		label: LabelFormValues;
		producer: ProducerFormValues;
		editorial: EditorialFormValues;
	} = adminDetailsNormalizer(beverage);

	return json(formattedDetails);
};
