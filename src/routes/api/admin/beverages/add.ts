import { formatBasics, formatBeverage, generateShortId, getDbCollections } from '$lib/utils/api';
import type { RawBasics, RawBasicsWithoutId } from '$lib/utils/types/api/RawBasics.d';
import type { NewBeverageRequest } from '$lib/utils/types/api/requests/Beverage';
import type {
	RawBeverage,
	RawBeverageWithoutId
} from '$lib/utils/types/api/RawBeverage/RawBeverage.d';

export async function post({ locals, request }) {
	const beverageData: NewBeverageRequest = await request.json();
	const { basics, beverages } = await getDbCollections();

	if (!locals.authenticated) {
		return {
			status: 401,
			body: {
				message: 'Unauthorized. Cannot add new beverage'
			}
		};
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

	return {
		body: {
			badge: formattedBasics.badge,
			brand: formattedBasics.brand.badge,
			shortId: formattedBasics.shortId
		}
	};
}
