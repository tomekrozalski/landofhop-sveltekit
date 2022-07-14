<script lang="ts">
	import { translate } from 'svelte-intl';
	import { getFromArray } from '$lib/utils/helpers/getFromArray';
	import { placeStore } from '$lib/utils/stores/selects';
	import { updatePlaceList } from '$lib/utils/helpers/updateStoreData';
	import Loading from '$lib/elements/form/selects/elements/2Loading.svelte';
	import SelectWrapper from '$lib/elements/form/selects/SelectWrapper.svelte';
	import type { AppLanguage } from '$lib/utils/enums/AppLanguage.enum';

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
		value={value === null ? null : items.find((item) => item.value === value)}
	/>
{/if}
