<script lang="ts">
	import { translate } from 'svelte-intl';
	import { emptyExtract, getNullishObject } from '$lib/utils/helpers/emptyFieldValues';
	import { ExtractRelate, ExtractUnit } from '$types/enums/Beverage.enum';
	import Conditional from '$lib/atoms/forms/Conditional.svelte';
	import Label from '$lib/atoms/forms/Label.svelte';
	import TextInput from '$lib/atoms/forms/TextInput.svelte';
	import ExtractRelateSelect from '../selects/extract/Relate.svelte';
	import ExtractUnitSelect from '../selects/extract/Unit.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, updateField, updateTouched, touched, validateField } = formData;
	let fieldName = 'extract';
	let id = `${formName}-${fieldName}`;
	const nullishExtract = getNullishObject(emptyExtract);

	function clearUnit() {
		updateField('extract.unit', '');
	}

	function setUnit(event: any) {
		updateField('extract.unit', event.detail.value);
		validateField('extract.unit');

		if (event.detail.value === ExtractUnit.degree) {
			updateField('extract.relate', ExtractRelate.blg);
		}

		if (event.detail.value === ExtractUnit.percent) {
			updateField('extract.relate', ExtractRelate.weight);
		}
	}

	function clearRelate() {
		updateField('extract.relate', '');
	}

	function setRelate(event: any) {
		updateField('extract.relate', event.detail.value);
		validateField('extract.relate');
	}
</script>

<Label {id}>{$translate('dashboard.label.extract')}</Label>
<Conditional
	{fieldName}
	{id}
	initialValue={emptyExtract}
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
	style="grid-column: 3/4"
	type="number"
	bind:value={$form[fieldName].value}
/>
<ExtractUnitSelect
	errors={$errors[fieldName].unit}
	handleClear={clearUnit}
	setValue={setUnit}
	bind:value={$form[fieldName].unit}
/>
<ExtractRelateSelect
	errors={$errors[fieldName].relate}
	handleClear={clearRelate}
	setValue={setRelate}
	bind:value={$form[fieldName].relate}
/>
