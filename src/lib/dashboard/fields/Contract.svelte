<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/Label.svelte';
	import InstitutionSelect from '$lib/elements/form/selects/Institution.svelte';
	import Conditional from '$lib/elements/form/Conditional.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, updateField, updateTouched, validateField } = formData;
	let fieldName = 'contract';
	let id = `${formName}-${fieldName}`;

	function handleClear() {
		updateField(fieldName, '');
	}

	function setValue(event) {
		updateField(fieldName, event.detail.value);
		validateField(fieldName);
	}
</script>

<Label {id}>{$translate('dashboard.label.contract')}</Label>
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
	id={$form[fieldName] !== null && id}
	{setValue}
	withUnknown
	bind:value={$form[fieldName]}
/>
