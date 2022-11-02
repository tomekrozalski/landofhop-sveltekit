<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { translate } from 'svelte-intl';
	import { AppLanguage } from '$types/enums/Globals.enum';
	import { getFromArray } from '$lib/utils/helpers/getFromArray';
	import { updatePlaceList } from '$lib/molecules/forms/selects/updateStoreData';
	import { placeStore } from '$lib/utils/stores/selects';
	import type { Select as SelectType } from './Select.d';
	import Loading from './elements/Loading.svelte';
	import SelectWrapper from './SelectWrapper.svelte';

	export let errors: string;
	export let handleClear: () => void;
	export let id: string | null = null;
	export let setValue: (event: any) => void;
	export let value: string | null;

	let items: SelectType[] = [];

	$: if ($placeStore.length) {
		items = $placeStore
			.map(({ city, institution, shortId }) => ({
				label: `${getFromArray(city, AppLanguage.pl).value} (${
					getFromArray(institution.name, AppLanguage.pl).value
				})`,
				value: shortId
			}))
			.sort((a, b) => (a.label < b.label ? -1 : 1));
	}

	afterUpdate(() => {
		if (value !== null) {
			updatePlaceList();
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
		{items}
		placeholder={$translate('form.select.placeholder.place')}
		{setValue}
		value={value === null ? null : items.find((item) => item.value === value) ?? ''}
	/>
{/if}
