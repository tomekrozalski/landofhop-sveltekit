import { basics } from '$db/mongo';
import type { LinkData } from '../types/LinkData.d';

type GetPreviousType = {
	added: Date;
};

const getPrevious = async ({ added }: GetPreviousType): Promise<LinkData | null> => {
	const previousBasics: LinkData[] = [];

	await basics
		.find({ added: { $lt: added } })
		.sort({ added: -1 })
		.limit(1)
		.forEach(({ badge, brand, shortId }) => {
			previousBasics.push({
				badge,
				brand: brand.badge,
				shortId
			});
		});

	return previousBasics.length ? previousBasics[0] : null;
};

export default getPrevious;
