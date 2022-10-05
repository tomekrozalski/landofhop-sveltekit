<script lang="ts">
	import { translate } from 'svelte-intl';
	import { Clarity } from '$lib/utils/enums/Beverage.enum';
	import SelectWrapper from './SelectWrapper.svelte';

	export let errors: string | string[];
	export let handleClear: () => void;
	export let setValue: (event: any) => void;
	export let value: Clarity | null;

	const items = Object.keys(Clarity).map((value) => ({
		label: $translate(`dashboard.clarity.${value}`),
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
