<script lang="ts">
	import { translate } from 'svelte-intl';

	import Label from '$lib/elements/form/label.svelte';
	import TextInput from '$lib/elements/form/textInput.svelte';
	import Conditional from '$lib/dashboard/elements/conditional.svelte';

	export let formName: string;
	export let formData: any;
	console.log('formData', formData);
	let { errors, form, handleChange, touched, updateField, updateTouched, validateField } = formData;
	let fieldName = 'website';
	let id = `${formName}-${fieldName}`;
</script>

<Label {id}>{$translate('dashboard.label.website')}</Label>
<Conditional
	{fieldName}
	initialValue="https://"
	{updateField}
	{updateTouched}
	{validateField}
	value={$form[fieldName]}
/>
<TextInput
	errors={$errors[fieldName]}
	{handleChange}
	{id}
	isTouched={$touched[fieldName]}
	{fieldName}
	bind:value={$form[fieldName]}
/>
