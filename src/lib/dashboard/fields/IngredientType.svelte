<script lang="ts">
	import { translate } from 'svelte-intl';
	import IngredientTypeSelect from '$lib/dashboard/elements/selects/IngredientType.svelte';
	import Label from '$lib/elements/form/Label.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, updateField, validateField } = formData;
	let fieldName = 'type';
	let id = `${formName}-${fieldName}`;

	function handleClear() {
		updateField(fieldName, '');
	}

	function setValue(event) {
		updateField(fieldName, event.detail.value);
		validateField(fieldName);
	}
</script>

<Label {id} isRequired>{$translate('dashboard.label.ingredientType')}</Label>
<IngredientTypeSelect
	errors={$errors[fieldName]}
	{handleClear}
	{setValue}
	bind:value={$form[fieldName]}
/>
