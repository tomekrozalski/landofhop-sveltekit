<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { translate } from 'svelte-intl';
	import { isArray, isString } from 'lodash-es';
	import { AppLanguage } from '$types/enums/Globals.enum';
	import { getFromArray } from '$lib/utils/helpers/getFromArray';
	import { updateIngredientList } from '$lib/molecules/forms/selects/updateStoreData';
	import { ingredientsStore } from '$lib/utils/stores/selects';
	import type { IngredientType } from '$types/enums/Beverage.enum';
	import type { Select as SelectType } from './Select.d';
	import Loading from './elements/Loading.svelte';
	import SelectWrapper from './SelectWrapper.svelte';

	export let errors: string | string[];
	export let handleClear: () => void;
	export let id: string | null = null;
	export let isDisabled: boolean = false;
	export let isMulti: boolean = false;
	export let setValue: (event: any) => void;
	export let filter: IngredientType | null = null;
	export let value: string | string[] | '' | null;

	let items: SelectType[] = [];

	$: if ($ingredientsStore.length) {
		items = $ingredientsStore
			.filter(({ type }) => (filter ? type === filter : true))
			.sort((a, b) => (a.occurrences.alone > b.occurrences.alone ? -1 : 1))
			.map(({ badge, name, type }) => ({
				label: getFromArray(name, AppLanguage.pl).value,
				value: badge,
				type
			}));
	}

	function getSelectValue(value: any) {
		if (isArray(value)) {
			return value.map((id) => items.find((item) => item.value === id)) as SelectType[];
		}

		if (isString(value)) {
			return (items.find((item) => item.value === value) as SelectType) ?? '';
		}

		return null;
	}

	afterUpdate(() => {
		if (value !== null) {
			updateIngredientList();
		}
	});
</script>

{#if value !== null && !items.length}
	<Loading />
{:else}
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
{/if}
