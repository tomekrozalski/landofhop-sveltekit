import { error } from '@sveltejs/kit';
import { beverages } from '$db/mongo';
import type { RawBeverage } from '$types/RawBeverage.d';

type GetDetailsType = {
	shortId: string;
};

const getDetails = async ({ shortId }: GetDetailsType): Promise<RawBeverage> => {
	const beverage: RawBeverage | null = await beverages.findOne({ shortId });

	if (!beverage) {
		throw error(404);
	}

	return beverage;
};

export default getDetails;
