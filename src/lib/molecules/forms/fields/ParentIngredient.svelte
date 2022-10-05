<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/atoms/forms/Label.svelte';
	import IngredientSelect from '../selects/Ingredient.svelte';

	export let formName: string;
	export let formData: any;
	export let labelId: string;
	let { errors, form, updateField, updateTouched, validateField } = formData;
	let fieldName = 'parent';
	let id = `${formName}-${fieldName}`;

	function handleClear() {
		updateField(fieldName, '');
	}

	function setValue(event: any) {
		updateField(fieldName, event.detail.value);
		validateField(fieldName);
	}
</script>

<Label {id} isRequired>{$translate(labelId)}</Label>
<IngredientSelect
	errors={$errors[fieldName]}
	filter={$form.type}
	{handleClear}
	id={$form[fieldName] !== null ? id : null}
	isDisabled={!$form.type}
	{setValue}
	bind:value={$form[fieldName]}
/>
