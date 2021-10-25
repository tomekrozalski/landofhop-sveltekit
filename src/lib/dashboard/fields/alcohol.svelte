<script lang="ts">
	import { translate } from 'svelte-intl';

	import { AlcoholRelate, AlcoholUnit } from '$lib/utils/enums/Beverage.enum';
	import Label from '$lib/elements/form/label.svelte';
	import Conditional from '$lib/dashboard/elements/conditional.svelte';
	import TextInput from '$lib/elements/form/textInput.svelte';
	import AlcoholRelateSelect from '$lib/dashboard/elements/selects/alcohol/relate.svelte';
	import AlcoholScopeSelect from '$lib/dashboard/elements/selects/alcohol/scope.svelte';
	import AlcoholUnitSelect from '$lib/dashboard/elements/selects/alcohol/unit.svelte';
	import { emptyAlcohol, getNullishObject } from '$lib/dashboard/utils/emptyFieldValues';

	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, updateField, updateTouched, touched, validateField } = formData;
	let fieldName = 'alcohol';
	let id = `${formName}-${fieldName}`;
	const nullishAlcohol = getNullishObject(emptyAlcohol);

	function clearUnit() {
		updateField('alcohol.unit', '');
	}

	function setUnit(event) {
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

	function setRelate(event) {
		updateField('alcohol.relate', event.detail.value);
		validateField('alcohol.relate');
	}

	function clearScope() {
		updateField('alcohol.scope', '');
	}

	function setScope(event) {
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
	style="grid-column: 3/4"
	withEmpty
	bind:value={$form[fieldName].scope}
/>
