<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/label.svelte';
	import StyleTagSelect from '$lib/elements/form/selects/styleTag.svelte';
	import Conditional from '$lib/elements/form/conditional.svelte';
	import OpenModal from '$lib/elements/form/openModal.svelte';
	import { styleStore } from '$lib/utils/stores/selects';
	import AddNewStyle from '$lib/dashboard/modals/addNewStyle/addNewStyle.svelte';

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
	isLoading={$form[fieldName] !== null && $styleStore.length === 0}
	{setValue}
	bind:value={$form[fieldName]}
/>
{#if admin}
	<OpenModal open={() => (isModalOpen = true)} />
	{#if isModalOpen}
		<AddNewStyle close={() => (isModalOpen = false)} />
	{/if}
{/if}
