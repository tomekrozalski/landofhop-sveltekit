<script lang="ts">
	import { translate } from 'svelte-intl';
	import { emptyAlcohol, getNullishObject } from '$lib/utils/helpers/emptyFieldValues';
	import { AlcoholRelate, AlcoholUnit } from '$types/enums/Beverage.enum';
	import Conditional from '$lib/atoms/forms/Conditional.svelte';
	import Label from '$lib/atoms/forms/Label.svelte';
	import TextInput from '$lib/atoms/forms/TextInput.svelte';
	import AlcoholRelateSelect from '../selects/alcohol/Relate.svelte';
	import AlcoholScopeSelect from '../selects/alcohol/Scope.svelte';
	import AlcoholUnitSelect from '../selects/alcohol/Unit.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, updateField, updateTouched, touched, validateField } = formData;
	let fieldName = 'alcohol';
	let id = `${formName}-${fieldName}`;
	const nullishAlcohol = getNullishObject(emptyAlcohol);

	function clearUnit() {
		updateField('alcohol.unit', '');
	}

	function setUnit(event: any) {
		updateField('alcohol.unit', event.detail.value);
		validateField('alcohol.unit');

		if (event.detail.value === AlcoholUnit.degree) {
			updateField('alcohol.relate', AlcoholRelate.abv);
		}

		if (event.detail.value === AlcoholUnit.percent) {
			updateField('alcohol.relate', AlcoholRelate.capacity);
		}
	}

	function clearRelate() {
		updateField('alcohol.relate', '');
	}

	function setRelate(event: any) {
		updateField('alcohol.relate', event.detail.value);
		validateField('alcohol.relate');
	}

	function clearScope() {
		updateField('alcohol.scope', '');
	}

	function setScope(event: any) {
		updateField('alcohol.scope', event.detail.value);
		validateField('alcohol.scope');
	}
</script>

<Label {id}>{$translate('dashboard.label.alcohol')}</Label>
<Conditional
	{fieldName}
	{id}
	initialValue={emptyAlcohol}
	nullishValue={nullishAlcohol}
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
<AlcoholUnitSelect
	errors={$errors[fieldName].unit}
	handleClear={clearUnit}
	setValue={setUnit}
	bind:value={$form[fieldName].unit}
/>
<AlcoholRelateSelect
	errors={$errors[fieldName].relate}
	handleClear={clearRelate}
	setValue={setRelate}
	bind:value={$form[fieldName].relate}
/>
<AlcoholScopeSelect
	errors={$errors[fieldName].scope}
	handleClear={clearScope}
	setValue={setScope}
	style="grid-column: 5/6"
	withEmpty
	bind:value={$form[fieldName].scope}
/>
