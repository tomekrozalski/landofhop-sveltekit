<script lang="ts">
	import { translate } from 'svelte-intl';
	import { AgedPreviousContent } from '$lib/utils/enums/Beverage.enum';
	import SelectWrapper from '../selectWrapper.svelte';

	export let errors: string | string[];
	export let handleClear: () => void;
	export let setValue: (event: any) => void;
	export let value: AgedPreviousContent[] | null;

	const items = Object.keys(AgedPreviousContent).map((value) => ({
		label: $translate(`dashboard.aged.previousContent.${value}`),
		value
	}));
</script>

<SelectWrapper
	{errors}
	{handleClear}
	isDisabled={value === null}
	isMulti
	{items}
	placeholder={$translate('dashboard.select.placeholder.agedPreviousContent')}
	{setValue}
	value={value.map((id) => items.find((item) => item.value === id))}
/>
