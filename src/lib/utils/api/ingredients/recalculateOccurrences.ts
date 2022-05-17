import { getDbCollections } from '$lib/utils/api';

async function recalculateOccurrences() {
	const { beverages, ingredients } = await getDbCollections();

	/* reset ingredients occurrences */

	await ingredients.updateMany(
		{},
		{
			$set: {
				occurrences: {
					alone: 0,
					withSuccessors: 0
				}
			},
			$unset: {
				successorsList: ''
			}
		}
	);

	/* get ingredients badges from all beverages */

	const ingredientBadges = [];

	await beverages
		.find(
			{},
			{
				projection: {
					_id: 0,
					label: '$label.ingredients.tags.badge',
					producer: '$producer.ingredients.tags.badge'
				}
			}
		)
		// @ts-ignore
		.forEach(({ label, producer }: { label: string[]; producer: string[] }) => {
			const combined = new Set([...(label ? label : []), ...(producer ? producer : [])]);
			combined.forEach((value) => ingredientBadges.push(value));
		});

	/* calculate occurrences */

	const occurrences = ingredientBadges.reduce((acc, curr) => {
		if (acc[curr]) {
			acc[curr] += 1;
		} else {
			acc[curr] = 1;
		}

		return acc;
	}, {});

	/* update ingredients */

	function updateSelected(successor: boolean, child: string | null) {
		return async function ([badge, value]: [string, number]) {
			const ingredientToUpdate = await ingredients.findOne({ badge });

			if (successor) {
				await ingredients.updateOne(
					{ badge },
					{
						$inc: { 'occurrences.withSuccessors': value },
						$push: { successorsList: child }
					}
				);
			} else {
				await ingredients.updateOne(
					{ badge },
					{
						$set: { 'occurrences.alone': value, 'occurrences.withSuccessors': value }
					}
				);
			}

			if (ingredientToUpdate.parent) {
				updateSelected(true, badge)([ingredientToUpdate.parent, value]);
			}
		};
	}

	Object.entries(occurrences).forEach(updateSelected(false, null));
}

export default recalculateOccurrences;
