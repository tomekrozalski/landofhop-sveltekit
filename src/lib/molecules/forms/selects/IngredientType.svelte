<script lang="ts">
	import { translate } from 'svelte-intl';
	import { IngredientType } from '$lib/utils/enums/Beverage.enum';
	import SelectWrapper from './SelectWrapper.svelte';

	export let errors: string | string[];
	export let handleClear: () => void;
	export let setValue: (event: any) => void;
	export let value: IngredientType | null;

	const items = Object.keys(IngredientType).map((value) => ({
		label: $translate(`modals.labels.ingredient.type.${value}`),
		value,
		type: value
	}));
</script>

<SelectWrapper
	{errors}
	{handleClear}
	isDisabled={value === null}
	{items}
	{setValue}
	value={items.find((item) => item.value === value) ?? ''}
/>
