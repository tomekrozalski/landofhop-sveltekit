<script lang="ts">
	import { translate } from 'svelte-intl';
	import { ContainerUnit } from '$lib/utils/enums/Beverage.enum';
	import SelectWrapper from '../SelectWrapper.svelte';

	export let errors: string | string[];
	export let handleClear: () => void;
	export let setValue: (event: any) => void;
	export let value: ContainerUnit | string;

	const items = Object.keys(ContainerUnit).map((value) => ({
		label: $translate(`dashboard.container.unit.${value}`),
		value
	}));
</script>

<SelectWrapper
	{errors}
	{handleClear}
	{items}
	placeholder={$translate('form.select.placeholder.containerUnit')}
	{setValue}
	value={items.find((item) => item.value === value) ?? ''}
/>
