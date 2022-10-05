<script lang="ts">
	import { translate } from 'svelte-intl';
	import { IngredientType } from '$lib/utils/enums/Beverage.enum';
	import Conditional from '$lib/atoms/forms/Conditional.svelte';
	import Label from '$lib/atoms/forms/Label.svelte';
	import IngredientSelect from '../selects/Ingredient.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, updateField, updateTouched, validateField } = formData;
	let fieldName = 'dryHopped';
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
</script>

<Label {id}>{$translate('dashboard.label.dryHopped')}</Label>
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
	filter={IngredientType.hop}
	{handleClear}
	id={$form[fieldName] !== null ? id : null}
	isMulti
	{setValue}
	bind:value={$form[fieldName]}
/>
