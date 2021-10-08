<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/label.svelte';
	import InstitutionSelect from '$lib/dashboard/elements/selects/institution.svelte';
	import Conditional from '$lib/dashboard/elements/conditional.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, updateField, updateTouched, validateField } = formData;
	let fieldName = 'owner';
	let id = `${formName}-${fieldName}`;

	function handleClear() {
		updateField(fieldName, '');
	}

	function setValue(event) {
		updateField(fieldName, event.detail.value);
		validateField(fieldName);
	}
</script>

<Label {id}>{$translate('dashboard.label.owner')}</Label>
<Conditional {fieldName} {updateField} {updateTouched} {validateField} value={$form[fieldName]} />
<InstitutionSelect
	errors={$errors[fieldName]}
	{handleClear}
	{setValue}
	bind:value={$form[fieldName]}
/>
