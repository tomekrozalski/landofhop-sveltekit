<script lang="ts">
	import { translate } from 'svelte-intl';
	import { AlcoholScope } from '$types/enums/Beverage.enum';
	import SelectWrapper from '../SelectWrapper.svelte';

	export let errors: string | string[];
	export let handleClear: () => void;
	export let setValue: (event: any) => void;
	export let style: string = '';
	export let withEmpty: boolean = false;
	export let value: AlcoholScope | null;

	const items = Object.keys(AlcoholScope).map((value) => ({
		label: $translate(`dashboard.alcohol.scope.${value}`),
		value
	}));

	if (withEmpty) {
		items.unshift({ label: $translate('dashboard.alcohol.scope.--'), value: '--' });
	}
</script>

<SelectWrapper
	{errors}
	{handleClear}
	isDisabled={value === null}
	{items}
	{setValue}
	{style}
	value={items.find((item) => item.value === value) ?? ''}
/>
