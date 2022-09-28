<script lang="ts">
	import { translate } from 'svelte-intl';
	import { AlcoholRelate } from '$lib/utils/enums/Beverage.enum';
	import SelectWrapper from '$lib/elements/form/selects/SelectWrapper.svelte';

	export let errors: string | string[];
	export let handleClear: () => void;
	export let setValue: (event: any) => void;
	export let value: AlcoholRelate | null;

	const items = Object.keys(AlcoholRelate).map((value) => ({
		label: $translate(`dashboard.alcohol.relate.${value}`),
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
