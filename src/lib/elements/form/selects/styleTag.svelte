<script lang="ts">
	import { translate } from 'svelte-intl';
	import { getFromArray } from '$lib/utils/helpers/getFromArray';
	import { styleStore } from '$lib/utils/stores/selects';
	import SelectWrapper from '$lib/elements/form/selects/selectWrapper.svelte';
	import type { AppLanguage } from '$lib/utils/enums/AppLanguage.enum';

	export let errors: string | string[];
	export let handleClear: () => void;
	export let id: string = null;
	export let isDisabled: boolean = false;
	export let isLoading: boolean = false;
	export let setValue: (event: any) => void;
	export let value: string[] | null;

	$: items = $styleStore
		.map(({ badge, name }) => ({
			label: getFromArray(name, 'pl' as AppLanguage).value,
			value: badge
		}))
		.sort((a, b) => (a.label < b.label ? -1 : 1));
</script>

<SelectWrapper
	{errors}
	{handleClear}
	{id}
	{isDisabled}
	{isLoading}
	isMulti
	{items}
	placeholder={$translate('form.select.placeholder.styleTag')}
	{setValue}
	value={value?.map((id) => items.find((item) => item.value === id)) ?? null}
/>
