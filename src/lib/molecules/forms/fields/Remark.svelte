<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/Label.svelte';
	import TextInput from '$lib/elements/form/TextInput.svelte';

	import LanguageSelect from '../selects/Language.svelte';
	import AddButton from '../AddButton.svelte';
	import RemoveButton from '../RemoveButton.svelte';
	import Plug from '../Plug.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, touched, updateField, validateField } = formData;
	let fieldName = 'remark';
	let id = `${formName}-${fieldName}`;
</script>

<Label {id}>{$translate('dashboard.label.remark')}</Label>
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
