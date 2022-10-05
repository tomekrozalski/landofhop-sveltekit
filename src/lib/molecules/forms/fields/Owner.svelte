<script lang="ts">
	import { translate } from 'svelte-intl';
	import Conditional from '$lib/atoms/forms/Conditional.svelte';
	import Label from '$lib/atoms/forms/Label.svelte';
	import InstitutionSelect from '../selects/Institution.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, updateField, updateTouched, validateField } = formData;
	let fieldName = 'owner';
	let id = `${formName}-${fieldName}`;

	function handleClear() {
		updateField(fieldName, '');
	}

	function setValue(event: any) {
		updateField(fieldName, event.detail.value);
		validateField(fieldName);
	}
</script>

<Label {id}>{$translate('dashboard.label.owner')}</Label>
<Conditional
	{fieldName}
	{id}
	{updateField}
	{updateTouched}
	{validateField}
	value={$form[fieldName]}
/>
<InstitutionSelect
	errors={$errors[fieldName]}
	{handleClear}
	{setValue}
	bind:value={$form[fieldName]}
/>
