<script lang="ts">
	import { translate } from 'svelte-intl';
	import { AppLanguage } from '$types/enums/Globals.enum';
	import { getFromArray } from '$lib/utils/helpers/getFromArray';
	import { updateStyleList } from '$lib/molecules/forms/selects/updateStoreData';
	import { styleStore } from '$lib/utils/stores/selects';
	import type { Select as SelectType } from './Select.d';
	import Loading from './elements/Loading.svelte';
	import SelectWrapper from './SelectWrapper.svelte';

	export let errors: string | string[];
	export let handleClear: () => void;
	export let id: string | null = null;
	export let isDisabled: boolean = false;
	export let setValue: (event: any) => void;
	export let value: string[] | null;

	$: if (value !== null) {
		updateStyleList();
	}

	$: items = $styleStore
		.map(({ badge, name }) => ({
			label: getFromArray(name, AppLanguage.pl).value,
			value: badge
		}))
		.sort((a, b) => (a.label < b.label ? -1 : 1)) as SelectType[];

	$: getSelectedValues = () =>
		value?.map((id) => items.find((item) => item.value === id) as SelectType) ?? null;
</script>

{#if value !== null && !items.length}
	<Loading />
{:else}
	<SelectWrapper
		{errors}
		{handleClear}
		{id}
		{isDisabled}
		isMulti
		{items}
		placeholder={$translate('form.select.placeholder.styleTag')}
		{setValue}
		value={getSelectedValues()}
	/>
{/if}
