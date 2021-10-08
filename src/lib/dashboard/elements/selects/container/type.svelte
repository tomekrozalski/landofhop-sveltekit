<script lang="ts">
	import { translate } from 'svelte-intl';
	import { ContainerType } from '$lib/utils/enums/Beverage.enum';
	import SelectWrapper from '../selectWrapper.svelte';

	export let errors: string | string[];
	export let handleClear: () => void;
	export let setValue: (event: any) => void;
	export let value: string | null;

	const items = Object.keys(ContainerType).map((value) => ({
		label: $translate(`dashboard.container.type.${value}`),
		value
	}));
</script>

<SelectWrapper
	{errors}
	{handleClear}
	{items}
	placeholder={$translate('dashboard.select.placeholder.containerType')}
	{setValue}
	value={items.find((item) => item.value === value)}
/>
