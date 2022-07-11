<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/Label.svelte';
	import IngredientSelect from '$lib/elements/form/selects/ingredient.svelte';
	import Conditional from '$lib/elements/form/Conditional.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, updateField, updateTouched, validateField } = formData;
	let fieldName = 'parent';
	let id = `${formName}-${fieldName}`;

	function handleClear() {
		updateField(fieldName, '');
	}

	function setValue(event) {
		updateField(fieldName, event.detail.value);
		validateField(fieldName);
	}
</script>

<Label {id} isRequired>{$translate('dashboard.label.parentIngredient')}</Label>
<IngredientSelect
	errors={$errors[fieldName]}
	filter={$form.type}
	{handleClear}
	id={$form[fieldName] !== null && id}
	isDisabled={!$form.type}
	{setValue}
	bind:value={$form[fieldName]}
/>
