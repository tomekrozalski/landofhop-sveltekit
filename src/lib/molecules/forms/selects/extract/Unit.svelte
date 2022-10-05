<script lang="ts">
	import { translate } from 'svelte-intl';
	import { ExtractUnit } from '$lib/utils/enums/Beverage.enum';
	import SelectWrapper from '../SelectWrapper.svelte';

	export let errors: string | string[];
	export let handleClear: () => void;
	export let setValue: (event: any) => void;
	export let value: ExtractUnit | null;

	const items = Object.keys(ExtractUnit).map((value) => ({
		label: $translate(`dashboard.extract.unit.${value}`),
		value
	}));
</script>

<SelectWrapper
	{errors}
	{handleClear}
	isDisabled={value === null}
	{items}
	{setValue}
	value={items.find((item) => item.value === value) ?? null}
/>
