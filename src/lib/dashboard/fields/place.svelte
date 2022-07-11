<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/Label.svelte';
	import OpenModal from '$lib/elements/form/OpenModal.svelte';
	import PlaceSelect from '$lib/elements/form/selects/place.svelte';
	import Conditional from '$lib/elements/form/Conditional.svelte';
	import AddNewPlace from '$lib/dashboard/modals/addNewPlace/addNewPlace.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, updateField, updateTouched, validateField } = formData;
	let fieldName = 'place';
	let id = `${formName}-${fieldName}`;

	function handleClear() {
		updateField(fieldName, '');
	}

	function setValue(event) {
		updateField(fieldName, event.detail.value);
		validateField(fieldName);
	}

	let isModalOpen = false;
</script>

<Label {id}>{$translate('dashboard.label.place')}</Label>
<Conditional
	{fieldName}
	{id}
	{updateField}
	{updateTouched}
	{validateField}
	value={$form[fieldName]}
/>
<PlaceSelect
	errors={$errors[fieldName]}
	{handleClear}
	{id}
	{setValue}
	bind:value={$form[fieldName]}
/>
<OpenModal open={() => (isModalOpen = true)} />
{#if isModalOpen}
	<AddNewPlace close={() => (isModalOpen = false)} />
{/if}
