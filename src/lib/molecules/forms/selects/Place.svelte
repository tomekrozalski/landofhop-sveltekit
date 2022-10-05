<script lang="ts">
	import { translate } from 'svelte-intl';
	import { getFromArray } from '$lib/utils/helpers/getFromArray';
	import { updatePlaceList } from '$lib/utils/helpers/updateStoreData';
	import { placeStore } from '$lib/utils/stores/selects';
	import type { AppLanguage } from '$lib/utils/enums/AppLanguage.enum';
	import Loading from './elements/Loading.svelte';
	import SelectWrapper from './SelectWrapper.svelte';

	export let errors: string;
	export let handleClear: () => void;
	export let id: string = null;
	export let setValue: (event: any) => void;
	export let value: string | null;

	$: if (value !== null) {
		updatePlaceList();
	}

	$: items = $placeStore
		.map(({ city, institution, shortId }) => ({
			label: `${getFromArray(city, 'pl' as AppLanguage).value} (${
				getFromArray(institution.name, 'pl' as AppLanguage).value
			})`,
			value: shortId
		}))
		.sort((a, b) => (a.label < b.label ? -1 : 1));
</script>

{#if value !== null && !items.length}
	<Loading />
{:else}
	<SelectWrapper
		{errors}
		{handleClear}
		{id}
		{items}
		placeholder={$translate('dashboard.select.placeholder.place')}
		{setValue}
		value={value === null ? null : items.find((item) => item.value === value) ?? null}
	/>
{/if}
