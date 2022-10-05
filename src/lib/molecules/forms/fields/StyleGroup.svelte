<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/atoms/forms/Label.svelte';
	import StyleGroupSelect from '../selects/StyleGroup.svelte';

	export let formName: string;
	export let formData: any;
	export let labelId: string;
	let { errors, form, updateField, validateField } = formData;
	let fieldName = 'group';
	let id = `${formName}-${fieldName}`;
</script>

<Label {id} isRequired>{$translate(labelId)}</Label>
<StyleGroupSelect
	errors={$errors[fieldName]}
	name={fieldName}
	{updateField}
	{validateField}
	bind:value={$form[fieldName]}
/>
