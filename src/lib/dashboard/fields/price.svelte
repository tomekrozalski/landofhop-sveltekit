<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/label.svelte';
	import TextInput from '$lib/elements/form/textInput.svelte';
	import CurrencySelect from '$lib/dashboard/elements/selects/currency.svelte';
	import ShopSelect from '$lib/dashboard/elements/selects/shop.svelte';
	import AddButton from '$lib/dashboard/elements/addButton.svelte';
	import RemoveButton from '$lib/dashboard/elements/removeButton.svelte';
	import Plug from '$lib/dashboard/elements/plug.svelte';
	import { emptyPrice, getNullishObject } from '$lib/dashboard/utils/emptyFieldValues';

	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, touched, updateField, validateField } = formData;
	let fieldName = 'price';
	let id = `${formName}-${fieldName}`;
</script>

<Label {id}>{$translate('dashboard.label.price')}</Label>
{#if $form[fieldName].length}
	{#each $form[fieldName] as _, i}
		<TextInput
			errors={$errors[fieldName][i]?.value ?? ''}
			fieldName={`${fieldName}[${i}].value`}
			{handleChange}
			id={i === 0 ? id : null}
			isTouched={$touched[fieldName][i].value}
			style="grid-column: 2/3"
			bind:value={$form[fieldName][i].value}
		/>
		<CurrencySelect
			errors={$errors[fieldName][i]?.currency ?? ''}
			name={`${fieldName}[${i}].currency`}
			{updateField}
			{validateField}
			bind:value={$form[fieldName][i].currency}
		/>
		<TextInput
			errors={$errors[fieldName][i]?.date ?? ''}
			fieldName={`${fieldName}[${i}].date`}
			{handleChange}
			id={i === 0 ? id : null}
			isTouched={$touched[fieldName][i].date}
			bind:value={$form[fieldName][i].date}
		/>
		<ShopSelect
			errors={$errors[fieldName][i]?.shop ?? ''}
			name={`${fieldName}[${i}].shop`}
			{updateField}
			{validateField}
			bind:value={$form[fieldName][i].shop}
		/>
		<RemoveButton {fieldName} {formData} {i} />
	{/each}
	<AddButton emptyValue={emptyPrice} {fieldName} {formData} />
{:else}
	<Plug emptyValue={emptyPrice} {fieldName} {formData} wider />
{/if}
