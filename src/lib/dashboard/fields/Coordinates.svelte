<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/Label.svelte';
	import TextInput from '$lib/elements/form/TextInput.svelte';
	import Conditional from '$lib/elements/form/Conditional.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, touched, updateField, updateTouched, validateField } = formData;
	let fieldName = 'coordinates';
	let id = `${formName}-${fieldName}`;
</script>

<Label {id}>{$translate('dashboard.label.coordinates')}</Label>
<Conditional
	{fieldName}
	{id}
	initialValue={{
		longitude: '0',
		latitude: '0'
	}}
	nullishValue={{
		longitude: null,
		latitude: null
	}}
	{updateField}
	{updateTouched}
	{validateField}
	value={$form[fieldName]}
/>
<TextInput
	errors={$errors[fieldName].latitude}
	fieldName={`${fieldName}.latitude`}
	{handleChange}
	isTouched={$touched[fieldName].latitude}
	type="number"
	bind:value={$form[fieldName].latitude}
/>
<TextInput
	errors={$errors[fieldName].longitude}
	fieldName={`${fieldName}.longitude`}
	{handleChange}
	{id}
	isTouched={$touched[fieldName].longitude}
	type="number"
	bind:value={$form[fieldName].longitude}
/>
