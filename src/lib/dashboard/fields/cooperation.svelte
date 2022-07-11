<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/Label.svelte';
	import InstitutionSelect from '$lib/elements/form/selects/institution.svelte';
	import Conditional from '$lib/elements/form/Conditional.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, updateField, updateTouched, validateField } = formData;
	let fieldName = 'cooperation';
	let id = `${formName}-${fieldName}`;

	function handleClear() {
		updateField(fieldName, []);
	}

	function setValue(event) {
		if (event?.detail) {
			updateField(
				fieldName,
				event.detail.map(({ value }) => value)
			);
			validateField(fieldName);
		}
	}
</script>

<Label {id}>{$translate('dashboard.label.cooperation')}</Label>
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
	isMulti
	{setValue}
	bind:value={$form[fieldName]}
/>
