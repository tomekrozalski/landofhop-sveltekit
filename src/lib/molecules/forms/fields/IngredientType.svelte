<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/atoms/forms/Label.svelte';
	import IngredientTypeSelect from '../selects/IngredientType.svelte';

	export let formName: string;
	export let formData: any;
	export let labelId: string;
	let { errors, form, updateField, validateField } = formData;
	let fieldName = 'type';
	let id = `${formName}-${fieldName}`;

	function handleClear() {
		updateField(fieldName, '');
	}

	function setValue(event: any) {
		updateField('parent', '');
		updateField(fieldName, event.detail.value);
		validateField(fieldName);
	}
</script>

<Label {id} isRequired>{$translate(labelId)}</Label>
<IngredientTypeSelect
	errors={$errors[fieldName]}
	{handleClear}
	{setValue}
	bind:value={$form[fieldName]}
/>
