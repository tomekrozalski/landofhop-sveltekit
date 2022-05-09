<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/label.svelte';
	import Conditional from '$lib/elements/form/conditional.svelte';
	import { Fermentation } from '$lib/utils/enums/Beverage.enum';

	export let formName: string;
	export let formData: any;
	let { form, updateField, updateTouched, validateField } = formData;
	let fieldName = 'fermentation';
	let id = `${formName}-${fieldName}`;

	const options = Object.values(Fermentation);
	$: selectedValues = $form[fieldName] ?? [];

	const onOptionChange = (type: Fermentation) => (e: Event) => {
		const checkbox = e.target as HTMLInputElement;

		updateField(
			fieldName,
			checkbox.checked ? [...selectedValues, type] : selectedValues.filter((item) => item !== type)
		);
	};
</script>

<Label {id}>{$translate('dashboard.label.fermentation')}</Label>
<Conditional
	{fieldName}
	{id}
	initialValue={[Fermentation.top]}
	{updateField}
	{updateTouched}
	{validateField}
	value={$form[fieldName]}
/>
<ul class:isDisabled={$form[fieldName] === null}>
	{#each options as option}
		<li>
			<input
				checked={selectedValues.includes(option)}
				disabled={$form[fieldName] === null}
				on:change={onOptionChange(option)}
				type="checkbox"
				id="fermentation-{option}"
			/>
			<label for="fermentation-{option}">{$translate(`dashboard.fermentation.${option}`)}</label>
		</li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		width: 100%;
		height: var(--size-input-height);
	}

	ul.isDisabled {
		cursor: not-allowed;
	}

	li {
		display: flex;
		flex-grow: 1;
		flex-basis: 0;
		border: 1px solid var(--color-grey-2);
	}

	ul.isDisabled li {
		border-color: var(--color-grey-3);
	}

	li + li {
		border-left: none;
	}

	label {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		background-color: var(--color-grey-4);
		cursor: pointer;
	}

	ul.isDisabled label {
		background-color: var(--color-grey-5);
		color: var(--color-grey-2);
		cursor: inherit;
	}

	input:checked + label {
		background-color: var(--color-success);
		color: var(--color-white);
	}

	input {
		display: none;
	}
</style>
