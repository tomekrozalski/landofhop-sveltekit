import { set } from 'lodash-es';
import { ingredients } from '$db/mongo';
import { translate } from '$lib/utils/api';
import { AppLanguage } from '$types/enums/Globals.enum';
import type { RawIngredient } from '$types/RawIngredient.d';
import type { LanguageValue } from '$types/LanguageValue.d';
import type { Ingredient } from '$lib/utils/stores/types/Ingredient.d';
import type { IngredientTree, Navigation } from './types.d';
import type { PageServerLoad } from './$types';

// export const prerender = true;

export const load: PageServerLoad = async ({ params, parent }) => {
	const language = AppLanguage.en;
	const badge = params.type as string;

	/* create navigation data */

	let navigation: Navigation = [];

	await ingredients
		.find({ parent: { $exists: false } }, { projection: { badge: 1, occurrences: 1 } })
		.sort({ _id: 1 })
		.forEach(({ badge, occurrences }: RawIngredient) => {
			navigation.push({
				badge,
				occurrences: occurrences.withSuccessors
			});
		});

	const { type } = await ingredients.findOne({ badge });
	navigation = navigation.map((item) => (item.badge === type ? { ...item, active: true } : item));

	/* create three data */
	/* step 1: generate path, eg. ['addition', 'vanilla', 'vanilla-extract'] */

	const path: string[] = [];

	async function generatePath(badge: string) {
		path.unshift(badge);

		const ingredientData = await ingredients.findOne({ badge });

		if (ingredientData.parent) {
			await generatePath(ingredientData.parent);
		}
	}

	await generatePath(badge);

	/* step 2: generate source object (main category object) */

	const sourceRaw = (await ingredients.findOne({ badge: path[0] })) as RawIngredient;

	const tree: IngredientTree = {
		badge: sourceRaw.badge,
		name: translate(sourceRaw.name, language),
		occurrences: sourceRaw.occurrences
	};

	async function createSuccessors(index: number, target: string) {
		const successorsData: {
			badge: string;
			name: LanguageValue;
			occurrences: {
				alone: number;
				withSuccessors: number;
			};
			successorsList?: string[];
		}[] = [];

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

	const { authenticated } = await parent();
	let ingredientList: Ingredient[] | null = null;

	if (authenticated) {
		ingredientList = await ingredients
			.find(
				{},
				{
					projection: {
						_id: 0,
						badge: 1,
						name: 1,
						occurrences: 1,
						parent: 1,
						type: 1
					}
				}
			)
			.toArray();
	}

	return {
		statsData: {
			navigation,
			tree
		},
		ingredients: ingredientList
	};
};
