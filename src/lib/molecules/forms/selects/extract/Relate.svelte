<script lang="ts">
	import { translate } from 'svelte-intl';
	import { ExtractRelate } from '$types/enums/Beverage.enum';
	import SelectWrapper from '../SelectWrapper.svelte';

	export let errors: string | string[];
	export let handleClear: () => void;
	export let setValue: (event: any) => void;
	export let value: ExtractRelate | null;

	const items = Object.keys(ExtractRelate).map((value) => ({
		label: $translate(`dashboard.extract.relate.${value}`),
		value
	}));
</script>

<SelectWrapper
	{errors}
	{handleClear}
	isDisabled={value === null}
	{items}
	{setValue}
	value={items.find((item) => item.value === value) ?? ''}
/>
