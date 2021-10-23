<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/label.svelte';
	import TextInput from '$lib/elements/form/textInput.svelte';
	import LanguageSelect from '$lib/dashboard/elements/selects/language.svelte';
	import Markdown from '$lib/elements/markdown.svelte';
	import AddButton from '$lib/dashboard/elements/addButton.svelte';
	import RemoveButton from '$lib/dashboard/elements/removeButton.svelte';
	import { emptyTale } from '$lib/dashboard/utils/emptyFieldValues';
	import Plug from '$lib/dashboard/elements/plug.svelte';

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
