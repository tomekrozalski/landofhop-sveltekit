<script lang="ts">
	import { translate } from 'svelte-intl';
	import { isArray, isString } from 'lodash-es';

	import type { IngredientType } from '$lib/utils/enums/Beverage.enum';
	import { getFromArray } from '$lib/utils/helpers/getFromArray';
	import { ingredientsStore } from '$lib/utils/stores/selects';
	import { updateIngredientList } from '$lib/utils/helpers/updateStoreData';
	import SelectWrapper from './selectWrapper.svelte';

	export let errors: string | string[];
	export let handleClear: () => void;
	export let id: string = null;
	export let isDisabled: boolean = false;
	export let isMulti: boolean = false;
	export let setValue: (event: any) => void;
	export let filter: IngredientType = null;
	export let value: string | string[] | null;

	function getSelectValue(value) {
		if (isArray(value)) {
			return value.map((id) => items.find((item) => item.value === id));
		}

		if (isString(value)) {
			return items.find((item) => item.value === value);
		}

		return null;
	}

	$: if (value !== null) {
		updateIngredientList();
	}

	$: items = $ingredientsStore
		.filter(({ type }) => (filter ? type === filter : true))
		.map(({ badge, name, type }) => ({
			label: getFromArray(name, 'pl').value,
			value: badge,
			type
		}))
		.sort((a, b) => (a.label < b.label ? -1 : 1));
</script>

<SelectWrapper
	{errors}
	{handleClear}
	{id}
	{isDisabled}
	{isMulti}
	{items}
	placeholder={$translate('form.select.placeholder.ingredient')}
	{setValue}
	value={getSelectValue(value)}
/>
