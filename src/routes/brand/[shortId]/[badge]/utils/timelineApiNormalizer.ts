import { format } from 'date-fns';
import generateMonthList from '$lib/utils/helpers/generateMonthList';
import normalizeApiData from '$lib/templates/BeverageList/normalizeApiData';
import type { RawBasics } from '$types/RawBasics.d';
import type { BrandTimelineData } from '../types.d';

const timelineApiNormalizer = (values: RawBasics[]): BrandTimelineData[] => {
	const domain: { date: string; beverages: RawBasics[] }[] = [];
	const dateList = generateMonthList();

	dateList.forEach((date) => {
		domain.push({
			date: format(date, 'yyyy-MM'),
			beverages: values.filter(({ added }) => format(added, 'yyyy-MM') === format(date, 'yyyy-MM'))
		});
	});

	return domain.map(({ date, beverages }) => ({
		date,
		...(beverages.length && { beverages: normalizeApiData(beverages) })
	}));
};

export default timelineApiNormalizer;
