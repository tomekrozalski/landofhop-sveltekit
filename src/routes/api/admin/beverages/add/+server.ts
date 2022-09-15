import { json as json$1 } from '@sveltejs/kit';
import { formatBasics, formatBeverage, generateShortId, getDbCollections } from '$lib/utils/api';
import type { RawBasics, RawBasicsWithoutId } from '$lib/utils/types/api/RawBasics.d';
import type { NewBeverageRequest } from '$lib/utils/types/api/requests/Beverage';
import type {
	RawBeverage,
	RawBeverageWithoutId
} from '$lib/utils/types/api/RawBeverage/RawBeverage.d';

export async function POST({ locals, request }) {
	const beverageData: NewBeverageRequest = await request.json();
	const { basics, beverages } = await getDbCollections();

	if (!locals.authenticated) {
		return json$1({
			message: 'Unauthorized. Cannot add new beverage'
		}, {
			status: 401
		});
	}

	const commonProps = {
		badge: beverageData.label.badge,
		shortId: generateShortId(),
		added: new Date()
	};

	const formattedBasics: RawBasicsWithoutId = formatBasics(beverageData, commonProps);
	const formattedBeverage: RawBeverageWithoutId = formatBeverage(beverageData, commonProps);

	await basics.insertOne(formattedBasics as RawBasics);
	await beverages.insertOne(formattedBeverage as RawBeverage);

	return json$1({
		badge: formattedBasics.badge,
		brand: formattedBasics.brand.badge,
		shortId: formattedBasics.shortId
	});
}
