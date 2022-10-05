<script lang="ts">
	import { translate } from 'svelte-intl';
	import Conditional from '$lib/atoms/forms/Conditional.svelte';
	import Label from '$lib/atoms/forms/Label.svelte';
	import AlcoholScopeSelect from '../selects/alcohol/Scope.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, updateField, updateTouched, validateField } = formData;
	let fieldName = 'alcoholScope';
	let id = `${formName}-${fieldName}`;

	function clearScope() {
		updateField(fieldName, '');
	}

	function setScope(event: any) {
		updateField(fieldName, event.detail.value);
		validateField(fieldName);
	}
</script>

<Label {id}>{$translate('dashboard.label.alcoholScope')}</Label>
<Conditional
	{fieldName}
	{id}
	{updateField}
	{updateTouched}
	{validateField}
	value={$form[fieldName]}
/>
<AlcoholScopeSelect
	errors={$errors[fieldName]}
	handleClear={clearScope}
	setValue={setScope}
	style="grid-column: 3/4"
	bind:value={$form[fieldName]}
/>
