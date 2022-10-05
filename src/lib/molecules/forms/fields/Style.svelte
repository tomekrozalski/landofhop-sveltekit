<script lang="ts">
	import { translate } from 'svelte-intl';
	import AddButton from '$lib/atoms/forms/AddButton.svelte';
	import Label from '$lib/atoms/forms/Label.svelte';
	import Plug from '$lib/atoms/forms/Plug.svelte';
	import RemoveButton from '$lib/atoms/forms/RemoveButton.svelte';
	import TextInput from '$lib/atoms/forms/TextInput.svelte';
	import LanguageSelect from '../selects/Language.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, touched, updateField, validateField } = formData;
	let fieldName = 'style';
	let id = `${formName}-${fieldName}`;
</script>

<Label {id}>{$translate('dashboard.label.style')}</Label>
{#if $form[fieldName].length}
	{#each $form[fieldName] as _, i}
		<TextInput
			errors={$errors[fieldName][i]?.value ?? ''}
			fieldName={`${fieldName}[${i}].value`}
			{handleChange}
			id={i === 0 ? id : null}
			isTouched={$touched[fieldName][i].value}
			style="grid-column: 2/3"
			bind:value={$form[fieldName][i].value}
		/>
		<LanguageSelect
			errors={$errors[fieldName][i]?.language ?? ''}
			name={`${fieldName}[${i}].language`}
			{updateField}
			withBlank
			{validateField}
			bind:value={$form[fieldName][i].language}
		/>
		<RemoveButton {fieldName} {formData} {i} />
	{/each}
	<AddButton {fieldName} {formData} />
{:else}
	<Plug {fieldName} {formData} wide />
{/if}
