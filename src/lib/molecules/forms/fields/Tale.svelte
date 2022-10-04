<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/Label.svelte';
	import TextInput from '$lib/elements/form/TextInput.svelte';
	import Markdown from '$lib/Markdown.svelte';
	import { emptyTale } from '$lib/utils/admin/emptyFieldValues';

	import LanguageSelect from '../selects/Language.svelte';
	import AddButton from '../AddButton.svelte';
	import RemoveButton from '../RemoveButton.svelte';
	import Plug from '../Plug.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, touched, updateField, validateField } = formData;
	let fieldName = 'tale';
	let id = `${formName}-${fieldName}`;
</script>

<Label {id}>{$translate('dashboard.label.tale')}</Label>
{#if $form[fieldName].length}
	{#each $form[fieldName] as _, i}
		<TextInput
			errors={$errors[fieldName][i]?.lead ?? ''}
			fieldName={`${fieldName}[${i}].lead`}
			{handleChange}
			id={i === 0 ? id : null}
			isTextarea
			isTouched={$touched[fieldName][i].lead}
			style="grid-column: 2/3"
			bind:value={$form[fieldName][i].lead}
		/>
		{#if $form[fieldName][i].lead}
			<Markdown style="grid-column: 2/3" value={$form[fieldName][i].lead} />
		{/if}
		<TextInput
			errors={$errors[fieldName][i]?.article ?? ''}
			fieldName={`${fieldName}[${i}].article`}
			{handleChange}
			id={i === 0 ? id : null}
			isTextarea
			isTouched={$touched[fieldName][i].article}
			style="grid-column: 2/3"
			bind:value={$form[fieldName][i].article}
		/>
		{#if $form[fieldName][i].article}
			<Markdown style="grid-column: 2/3" value={$form[fieldName][i].article} />
		{/if}
		<LanguageSelect
			errors={$errors[fieldName][i]?.language ?? ''}
			isWide
			name={`${fieldName}[${i}].language`}
			{updateField}
			{validateField}
			bind:value={$form[fieldName][i].language}
		/>
		<RemoveButton {fieldName} {formData} {i} />
	{/each}
	<AddButton emptyValue={emptyTale} {fieldName} {formData} />
{:else}
	<Plug emptyValue={emptyTale} {fieldName} {formData} />
{/if}
