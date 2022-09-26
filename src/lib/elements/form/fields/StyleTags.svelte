<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/Label.svelte';
	import StyleTagSelect from '$lib/elements/form/selects/StyleTag.svelte';
	import Conditional from '$lib/elements/form/Conditional.svelte';
	import OpenModal from '$lib/elements/form/OpenModal.svelte';

	import AddNewStyle from '$lib/components/adminModals/AddNewStyle/AddNewStyle.svelte';

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

	function setValue(event) {
		if (event?.detail) {
			updateField(
				fieldName,
				event.detail.map(({ value }) => value)
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
	id={$form[fieldName] !== null && id}
	{setValue}
	bind:value={$form[fieldName]}
/>
{#if admin}
	<OpenModal open={() => (isModalOpen = true)} />
	{#if isModalOpen}
		<AddNewStyle close={() => (isModalOpen = false)} />
	{/if}
{/if}
