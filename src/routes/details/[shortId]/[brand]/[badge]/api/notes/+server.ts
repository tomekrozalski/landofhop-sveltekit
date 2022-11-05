import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { format } from 'date-fns';
import { beverages } from '$db/mongo';
import { authenticate } from '$lib/utils/api';
import { AppLanguage, DateFormat } from '$types/enums/Globals.enum';
import type { AdminData } from '../../AdminBar/AdminData.d';

export const GET: RequestHandler = async ({ cookies, params }) => {
	const authenticated = await authenticate(cookies);
	const { badge, shortId } = params;

	if (!authenticated) {
		throw error(401, 'Unauthorized. Cannot load admin beverage notes');
	}

	type RawData = {
		notes?: string;
		updated?: Date;
		ratings?: {
			rateBeer: {
				beverageId: number;
				quantity?: number;
				value?: number;
				date?: Date;
			};
			untappd: {
				beverageSlug: string;
				quantity?: number;
				value?: number;
				date?: Date;
			};
			total?: {
				quantity: number;
				value: number;
				date?: Date;
			};
		};
	};

	const data: RawData | null = await beverages.findOne(
		{ badge, shortId },
		{ projection: { _id: 0, notes: '$editorial.notes', ratings: '$editorial.ratings', updated: 1 } }
	);

	if (!data) {
		throw error(404, 'No beverage found');
	}

	const formattedData: AdminData = {
		...(data.notes && { notes: data.notes }),
		...(data.updated && {
			updated: format(new Date(data.updated), DateFormat[AppLanguage.pl])
		}),
		...(data.ratings && {
			ratings: {
				...(data.ratings.rateBeer?.beverageId && { rateBeer: data.ratings.rateBeer.beverageId }),
				...(data.ratings.untappd?.beverageSlug && { untappd: data.ratings.untappd.beverageSlug })
			}
		})
	};

	return json(formattedData);
};
