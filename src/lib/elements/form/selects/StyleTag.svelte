<script lang="ts">
	import { translate } from 'svelte-intl';
	import { getFromArray } from '$lib/utils/helpers/getFromArray';
	import { styleStore } from '$lib/utils/stores/selects';
	import { updateStyleList } from '$lib/utils/helpers/updateStoreData';
	import Loading from '$lib/elements/form/selects/elements/2Loading.svelte';
	import SelectWrapper from '$lib/elements/form/selects/SelectWrapper.svelte';
	import type { AppLanguage } from '$lib/utils/enums/AppLanguage.enum';

	export let errors: string | string[];
	export let handleClear: () => void;
	export let id: string = null;
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
		.sort((a, b) => (a.label < b.label ? -1 : 1));
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
		value={value?.map((id) => items.find((item) => item.value === id)) ?? null}
	/>
{/if}
