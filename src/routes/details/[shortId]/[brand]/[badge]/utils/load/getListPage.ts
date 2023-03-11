import { basics } from '$db/mongo';
import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';

type GetListPageType = {
	added: Date;
};

const getListPage = async ({ added }: GetListPageType) => {
	const beveragesBefore = await basics.find({ added: { $gt: added } }).count();

	return Math.ceil((beveragesBefore + 1) / BEVERAGES_ON_PAGE);
};

export default getListPage;
