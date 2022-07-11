<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/Label.svelte';
	import TextInput from '$lib/elements/form/TextInput.svelte';
	import LanguageSelect from '$lib/dashboard/elements/selects/language.svelte';
	import AddButton from '$lib/dashboard/elements/addButton.svelte';
	import RemoveButton from '$lib/dashboard/elements/removeButton.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, touched, updateField, validateField } = formData;
	let fieldName = 'city';
	let id = `${formName}-${fieldName}`;
</script>

<Label {id} isRequired>{$translate('dashboard.label.city')}</Label>
{#each $form[fieldName] as _, i}
	<TextInput
		errors={$errors[fieldName][i]?.value ?? ''}
		{handleChange}
		id={i === 0 ? id : null}
		isTouched={$touched[fieldName][i].value}
		fieldName={`${fieldName}[${i}].value`}
		style="grid-column: 2/3"
		bind:value={$form[fieldName][i].value}
	/>
	<LanguageSelect
		errors={$errors[fieldName][i]?.language ?? ''}
		name={`${fieldName}[${i}].language`}
		{updateField}
		{validateField}
		bind:value={$form[fieldName][i].language}
	/>
	{#if i > 0}<RemoveButton {fieldName} {formData} {i} />{/if}
{/each}
<AddButton {fieldName} {formData} />
