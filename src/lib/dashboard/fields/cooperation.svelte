<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/label.svelte';
	import InstitutionSelect from '$lib/dashboard/elements/selects/institution.svelte';
	import Conditional from '$lib/dashboard/elements/conditional.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, updateField, updateValidateField } = formData;
	let fieldName = 'cooperation';
	let id = `${formName}-${fieldName}`;
</script>

<Label {id}>{$translate('dashboard.label.cooperation')}</Label>
<Conditional {fieldName} initialValue={[]} {updateField} value={$form[fieldName]} />
<InstitutionSelect
	errors={$errors[fieldName]}
	name={fieldName}
	{updateValidateField}
	bind:value={$form[fieldName]}
/>
