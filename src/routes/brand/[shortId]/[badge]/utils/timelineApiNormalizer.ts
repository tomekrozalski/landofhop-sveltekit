import { format } from 'date-fns';
import generateMonthList from '$lib/utils/helpers/generateMonthList';
import { AppLanguage } from '$types/enums/Globals.enum';
import { formatBeveragesToBasics } from '$lib/utils/api';
import type { RawBeverage } from '$types/RawBeverage.d';
import type { BrandTimelineData } from '../types.d';

type TimelineApiNormalizerTypes = {
	badge: string;
	rawBeverages: RawBeverage[];
	shortId: string;
};

type RawValuesTypes = {
	date: string;
	beverages: RawBeverage[];
	asCooperator: RawBeverage[];
	asContractor: RawBeverage[];
};

const timelineApiNormalizer = ({
	badge,
	rawBeverages,
	shortId
}: TimelineApiNormalizerTypes): BrandTimelineData[] => {
	const rawValues: RawValuesTypes[] = [];
	const dateList = generateMonthList();

	dateList.forEach((date) => {
		rawValues.push({
			date: format(date, 'yyyy-MM'),
			beverages: rawBeverages.filter(
				({ added, label }) =>
					format(added, 'yyyy-MM') === format(date, 'yyyy-MM') &&
					label.general.brand.badge === badge &&
					label.general.brand.shortId === shortId
			),
			asCooperator: rawBeverages.filter(({ added, editorial, label, producer }) => {
				function isCooperation(values?: { badge: string; shortId: string }[]) {
					return (
						!!values?.find((props) => props.badge === badge) &&
						!!values?.find((props) => props.shortId === shortId)
					);
				}

				return (
					format(added, 'yyyy-MM') === format(date, 'yyyy-MM') &&
					(isCooperation(label.general.cooperation) ||
						isCooperation(producer?.general?.cooperation) ||
						isCooperation(editorial?.general?.cooperation))
				);
			}),
			asContractor: rawBeverages.filter(
				({ added, editorial, label, producer }) =>
					format(added, 'yyyy-MM') === format(date, 'yyyy-MM') &&
					((label.general.contract?.badge === badge &&
						label.general.contract?.shortId === shortId) ||
						(producer?.general?.contract?.badge === badge &&
							producer?.general?.contract?.shortId === shortId) ||
						(editorial?.general?.contract?.badge === badge &&
							editorial?.general?.contract?.shortId === shortId))
			)
		});
	});

	return rawValues.map(({ asContractor, asCooperator, date, beverages }) => ({
		date,
		...(beverages.length && {
			beverages: formatBeveragesToBasics(beverages, AppLanguage.pl)
		}),
		...(asCooperator.length && {
			asCooperator: formatBeveragesToBasics(asCooperator, AppLanguage.pl)
		}),
		...(asContractor.length && {
			asContractor: formatBeveragesToBasics(asContractor, AppLanguage.pl)
		})
	}));
};

export default timelineApiNormalizer;
