<script lang="ts">
	import { translate } from 'svelte-intl';
	import { getFromArray } from '$lib/utils/helpers/getFromArray';
	import { styleStore } from '$lib/utils/stores/selects';
	import { updateStyleList } from '$lib/utils/helpers/updateStoreData';
	import type { AppLanguage } from '$lib/utils/enums/AppLanguage.enum';
	import type { Select as SelectType } from '$lib/utils/types/common/Select.d';
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
			label: getFromArray(name, 'pl' as AppLanguage).value,
			value: badge
		}))
		.sort((a, b) => (a.label < b.label ? -1 : 1)) as SelectType[];

	const getSelectedValues = () =>
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
