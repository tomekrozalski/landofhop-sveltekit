<script lang="ts">
	import { beforeUpdate } from 'svelte';
	import { translate } from 'svelte-intl';
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import Label from '$lib/elements/form/label.svelte';
	import LanguageSelect from '$lib/dashboard/elements/selects/language.svelte';
	import RemoveButton from '$lib/dashboard/elements/removeButton.svelte';
	import Plug from '$lib/dashboard/elements/plug.svelte';
	import { emptyIngredients } from '$lib/dashboard/utils/emptyFieldValues';
	import Item from './ingredientsItem.svelte';
	import Complete from './complete.svelte';
	import Preview from './preview.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, updateField, updateValidateField, validateField } = formData;
	let fieldName = 'ingredients';
	let id = `${formName}-${fieldName}`;

	beforeUpdate(async () => {
		const ingredientsLength = $form.ingredients?.length ?? 0;

		if (ingredientsLength > 1) {
			const lastIngredients = $form.ingredients[ingredientsLength - 1];

			if (
				lastIngredients.language &&
				lastIngredients.list.length === 1 &&
				lastIngredients.list[0] === ''
			) {
				const translations: string[] = await apiCall(fetch, Endpoints.translate, {
					method: 'POST',
					body: JSON.stringify({
						queries: $form.ingredients[0].list,
						source: $form.ingredients[0].language,
						target: lastIngredients.language
					})
				});

				updateValidateField(`ingredients[${ingredientsLength - 1}].list`, translations);
			}
		}
	});
</script>

<Label {id}>{$translate('dashboard.label.ingredients')}</Label>
{#if $form[fieldName].length}
	{#each $form[fieldName] as _, i}
		{#if $form[fieldName][i].language}
			<Item {formData} {i} />
		{:else}
			<LanguageSelect
				errors={$errors[fieldName][i]?.language ?? ''}
				isWide
				name={`ingredients[${i}].language`}
				{updateField}
				{validateField}
				bind:value={$form[fieldName][i].language}
			/>
		{/if}
		<RemoveButton {fieldName} {formData} {i} />
		{#if $form.ingredients[i].language}
			<Complete
				fieldName={`ingredients.${i}.complete`}
				{formName}
				{updateField}
				value={$form.ingredients[i].complete}
			/>
		{/if}
		<Preview ingredients={$form.ingredients[i].list} />
	{/each}
{/if}
<Plug emptyValue={emptyIngredients} {fieldName} {formData} />
