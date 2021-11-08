<script lang="ts">
	import { translate } from 'svelte-intl';
	import { getFromArray } from '$lib/dashboard/utils/getFromArray';
	import { styleStore } from '$lib/dashboard/utils/stores';
	import SelectWrapper from './selectWrapper.svelte';

	export let errors: string | string[];
	export let handleClear: () => void;
	export let id: string = null;
	export let isDisabled: boolean = false;
	export let setValue: (event: any) => void;
	export let value: string[] | null;

	$: items = $styleStore
		.map(({ badge, name }) => ({
			label: getFromArray(name, 'pl').value,
			value: badge
		}))
		.sort((a, b) => (a.label < b.label ? -1 : 1));
</script>

<SelectWrapper
	{errors}
	{handleClear}
	{id}
	{isDisabled}
	isMulti
	{items}
	placeholder={$translate('dashboard.select.placeholder.ingredient')}
	{setValue}
	value={value?.map((id) => items.find((item) => item.value === id)) ?? null}
/>
