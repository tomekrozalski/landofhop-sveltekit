<script lang="ts">
	import { translate } from 'svelte-intl';
	import { emptyExpirationDate, getNullishObject } from '$lib/utils/helpers/emptyFieldValues';
	import Conditional from '$lib/atoms/forms/Conditional.svelte';
	import Label from '$lib/atoms/forms/Label.svelte';
	import TextInput from '$lib/atoms/forms/TextInput.svelte';
	import ExpirationDateUnitSelect from '../selects/ExpirationDate.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, updateField, updateTouched, touched, validateField } = formData;
	let fieldName = 'expirationDate';
	let id = `${formName}-${fieldName}`;
	const nullishExtract = getNullishObject(emptyExpirationDate);

	function clearUnit() {
		updateField('expirationDate.unit', '');
	}

	function setUnit(event: any) {
		updateField('expirationDate.unit', event.detail.value);
		validateField('expirationDate.unit');
	}
</script>

<Label {id}>{$translate('dashboard.label.expirationDate')}</Label>
<Conditional
	{fieldName}
	{id}
	initialValue={emptyExpirationDate}
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
<ExpirationDateUnitSelect
	errors={$errors[fieldName].unit}
	handleClear={clearUnit}
	setValue={setUnit}
	bind:value={$form[fieldName].unit}
/>
