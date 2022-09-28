<script lang="ts">
	import { translate } from 'svelte-intl';
	import { AlcoholUnit } from '$lib/utils/enums/Beverage.enum';
	import SelectWrapper from '$lib/elements/form/selects/SelectWrapper.svelte';

	export let errors: string | string[];
	export let handleClear: () => void;
	export let setValue: (event: any) => void;
	export let value: AlcoholUnit | null;

	const items = Object.keys(AlcoholUnit).map((value) => ({
		label: $translate(`dashboard.alcohol.unit.${value}`),
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
