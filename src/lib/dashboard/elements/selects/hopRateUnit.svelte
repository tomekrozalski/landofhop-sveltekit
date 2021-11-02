<script lang="ts">
	import { translate } from 'svelte-intl';
	import { HopRateUnit } from '$lib/utils/enums/Beverage.enum';
	import SelectWrapper from './selectWrapper.svelte';

	export let errors: string | string[];
	export let handleClear: () => void;
	export let setValue: (event: any) => void;
	export let value: HopRateUnit | null;

	const items = Object.keys(HopRateUnit).map((value) => ({
		label: $translate(`dashboard.hopRate.unit.${value}`),
		value
	}));
</script>

<SelectWrapper
	{errors}
	{handleClear}
	isDisabled={value === null}
	{items}
	{setValue}
	value={items.find((item) => item.value === value)}
/>
