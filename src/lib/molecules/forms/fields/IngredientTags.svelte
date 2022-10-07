<script lang="ts">
	import { translate } from 'svelte-intl';
	import Conditional from '$lib/atoms/forms/Conditional.svelte';
	import Label from '$lib/atoms/forms/Label.svelte';
	import OpenModal from '$lib/atoms/forms/OpenModal.svelte';
	import AddNewIngredient from '$lib/templates/modals/AddNewIngredient/AddNewIngredient.svelte';
	import IngredientSelect from '../selects/Ingredient.svelte';

	export let admin: boolean = false;
	export let formName: string;
	export let formData: any;
	export let labelId: string = 'dashboard.label.ingredientTags';
	let { errors, form, updateField, updateTouched, validateField } = formData;
	let fieldName = 'ingredientTags';
	let id = `${formName}-${fieldName}`;

	function handleClear() {
		updateField(fieldName, []);
	}

	function setValue(event: any) {
		if (event?.detail) {
			updateField(
				fieldName,
				event.detail.map(({ value }: any) => value)
			);
			validateField(fieldName);
		}
	}

	let isModalOpen = false;
</script>

<Label {id}>{$translate(labelId)}</Label>
<Conditional
	{fieldName}
	{id}
	initialValue={[]}
	{updateField}
	{updateTouched}
	{validateField}
	value={$form[fieldName]}
/>
<IngredientSelect
	errors={$errors[fieldName]}
	{handleClear}
	id={$form[fieldName] !== null ? id : null}
	isMulti
	{setValue}
	bind:value={$form[fieldName]}
/>
{#if admin}
	<OpenModal open={() => (isModalOpen = true)} />
	{#if isModalOpen}
		<AddNewIngredient close={() => (isModalOpen = false)} />
	{/if}
{/if}
