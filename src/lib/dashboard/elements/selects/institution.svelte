<script lang="ts">
	import { translate } from 'svelte-intl';
	import { getFromArray } from '$lib/dashboard/utils/getFromArray';
	import { institutionStore } from '$lib/dashboard/utils/stores';
	import SelectWrapper from './selectWrapper.svelte';

	export let errors: string | string[];
	export let handleClear: () => void;
	export let isMulti: boolean = false;
	export let setValue: (event: any) => void;
	export let value: string | null;

	$: items = $institutionStore
		.map(({ name, shortId }) => ({
			label: getFromArray(name, 'pl').value,
			value: shortId
		}))
		.sort((a, b) => (a.label < b.label ? -1 : 1));
</script>

<SelectWrapper
	{errors}
	{handleClear}
	{isMulti}
	{items}
	placeholder={$translate('dashboard.select.placeholder.institution')}
	{setValue}
	value={value === null ? null : items.find((item) => item.value === value)}
/>
