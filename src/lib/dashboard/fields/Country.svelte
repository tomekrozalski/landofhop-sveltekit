<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/Label.svelte';
	import CountrySelect from '$lib/dashboard/elements/selects/Country.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, updateField, validateField } = formData;
	let fieldName = 'country';
	let id = `${formName}-${fieldName}`;
</script>

<Label {id} isRequired>{$translate('dashboard.label.country')}</Label>
<CountrySelect
	errors={$errors[fieldName]}
	name={fieldName}
	{updateField}
	{validateField}
	bind:value={$form[fieldName]}
/>
