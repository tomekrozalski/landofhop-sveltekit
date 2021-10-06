<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/label.svelte';
	import InstitutionSelect from '$lib/dashboard/elements/selects/institution.svelte';
	import AddNewInstitution from '$lib/dashboard/modals/addNewInstitution.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, updateField, validateField } = formData;
	let fieldName = 'brand';
	let id = `${formName}-${fieldName}`;

	function handleClear() {
		updateField(fieldName, '');
	}

	function setValue(event) {
		updateField(fieldName, event.detail.value);
		validateField(fieldName);
	}
</script>

<Label {id}>{$translate('dashboard.label.brand')}</Label>
<InstitutionSelect
	errors={$errors[fieldName]}
	{handleClear}
	{setValue}
	bind:value={$form[fieldName]}
/>
<AddNewInstitution />
