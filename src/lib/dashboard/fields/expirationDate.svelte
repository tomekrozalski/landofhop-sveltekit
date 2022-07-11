<script lang="ts">
	import { translate } from 'svelte-intl';

	import Label from '$lib/elements/form/Label.svelte';
	import Conditional from '$lib/elements/form/Conditional.svelte';
	import TextInput from '$lib/elements/form/TextInput.svelte';
	import ExpirationDateUnitSelect from '$lib/dashboard/elements/selects/expirationDate.svelte';
	import { emptyExpirationDate, getNullishObject } from '$lib/dashboard/utils/emptyFieldValues';

	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, updateField, updateTouched, touched, validateField } = formData;
	let fieldName = 'expirationDate';
	let id = `${formName}-${fieldName}`;
	const nullishExtract = getNullishObject(emptyExpirationDate);

	function clearUnit() {
		updateField('expirationDate.unit', '');
	}

	function setUnit(event) {
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
