<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/Label.svelte';
	import StyleGroupSelect from '$lib/dashboard/elements/selects/styleGroup.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, updateField, validateField } = formData;
	let fieldName = 'group';
	let id = `${formName}-${fieldName}`;
</script>

<Label {id} isRequired>{$translate('dashboard.label.styleGroup')}</Label>
<StyleGroupSelect
	errors={$errors[fieldName]}
	name={fieldName}
	{updateField}
	{validateField}
	bind:value={$form[fieldName]}
/>
