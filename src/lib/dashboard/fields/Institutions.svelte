<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/Label.svelte';
	import InstitutionSelect from '$lib/elements/form/selects/Institution.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, updateField, validateField } = formData;
	let fieldName = 'institution';
	let id = `${formName}-${fieldName}`;

	function handleClear() {
		updateField(fieldName, '');
	}

	function setValue(event) {
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
