import type { AppLanguage } from '$types/enums/Globals.enum';
import type { RawGeneralStats } from './RawGeneralStats.d';
import type {
	AddTimelineBar,
	AlcoholChartBar,
	Brand,
	GeneralStats,
	RatingsChartBar,
	TopBrandsTimelineBar
} from './Output';
import { addTimeline } from './addTimeline';
import { alcoholChart } from './alcoholChart';
import { ratingsChart } from './ratingsChart';
import { getTopBrands, topBrandsTimeline } from './topBrandsTimeline';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function normalizer(rawData: RawGeneralStats[], language: AppLanguage) {
	const addTimelineData: AddTimelineBar[] = addTimeline(rawData);
	const alcoholChartData: AlcoholChartBar[] = alcoholChart(rawData);
	const topBrandsTimelineData: TopBrandsTimelineBar[] = topBrandsTimeline(rawData);
	const morePopularBrandsData: Brand[] = getTopBrands(rawData, 10);
	const ratingsChartData: RatingsChartBar[] = ratingsChart(rawData);

	const completeData: GeneralStats = {
		addTimelineData,
		alcoholChartData,
		fermentationTimelineData: [],
		morePopularBrandsData,
		ratingsChartData,
		topBrandsTimelineData
	};

	return completeData;
}

export default normalizer;
