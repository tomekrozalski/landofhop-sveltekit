<script lang="ts">
	import { translate } from 'svelte-intl';
	import Conditional from '$lib/atoms/forms/Conditional.svelte';
	import Label from '$lib/atoms/forms/Label.svelte';
	import TextInput from '$lib/atoms/forms/TextInput.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, touched, updateField, updateTouched, validateField } = formData;
	let fieldName = 'notes';
	let id = `${formName}-${fieldName}`;
</script>

<Label {id}>{$translate('dashboard.label.notes')}</Label>
<Conditional
	{fieldName}
	{id}
	{updateField}
	{updateTouched}
	{validateField}
	value={$form[fieldName]}
/>
<TextInput
	errors={$errors[fieldName]}
	{handleChange}
	{id}
	isTextarea
	isTouched={$touched[fieldName]}
	{fieldName}
	bind:value={$form[fieldName]}
/>
