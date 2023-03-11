import { format } from 'date-fns';
import { error } from '@sveltejs/kit';
import { beverages } from '$db/mongo';
import { AppLanguage, DateFormat } from '$types/enums/Globals.enum';
import type { AdminData } from '../../AdminBar/AdminData.d';

type AetAdminDataType = {
	badge: string;
	shortId: string;
};

const getAdminData = async ({ badge, shortId }: AetAdminDataType): Promise<AdminData> => {
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

	return {
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
};

export default getAdminData;
