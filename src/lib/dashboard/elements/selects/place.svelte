<script lang="ts">
	import { translate } from 'svelte-intl';
	import { getFromArray } from '$lib/dashboard/utils/getFromArray';
	import { placeStore } from '$lib/dashboard/utils/stores';
	import SelectWrapper from './selectWrapper.svelte';

	export let errors: string;
	export let handleClear: () => void;
	export let id: string = null;
	export let setValue: (event: any) => void;
	export let value: string | null;

	$: items = $placeStore
		.map(({ city, institution, shortId }) => ({
			label: `${getFromArray(city, 'pl').value} (${getFromArray(institution.name, 'pl').value})`,
			value: shortId
		}))
		.sort((a, b) => (a.label < b.label ? -1 : 1));
</script>

<SelectWrapper
	{errors}
	{handleClear}
	{id}
	{items}
	placeholder={$translate('dashboard.select.placeholder.place')}
	{setValue}
	value={value === null ? null : items.find((item) => item.value === value)}
/>
