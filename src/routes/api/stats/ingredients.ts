import { set } from 'lodash-es';

import { getDbCollections } from '$lib/utils/api';
import { translate } from '$lib/utils/api';
import { AppLanguage } from '$lib/utils/enums/AppLanguage.enum';
import type { IngredientTree } from '$lib/utils/types/Ingredient';
import type { IngredientsStatsNavigation } from '$lib/utils/types/stats/General';

export async function post({ request }) {
	const requestData = await request.json();
	const language = requestData.language ?? AppLanguage.en;
	const badge = requestData.badge;

	const { ingredients } = await getDbCollections();

	/* create navigation data */

	const navigation: IngredientsStatsNavigation = {
		water: {
			name: '',
			occurrences: 0
		},
		malt: {
			name: '',
			occurrences: 0
		},
		hop: {
			name: '',
			occurrences: 0
		},
		yeast: {
			name: '',
			occurrences: 0
		},
		addition: {
			name: '',
			occurrences: 0
		}
	};

	await ingredients.find({ parent: { $exists: false } }).forEach(({ badge, name, occurrences }) => {
		navigation[badge].name = translate(name, language);
		navigation[badge].occurrences = occurrences.withSuccessors;
	});

	/* create three data */
	/* step 1: generate path, eg. ['addition', 'vanilla', 'vanilla-extract'] */

	const path = [];

	async function generatePath(badge) {
		path.unshift(badge);

		const ingredientData = await ingredients.findOne({ badge });

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

		await ingredients.find({ parent: path[index] }).forEach(({ badge, name, occurrences }) => {
			successorsData.push({
				badge,
				name: translate(name, language),
				occurrences
			});
		});

		set(tree, target, successorsData);

		if (path.length > index + 2) {
			const i = successorsData.findIndex((props) => props.badge === path[index + 1]);
			await createSuccessors(index + 1, `${target}[${i}].successors`);
		}
	}

	await createSuccessors(0, 'successors');

	return {
		body: {
			navigation,
			tree
		}
	};
}
