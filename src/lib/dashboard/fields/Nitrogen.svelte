<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/Label.svelte';
	import Toggle from '$lib/elements/form/Toggle.svelte';
	import Conditional from '$lib/elements/form/Conditional.svelte';

	export let formName: string;
	export let formData: any;
	let { form, updateField, updateTouched, validateField } = formData;
	let fieldName = 'nitrogen';
	let id = `${formName}-${fieldName}`;
</script>

<Label {id}>{$translate('dashboard.label.nitrogen')}</Label>
<Conditional
	{fieldName}
	{id}
	initialValue={false}
	{updateField}
	{updateTouched}
	{validateField}
	value={$form[fieldName]}
/>
<Toggle {fieldName} {id} {updateField} value={$form[fieldName]} />
