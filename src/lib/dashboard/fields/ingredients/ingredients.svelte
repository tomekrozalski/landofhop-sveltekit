<script lang="ts">
	import { translate } from 'svelte-intl';
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
	let { errors, form, updateField, validateField } = formData;
	let fieldName = 'ingredients';
	let id = `${formName}-${fieldName}`;
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
