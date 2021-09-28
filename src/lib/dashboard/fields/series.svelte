<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/label.svelte';
	import TextInput from '$lib/elements/form/textInput.svelte';
	import Grid from '$lib/dashboard/elements/grid.svelte';
	import LanguageSelect from '$lib/dashboard/elements/selects/language.svelte';
	import AddButton from '$lib/dashboard/elements/addButton.svelte';
	import RemoveButton from '$lib/dashboard/elements/removeButton.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, touched, updateValidateField } = formData;
	let name = 'series';
	let id = `${formName}-${name}`;
</script>

<Grid columns={2}>
	<Label {id}>{$translate('dashboard.label.series')}</Label>
	{#each $form.name as _, i}
		<TextInput
			errors={$errors.series[i]?.value ?? ''}
			{handleChange}
			id={i === 0 ? id : null}
			isTouched={$touched.series[i].value}
			name={`series[${i}].value`}
			style="grid-column: 2/3"
			bind:value={$form.series[i].value}
		/>
		<LanguageSelect
			errors={$errors.series[i]?.language ?? ''}
			name={`series[${i}].language`}
			{updateValidateField}
			bind:value={$form.series[i].language}
		/>
		{#if i > 0}<RemoveButton fieldName="series" {formData} {i} />{/if}
	{/each}
	<AddButton {formData} />
</Grid>
