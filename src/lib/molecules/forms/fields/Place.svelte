<script lang="ts">
	import { translate } from 'svelte-intl';
	import Conditional from '$lib/atoms/forms/Conditional.svelte';
	import Label from '$lib/atoms/forms/Label.svelte';
	import OpenModal from '$lib/atoms/forms/OpenModal.svelte';
	import AddNewPlace from '$lib/templates/modals/AddNewPlace/AddNewPlace.svelte';
	import PlaceSelect from '../selects/Place.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, updateField, updateTouched, validateField } = formData;
	let fieldName = 'place';
	let id = `${formName}-${fieldName}`;

	function handleClear() {
		updateField(fieldName, '');
	}

	function setValue(event: any) {
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
