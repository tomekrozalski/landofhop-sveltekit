<script lang="ts">
	import { translate } from 'svelte-intl';
	import { emptyHopRate, getNullishObject } from '$lib/utils/helpers/emptyFieldValues';
	import Conditional from '$lib/atoms/forms/Conditional.svelte';
	import Label from '$lib/atoms/forms/Label.svelte';
	import TextInput from '$lib/atoms/forms/TextInput.svelte';
	import HopRateUnitSelect from '../selects/HopRateUnit.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, updateField, updateTouched, touched, validateField } = formData;
	let fieldName = 'hopRate';
	let id = `${formName}-${fieldName}`;
	const nullishExtract = getNullishObject(emptyHopRate);

	function clearUnit() {
		updateField('hopRate.unit', '');
	}

	function setUnit(event: any) {
		updateField('hopRate.unit', event.detail.value);
		validateField('hopRate.unit');
	}
</script>

<Label {id}>{$translate('dashboard.label.hopRate')}</Label>
<Conditional
	{fieldName}
	{id}
	initialValue={emptyHopRate}
	nullishValue={nullishExtract}
	{updateField}
	{updateTouched}
	{validateField}
	value={$form[fieldName]}
/>
<TextInput
	errors={$errors[fieldName].value}
	fieldName={`${fieldName}.value`}
	{handleChange}
	{id}
	isTouched={$touched[fieldName].value}
	type="number"
	bind:value={$form[fieldName].value}
/>
<HopRateUnitSelect
	errors={$errors[fieldName].unit}
	handleClear={clearUnit}
	setValue={setUnit}
	bind:value={$form[fieldName].unit}
/>
