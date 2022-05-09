<script lang="ts">
	import { translate } from 'svelte-intl';
	import { AgedTimeUnit } from '$lib/utils/enums/Beverage.enum';
	import SelectWrapper from '$lib/elements/form/selects/selectWrapper.svelte';

	export let errors: string | string[];
	export let handleClear: () => void;
	export let setValue: (event: any) => void;
	export let value: AgedTimeUnit | null;

	const items = Object.keys(AgedTimeUnit).map((value) => ({
		label: $translate(`dashboard.aged.time.${value}`),
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
