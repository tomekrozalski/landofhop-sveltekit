<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/label.svelte';
	import TextInput from '$lib/elements/form/textInput.svelte';
	import Conditional from '$lib/dashboard/elements/conditional.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, touched, updateField, updateTouched, validateField } = formData;
	let fieldName = 'bitterness';
	let id = `${formName}-${fieldName}`;
</script>

<Label {id}>{$translate('dashboard.label.bitterness')}</Label>
<Conditional
	{fieldName}
	{id}
	initialValue="0"
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
	type="number"
	bind:value={$form[fieldName]}
/>
