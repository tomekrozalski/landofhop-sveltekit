import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { set } from 'lodash-es';
import { getDbCollections } from '$lib/utils/api';
import { translate } from '$lib/utils/api';
import { AppLanguage } from '$lib/utils/enums/AppLanguage.enum';
import type { IngredientTree } from '$lib/utils/types/Ingredient';
import type { IngredientsStatsNavigation } from '$lib/utils/types/stats/General';

export const GET: RequestHandler = async ({ params }) => {
	const language = params.language ?? AppLanguage.en;
	const badge = params.badge;

	const { ingredients } = await getDbCollections();

	/* create navigation data */

	let navigation: IngredientsStatsNavigation = [];

	await ingredients
		.find({ parent: { $exists: false } }, { projection: { badge: 1, occurrences: 1 } })
		.sort({ _id: 1 })
		.forEach(({ badge, occurrences }) => {
			navigation.push({
				badge,
				occurrences: occurrences.withSuccessors
			});
		});

	const { type } = await ingredients.findOne({ badge });
	navigation = navigation.map((item) => (item.badge === type ? { ...item, active: true } : item));

	/* create three data */
	/* step 1: generate path, eg. ['addition', 'vanilla', 'vanilla-extract'] */

	const path = [];

	async function generatePath(value) {
		path.unshift(value);

		const ingredientData = await ingredients.findOne({ badge: value });

		if (ingredientData.parent) {
			await generatePath(ingredientData.parent);
		}
	}

	await generatePath(badge);

	/* step 2: generate source object (main category object) */

	const sourceRaw = await ingredients.findOne({ badge: path[0] });

	const tree: IngredientTree = {
		badge: sourceRaw.badge,
		name: translate(sourceRaw.name, language),
		occurrences: sourceRaw.occurrences
	};

	async function createSuccessors(index: number, target: string) {
		const successorsData: IngredientTree[] = [];

		await ingredients
			.find(
				{ parent: path[index] },
				{ projection: { badge: 1, name: 1, occurrences: 1, successorsList: 1 } }
			)
			.sort({ 'occurrences.withSuccessors': -1 })
			.forEach(({ badge, name, occurrences, successorsList }) => {
				successorsData.push({
					badge,
					name: translate(name, language),
					occurrences,
					successorsList
				});
			});

		if (successorsData.length) {
			set(tree, target, successorsData);
		}

		if (path.length > index + 1) {
			const i = successorsData.findIndex((props) => props.badge === path[index + 1]);
			await createSuccessors(index + 1, `${target}[${i}].successors`);
		}
	}

	await createSuccessors(0, 'successors');

	return json({
		navigation,
		tree
	});
};
