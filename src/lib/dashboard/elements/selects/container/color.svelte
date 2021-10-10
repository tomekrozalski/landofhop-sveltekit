<script lang="ts">
	import { translate } from 'svelte-intl';
	import {
		ContainerColorBottle,
		ContainerColorCan,
		ContainerType
	} from '$lib/utils/enums/Beverage.enum';
	import SelectWrapper from '../selectWrapper.svelte';

	export let errors: string | string[];
	export let handleClear: () => void;
	export let setValue: (event: any) => void;
	export let type: ContainerType;
	export let value: ContainerColorBottle | ContainerColorCan | string;

	let items = [];

	$: if (type === ContainerType.bottle) {
		items = Object.keys(ContainerColorBottle).map((value) => ({
			label: $translate(`dashboard.container.color.${value}`),
			value
		}));
	} else if (type === ContainerType.can) {
		items = Object.keys(ContainerColorCan).map((value) => ({
			label: $translate(`dashboard.container.color.${value}`),
			value
		}));
	} else {
		items = [];
	}
</script>

<SelectWrapper
	{errors}
	{handleClear}
	{items}
	placeholder={$translate('dashboard.select.placeholder.containerColor')}
	{setValue}
	value={items.find((item) => item.value === value)}
/>
