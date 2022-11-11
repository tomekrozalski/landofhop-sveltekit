import { beverages, ingredients } from '$db/mongo';

const recalculateIngredients = async () => {
	// --------------------------------
	// reset ingredients occurrences

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

	// --------------------------------
	// get ingredients badges from all beverages

	const ingredientBadges: string[] = [];

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

	// --------------------------------
	// calculate occurrences

	const occurrences = ingredientBadges.reduce((acc: { [value: string]: number }, curr) => {
		if (acc[curr]) {
			acc[curr] += 1;
		} else {
			acc[curr] = 1;
		}

		return acc;
	}, {});

	// --------------------------------
	// update ingredients

	const updateSelected = async ({
		child,
		badge,
		successor,
		value
	}: {
		badge: string;
		child: string | null;
		successor: boolean;
		value: number;
	}) => {
		const ingredientToUpdate = await ingredients.findOne({ badge });

		if (successor && child) {
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

		if (ingredientToUpdate?.parent) {
			await updateSelected({
				badge: ingredientToUpdate.parent,
				successor: true,
				child: badge,
				value
			});
		}
	};

	const occurrencesList = Object.entries(occurrences);

	for (const [badge, value] of occurrencesList) {
		await updateSelected({
			badge,
			child: null,
			successor: false,
			value
		});
	}
};

export default recalculateIngredients;
