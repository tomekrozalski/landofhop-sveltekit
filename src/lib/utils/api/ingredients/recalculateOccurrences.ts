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

	/* update ingredients */

	function updateSelected(successor: boolean) {
		return async function (badge: string) {
			const ingredientToUpdate = await ingredients.findOne({ badge });

			if (successor) {
				await ingredients.updateOne(
					{ badge },
					{
						$inc: { 'occurrences.withSuccessors': 1 }
					}
				);
			} else {
				await ingredients.updateOne(
					{ badge },
					{
						$inc: { 'occurrences.alone': 1, 'occurrences.withSuccessors': 1 }
					}
				);
			}

			if (ingredientToUpdate.parent) {
				updateSelected(true)(ingredientToUpdate.parent);
			}
		};
	}

	ingredientBadges.forEach(updateSelected(false));
}

export default recalculateOccurrences;
