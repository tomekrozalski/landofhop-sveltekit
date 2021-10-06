<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/label.svelte';
	import InstitutionSelect from '$lib/dashboard/elements/selects/institution.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, updateValidateField } = formData;
	let fieldName = 'brand';
	let id = `${formName}-${fieldName}`;
</script>

<Label {id}>{$translate('dashboard.label.owner')}</Label>
<InstitutionSelect
	errors={$errors[fieldName]}
	name={fieldName}
	{updateValidateField}
	bind:value={$form[fieldName]}
/>
