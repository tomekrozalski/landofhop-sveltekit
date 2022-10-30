import { get } from 'svelte/store';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { generateShortId } from '$lib/utils/api';
import type { RawBasics } from '$types/RawBasics.d';
import type { RawBeverage } from '$types/RawBeverage.d';
import type { CommonProps, NewBeverageRequest } from '$Beverage/utils/apiNormalizers/ApiTypes.d';
import { formatBasicsToDb, formatBeverageToDb } from '$Beverage/utils/apiNormalizers';
import authentication from '$lib/utils/stores/authentication';
import { basics, beverages } from '$db/mongo';

export const POST: RequestHandler = async ({ request }) => {
	const beverageData: NewBeverageRequest = await request.json();

	if (!get(authentication).isLoggedIn) {
		throw error(401, 'Unauthorized. Cannot add new beverage');
	}

	const commonProps: CommonProps = {
		badge: beverageData.label.badge,
		shortId: generateShortId(),
		added: new Date()
	};

	const formattedBasics: RawBasics = formatBasicsToDb(beverageData, commonProps);
	const formattedBeverage: RawBeverage = formatBeverageToDb(beverageData, commonProps);

	await basics.insertOne(formattedBasics);
	await beverages.insertOne(formattedBeverage);

	return json({
		badge: formattedBasics.badge,
		brand: formattedBasics.brand.badge,
		shortId: formattedBasics.shortId
	});
};
