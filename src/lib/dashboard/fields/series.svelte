<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/label.svelte';
	import TextInput from '$lib/elements/form/textInput.svelte';
	import LanguageSelect from '$lib/dashboard/elements/selects/language.svelte';
	import AddButton from '$lib/dashboard/elements/addButton.svelte';
	import RemoveButton from '$lib/dashboard/elements/removeButton.svelte';
	import Plug from '$lib/dashboard/elements/plug.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, touched, updateField, validateField } = formData;
	let fieldName = 'series';
	let id = `${formName}-${fieldName}`;
</script>

<Label {id}>{$translate('dashboard.label.series')}</Label>
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
			{validateField}
			bind:value={$form[fieldName][i].language}
		/>
		<RemoveButton {fieldName} {formData} {i} />
	{/each}
	<AddButton {fieldName} {formData} />
{:else}
	<Plug {fieldName} {formData} wide />
{/if}
