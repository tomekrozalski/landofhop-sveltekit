<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/label.svelte';
	import OpenModal from '$lib/elements/form/openModal.svelte';
	import IngredientSelect from '$lib/elements/form/selects/ingredient.svelte';
	import Conditional from '$lib/elements/form/conditional.svelte';
	import { updateIngredientList } from '$lib/utils/helpers/updateStoreData';
	import AddNewIngredient from '$lib/dashboard/modals/addNewIngredient/addNewIngredient.svelte';

	export let admin: boolean = false;
	export let formName: string;
	export let formData: any;
	export let labelId: string;
	let { errors, form, updateField, updateTouched, validateField } = formData;
	let fieldName = 'ingredientTags';
	let id = `${formName}-${fieldName}`;

	function handleClear() {
		updateField(fieldName, []);
	}

	function setValue(event) {
		if (event?.detail) {
			updateField(
				fieldName,
				event.detail.map(({ value }) => value)
			);
			validateField(fieldName);
		}
	}

	let isModalOpen = false;

	$: if ($form[fieldName] !== null) {
		updateIngredientList();
	}
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
	id={$form[fieldName] !== null && id}
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
