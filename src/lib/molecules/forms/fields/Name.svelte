<script lang="ts">
	import { translate } from 'svelte-intl';
	import Conditional from '$lib/atoms/forms/Conditional.svelte';
	import Label from '$lib/atoms/forms/Label.svelte';
	import TextInput from '$lib/atoms/forms/TextInput.svelte';

	export let formName: string;
	export let formData: any;
	export let labelId: string;
	export let withStatusIndicator: boolean = false;
	let { errors, form, handleChange, touched, updateField, updateTouched, validateField } = formData;
	let fieldName = 'name';
	let id = `${formName}-${fieldName}`;
</script>

<Label {id}>{$translate(labelId)}</Label>
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
	isTouched={$touched[fieldName] === true}
	{fieldName}
	bind:value={$form[fieldName]}
	{withStatusIndicator}
/>
