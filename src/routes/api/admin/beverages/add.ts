import {
	authenticate,
	formatBasics,
	formatBeverage,
	generateShortId,
	getDbCollections
} from '$lib/utils/api';
import type { RawBasics, RawBasicsWithoutId } from '$lib/utils/types/api/RawBasics.d';
import type {
	RawBeverage,
	RawBeverageWithoutId
} from '$lib/utils/types/api/RawBeverage/RawBeverage.d';

export async function post({ request }) {
	const beverageData = await request.json();

	const { basics, beverages } = await getDbCollections();
	const [isAuthenticated, headers] = await authenticate(request);

	if (!isAuthenticated) {
		return {
			status: 401,
			body: {
				message: 'Unauthorized. Cannot add new beverage'
			}
		};
	}

	const commonProps = {
		shortId: generateShortId(),
		added: new Date()
	};

	const formattedBasics: RawBasicsWithoutId = formatBasics(beverageData, commonProps);
	const formattedBeverage: RawBeverageWithoutId = formatBeverage(beverageData, commonProps);

	await basics.insertOne(formattedBasics as RawBasics);
	await beverages.insertOne(formattedBeverage as RawBeverage);

	return {
		headers,
		body: {
			badge: formattedBasics.badge,
			brand: formattedBasics.brand.badge,
			shortId: formattedBasics.shortId
		}
	};
}
