<script lang="ts">
	import { getContext } from 'svelte';
	import { translate } from 'svelte-intl';
	import Label from '$lib/atoms/forms/Label.svelte';
	import OpenModal from '$lib/atoms/forms/OpenModal.svelte';
	import AddNewInstitution from '$lib/templates/modals/AddNewInstitution/AddNewInstitution.svelte';
	import InstitutionSelect from '../selects/Institution.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, updateField, validateField } = formData;
	let fieldName = 'brand';
	let id = `${formName}-${fieldName}`;
	const type = getContext('formType');

	function handleClear() {
		updateField(fieldName, '');
	}

	function setValue(event: any) {
		updateField(fieldName, event.detail.value);
		validateField(fieldName);
	}

	let isModalOpen = false;
</script>

<Label {id} isRequired>{$translate('dashboard.label.brand')}</Label>
<InstitutionSelect
	errors={$errors[fieldName]}
	{handleClear}
	{id}
	isDisabled={formName === 'label' && type === 'update'}
	{setValue}
	bind:value={$form[fieldName]}
/>
<OpenModal open={() => (isModalOpen = true)} />
{#if isModalOpen}
	<AddNewInstitution close={() => (isModalOpen = false)} />
{/if}
