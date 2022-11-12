import { beverages, institutions } from '$db/mongo';
import type { RawInstitution } from '$types/RawInstitution';

const recalculateInstitutions = async () => {
	// --------------------------------
	// get average score for all evaluated beverages

	const ratings = await beverages
		.aggregate([
			{
				$group: {
					_id: null,
					avgRating: { $avg: '$editorial.ratings.total.value' }
				}
			}
		])
		.toArray();

	const averageScoreForAllBeverages = ratings[0].avgRating;

	// --------------------------------
	// reset institution statsData

	await institutions.updateMany(
		{},
		{
			$unset: {
				statsData: ''
			}
		}
	);

	// --------------------------------
	// get all beverages data

	const rawBeverages = await beverages.find({}).toArray();

	// --------------------------------
	// loop through institutions

	const formattedInstitutions: RawInstitution[] = [];

	await institutions.find({}).forEach((institution) => {
		// ---------------------
		// beverages

		const foundBeverages = rawBeverages.filter(
			({ label }) => label.general.brand.shortId === institution.shortId
		);

		// ---------------------
		// asCooperator

		const foundAsCooperator = rawBeverages.filter((item) => {
			const labelCooperation = item.label.general.cooperation;
			const producerCooperation = item.producer?.general?.cooperation;
			const editorialCooperation = item.editorial?.general?.cooperation;

			if (labelCooperation) {
				return labelCooperation.map(({ shortId }) => shortId).includes(institution.shortId);
			}

			if (producerCooperation) {
				return producerCooperation.map(({ shortId }) => shortId).includes(institution.shortId);
			}

			if (editorialCooperation) {
				return editorialCooperation.map(({ shortId }) => shortId).includes(institution.shortId);
			}

			return false;
		});

		// ---------------------
		// asContractor

		const foundAsContractor = rawBeverages.filter(
			(item) =>
				item.label.general.contract?.shortId === institution.shortId ||
				item.producer?.general?.contract?.shortId === institution.shortId ||
				item.editorial?.general?.contract?.shortId === institution.shortId
		);

		// ---------------------
		// avrScore

		const avrScoreValue = foundBeverages.reduce(
			(acc, { editorial }) => {
				if (editorial?.ratings?.total?.value) {
					return {
						total: acc.total + editorial.ratings.total.value,
						items: acc.items + 1
					};
				}

				return acc;
			},
			{ total: 0, items: 0 }
		);

		// ---------------------
		// points

		const pointsValue = foundBeverages.reduce((acc, { editorial }) => {
			if (editorial?.ratings?.total?.value) {
				const rating = editorial.ratings.total.value;
				const diff = rating - averageScoreForAllBeverages;

				if (diff > 0) {
					return acc + Math.ceil(diff * 10);
				}

				if (diff < 0) {
					return acc + Math.floor(diff * 10);
				}
			}

			return acc;
		}, 0);

		// ---------------------

		formattedInstitutions.push({
			...institution,
			statsData: {
				beverages: foundBeverages.length,
				asCooperator: foundAsCooperator.length,
				asContractor: foundAsContractor.length,
				...(avrScoreValue.total &&
					avrScoreValue.items && {
						avrScore: {
							value: avrScoreValue.total / avrScoreValue.items,
							ranking: 0
						}
					}),
				points: {
					value: pointsValue,
					ranking: 0
				}
			}
		});
	});

	// ---------------------
	// set avrScore ranking

	const sortedByAvrScore = formattedInstitutions.sort((a, b) =>
		(a.statsData.avrScore?.value ?? 0) > (b.statsData.avrScore?.value ?? 0) ? -1 : 1
	);

	const insitutionWithAvrScoreRanking = sortedByAvrScore.map((institution, index) => ({
		...institution,
		statsData: {
			...institution.statsData,
			...(institution.statsData.avrScore && {
				avrScore: {
					value: institution.statsData.avrScore.value,
					ranking: index + 1
				}
			})
		}
	}));

	// ---------------------
	// set points ranking

	const sortedByPoints = insitutionWithAvrScoreRanking.sort((a, b) =>
		a.statsData.points.value > b.statsData.points.value ? -1 : 1
	);

	const insitutionWithPointsRanking = sortedByPoints.map((institution, index) => ({
		...institution,
		statsData: {
			...institution.statsData,
			points: {
				value: institution.statsData.points.value,
				ranking: index + 1
			}
		}
	}));

	// ---------------------
	// update database collection

	for (const updatedInstitution of insitutionWithPointsRanking) {
		institutions.updateOne(
			{ shortId: updatedInstitution.shortId },
			{
				$set: { statsData: updatedInstitution.statsData }
			}
		);
	}
};

export default recalculateInstitutions;
