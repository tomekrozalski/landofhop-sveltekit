<script lang="ts">
	import { translate } from 'svelte-intl';
	import Conditional from '$lib/atoms/forms/Conditional.svelte';
	import Label from '$lib/atoms/forms/Label.svelte';
	import TextInput from '$lib/atoms/forms/TextInput.svelte';
	import InfoBox from '$lib/molecules/InfoBox/InfoBox.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, touched, updateField, updateTouched, validateField } = formData;
	let fieldName = 'coordinates';
	let id = `${formName}-${fieldName}`;
</script>

<Label {id} isRequired>
	{$translate('dashboard.label.coordinates')}
	<InfoBox messageKey="dashboard.label.coordinates.info" />
</Label>
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
