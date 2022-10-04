<script lang="ts">
	import { translate } from 'svelte-intl';

	import Label from '$lib/elements/form/Label.svelte';
	import Conditional from '$lib/elements/form/Conditional.svelte';
	import TextInput from '$lib/elements/form/TextInput.svelte';
	import { emptyHopRate, getNullishObject } from '$lib/utils/admin/emptyFieldValues';

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

	function setUnit(event) {
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
