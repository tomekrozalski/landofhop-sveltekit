import { basics } from '$db/mongo';
import type { LinkData } from '../types/LinkData.d';

type GetNextType = {
	added: Date;
};

const getNext = async ({ added }: GetNextType): Promise<LinkData | null> => {
	const nextBasics: LinkData[] = [];

	await basics
		.find({ added: { $gt: added } })
		.sort({ added: 1 })
		.limit(1)
		.forEach(({ badge, brand, shortId }) => {
			nextBasics.push({
				badge,
				brand: brand.badge,
				shortId
			});
		});

	return nextBasics.length ? nextBasics[0] : null;
};

export default getNext;
