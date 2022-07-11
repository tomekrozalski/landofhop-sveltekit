<script lang="ts">
	import { translate } from 'svelte-intl';

	import { ExtractRelate, ExtractUnit } from '$lib/utils/enums/Beverage.enum';
	import Label from '$lib/elements/form/Label.svelte';
	import Conditional from '$lib/elements/form/Conditional.svelte';
	import TextInput from '$lib/elements/form/TextInput.svelte';
	import ExtractRelateSelect from '$lib/dashboard/elements/selects/extract/relate.svelte';
	import ExtractUnitSelect from '$lib/dashboard/elements/selects/extract/unit.svelte';
	import { emptyExtract, getNullishObject } from '$lib/dashboard/utils/emptyFieldValues';

	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, updateField, updateTouched, touched, validateField } = formData;
	let fieldName = 'extract';
	let id = `${formName}-${fieldName}`;
	const nullishExtract = getNullishObject(emptyExtract);

	function clearUnit() {
		updateField('extract.unit', '');
	}

	function setUnit(event) {
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

	function setRelate(event) {
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
