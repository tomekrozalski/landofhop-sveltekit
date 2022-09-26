<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/Label.svelte';
	import TextInput from '$lib/elements/form/TextInput.svelte';

	import CurrencySelect from '../elements/selects/Currency.svelte';
	import ShopSelect from '../elements/selects/Shop.svelte';
	import AddButton from '../elements/AddButton.svelte';
	import RemoveButton from '../elements/RemoveButton.svelte';
	import Plug from '../elements/Plug.svelte';
	import { emptyPrice, getNullishObject } from '../../../lib/utils/admin/emptyFieldValues';

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
