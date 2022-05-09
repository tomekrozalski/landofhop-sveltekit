<script lang="ts">
	import { translate } from 'svelte-intl';
	import { IngredientType } from '$lib/utils/enums/Beverage.enum';
	import Label from '$lib/elements/form/label.svelte';
	import IngredientSelect from '$lib/elements/form/selects/ingredient.svelte';
	import Conditional from '$lib/elements/form/conditional.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, updateField, updateTouched, validateField } = formData;
	let fieldName = 'dryHopped';
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
	id={$form[fieldName] !== null && id}
	isMulti
	{setValue}
	bind:value={$form[fieldName]}
/>
