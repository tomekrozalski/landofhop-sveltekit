<script lang="ts">
	import { translate } from 'svelte-intl';

	import Label from '$lib/elements/form/Label.svelte';
	import Conditional from '$lib/elements/form/Conditional.svelte';
	import TextInput from '$lib/elements/form/TextInput.svelte';

	import TemperatureUnitSelect from '../elements/selects/Temperature.svelte';
	import { emptyTemperature, getNullishObject } from '../../../lib/utils/admin/emptyFieldValues';

	export let formName: string;
	export let formData: any;
	let { errors, form, updateField, updateTouched, touched, validateField } = formData;
	let fieldName = 'temperature';
	let id = `${formName}-${fieldName}`;
	const nullishExtract = getNullishObject(emptyTemperature);

	function handleFromChange(e) {
		updateField('temperature.from', e.target.value);
	}

	function handleToChange(e) {
		updateField('temperature.to', e.target.value);
		validateField('temperature.from');
		validateField('temperature.to');
	}

	function clearUnit() {
		updateField('temperature.unit', '');
	}

	function setUnit(event) {
		updateField('temperature.unit', event.detail.value);
		validateField('temperature.unit');
	}
</script>

<Label {id}>{$translate('dashboard.label.temperature')}</Label>
<Conditional
	{fieldName}
	{id}
	initialValue={emptyTemperature}
	nullishValue={nullishExtract}
	{updateField}
	{updateTouched}
	{validateField}
	value={$form[fieldName]}
/>
<TextInput
	errors={$errors[fieldName].from}
	fieldName={`${fieldName}.from`}
	handleChange={handleFromChange}
	{id}
	isTouched={$touched[fieldName].from}
	type="number"
	bind:value={$form[fieldName].from}
/>
<TextInput
	errors={$errors[fieldName].to}
	fieldName={`${fieldName}.to`}
	handleChange={handleToChange}
	{id}
	isTouched={$touched[fieldName].to}
	type="number"
	bind:value={$form[fieldName].to}
/>
<TemperatureUnitSelect
	errors={$errors[fieldName].unit}
	handleClear={clearUnit}
	setValue={setUnit}
	bind:value={$form[fieldName].unit}
/>
