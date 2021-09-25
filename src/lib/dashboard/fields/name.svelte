<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/label.svelte';
	import TextInput from '$lib/elements/form/textInput.svelte';
	import Grid from '$lib/dashboard/elements/grid.svelte';
	import LanguageSelect from '$lib/dashboard/elements/selects/language.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, touched, updateField } = formData;
	let name = 'name';
	let id = `${formName}-${name}`;

	$: console.log('->', $form.name);
</script>

<Grid columns={2}>
	<Label {id} isRequired>{$translate('dashboard.label.name')}</Label>
	{#each $form.name as name, i}
		<TextInput
			errors={$errors.name[i].value}
			{handleChange}
			{id}
			isTouched={$touched.name[i].value}
			name={`name[${i}].value`}
			bind:value={$form.name[i].value}
		/>
		<LanguageSelect name="name[0].language" {updateField} value={$form.name[i].language} />
	{/each}
</Grid>
