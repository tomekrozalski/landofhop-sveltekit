<script lang="ts">
	import { beforeUpdate } from 'svelte';
	import { translate } from 'svelte-intl';
	import { slide } from 'svelte/transition';
	import { postJsonData } from '$lib/utils/api/communication';
	import Label from '$lib/elements/form/Label.svelte';
	import LanguageSelect from '../../selects/Language.svelte';
	import RemoveButton from '../../RemoveButton.svelte';
	import Plug from '../../Plug.svelte';
	import { emptyIngredients } from '$lib/utils/admin/emptyFieldValues';
	import IsListComplete from './IsListComplete.svelte';
	import ListOfInputs from './ListOfInputs.svelte';
	import Preview from './Preview.svelte';
	import SelectedLanguageHeader from './SelectedLanguageHeader.svelte';
	import ToggleList from './ToggleList.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, updateField, updateValidateField, validateField } = formData;
	let fieldName = 'ingredients';
	let id = `${formName}-${fieldName}`;
	let hidden = ['en'];

	beforeUpdate(async () => {
		const ingredientsLength = $form[fieldName]?.length ?? 0;

		if (ingredientsLength > 1) {
			const lastIngredients = $form[fieldName][ingredientsLength - 1];

			if (
				lastIngredients.language &&
				lastIngredients.list.length === 1 &&
				lastIngredients.list[0] === ''
			) {
				const translations: string[] = await postJsonData({
					path: '/api/admin/translate',
					data: {
						queries: $form[fieldName][0].list,
						source: $form[fieldName][0].language,
						target: lastIngredients.language
					}
				});

				updateValidateField(`ingredients[${ingredientsLength - 1}].list`, translations);
			}
		}
	});
</script>

<Label {id}>{$translate('dashboard.label.ingredients')}</Label>
{#if $form[fieldName].length}
	{#each $form[fieldName] as _, i}
		{@const language = $form[fieldName][i].language}
		{@const isHidden = hidden.includes(language)}
		<!-- there is a language selected -->
		{#if language}
			<SelectedLanguageHeader {language} />
			<RemoveButton {fieldName} {formData} {i} />
			<!-- the language data is hidden -->
			{#if isHidden}
				<ToggleList bind:hidden {language} type="show" />
				<!-- the language data is not hidden -->
			{:else}
				<div transition:slide|local>
					<ListOfInputs {formData} {i} />
					<IsListComplete
						fieldName={`ingredients.${i}.complete`}
						{formName}
						{updateField}
						value={$form[fieldName][i].complete}
					/>
					<Preview ingredients={$form[fieldName][i].list} />
					<ToggleList bind:hidden {language} type="hide" />
				</div>
			{/if}
			<!-- there is no language selected -->
		{:else}
			<LanguageSelect
				errors={$errors[fieldName][i]?.language ?? ''}
				isWide
				name={`ingredients[${i}].language`}
				{updateField}
				{validateField}
				bind:value={$form[fieldName][i].language}
			/>
			<RemoveButton {fieldName} {formData} {i} />
		{/if}
	{/each}
{/if}
<Plug emptyValue={emptyIngredients} {fieldName} {formData} />

<style>
	div {
		display: grid;
		grid-column: 1 / -1;
		grid-template-columns: subgrid;
		grid-gap: 1rem;
	}
</style>
