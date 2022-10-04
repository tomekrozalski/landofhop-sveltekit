<script lang="ts">
	import { getContext } from 'svelte';
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/Label.svelte';
	import OpenModal from '$lib/elements/form/OpenModal.svelte';
	import InstitutionSelect from '$lib/elements/form/selects/Institution.svelte';
	import AddNewInstitution from '$lib/modals/AddNewInstitution/AddNewInstitution.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, updateField, validateField } = formData;
	let fieldName = 'brand';
	let id = `${formName}-${fieldName}`;
	const type = getContext('formType');

	function handleClear() {
		updateField(fieldName, '');
	}

	function setValue(event) {
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
