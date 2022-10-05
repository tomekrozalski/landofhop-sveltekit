<script lang="ts">
	import { translate } from 'svelte-intl';
	import Conditional from '$lib/atoms/forms/Conditional.svelte';
	import Label from '$lib/atoms/forms/Label.svelte';
	import InstitutionSelect from '../selects/Institution.svelte';

	export let formName: string;
	export let formData: any;
	export let labelId: string;
	let { errors, form, updateField, updateTouched, validateField } = formData;
	let fieldName = 'brands';
	let id = `${formName}-${fieldName}`;

	function handleClear() {
		updateField(fieldName, []);
	}

	function setValue(event: any) {
		if (event?.detail) {
			updateField(
				fieldName,
				event.detail.map(({ value }: any) => value)
			);
			validateField(fieldName);
		}
	}
</script>

<Label {id}>{$translate(labelId)}</Label>
<Conditional
	{fieldName}
	{id}
	initialValue={[]}
	{updateField}
	{updateTouched}
	{validateField}
	value={$form[fieldName]}
/>
<InstitutionSelect
	errors={$errors[fieldName]}
	{handleClear}
	id={$form[fieldName] !== null ? id : null}
	isMulti
	{setValue}
	bind:value={$form[fieldName]}
/>
