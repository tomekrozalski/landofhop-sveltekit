import { add, format, isBefore } from 'date-fns';
import type { YearMonth } from '$types/Charts.d';

type GenerateMonthListTypes = {
	startDate: YearMonth;
	finishDate: YearMonth;
};

const generateMonthList = (
	{ startDate, finishDate }: GenerateMonthListTypes = {
		startDate: { month: 6, year: 2017 },
		finishDate: {
			month: Number(format(new Date(), 'MM')),
			year: Number(format(new Date(), 'yyyy'))
		}
	}
): Date[] => {
	const dateList = [];
	let currentDate = new Date(startDate.year, startDate.month - 1);

	do {
		dateList.push(currentDate);
		const nextMonthDate = add(currentDate, { months: 1 });
		currentDate = nextMonthDate;
	} while (
		isBefore(currentDate, add(new Date(finishDate.year, finishDate.month - 1), { months: 1 }))
	);

	return dateList;
};

export default generateMonthList;
