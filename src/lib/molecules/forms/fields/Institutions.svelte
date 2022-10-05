<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/atoms/forms/Label.svelte';
	import InstitutionSelect from '../selects/Institution.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, updateField, validateField } = formData;
	let fieldName = 'institution';
	let id = `${formName}-${fieldName}`;

	function handleClear() {
		updateField(fieldName, '');
	}

	function setValue(event: any) {
		updateField(fieldName, event.detail.value);
		validateField(fieldName);
	}
</script>

<Label {id} isRequired>{$translate('dashboard.label.institution')}</Label>
<InstitutionSelect
	errors={$errors[fieldName]}
	{handleClear}
	{id}
	{setValue}
	bind:value={$form[fieldName]}
/>
