<script lang="ts">
	import { translate } from 'svelte-intl';
	import Conditional from '$lib/atoms/forms/Conditional.svelte';
	import Label from '$lib/atoms/forms/Label.svelte';
	import OpenModal from '$lib/atoms/forms/OpenModal.svelte';
	import AddNewStyle from '$lib/templates/modals/AddNewStyle/AddNewStyle.svelte';
	import StyleTagSelect from '../selects/StyleTag.svelte';

	export let admin: boolean = false;
	export let formName: string;
	export let formData: any;
	export let labelId: string;
	let { errors, form, updateField, updateTouched, validateField } = formData;
	let fieldName = 'styleTags';
	let id = `${formName}-${fieldName}`;

	function handleClear() {
		updateField(fieldName, []);
	}

	function setValue(event: any) {
		if (event?.detail) {
			updateField(
				fieldName,
				event.detail.map(({ value }: any) => value)
			);
			validateField(fieldName);
		}
	}

	let isModalOpen = false;
</script>

<Label {id}>{$translate(labelId)}</Label>
<Conditional
	{fieldName}
	{id}
	initialValue={[]}
	{updateField}
	{updateTouched}
	{validateField}
	value={$form[fieldName]}
/>
<StyleTagSelect
	errors={$errors[fieldName]}
	{handleClear}
	id={$form[fieldName] !== null ? id : null}
	{setValue}
	bind:value={$form[fieldName]}
/>
{#if admin}
	<OpenModal open={() => (isModalOpen = true)} />
	{#if isModalOpen}
		<AddNewStyle close={() => (isModalOpen = false)} />
	{/if}
{/if}
