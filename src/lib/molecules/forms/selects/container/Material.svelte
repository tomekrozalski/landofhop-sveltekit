<script lang="ts">
	import { translate } from 'svelte-intl';
	import {
		ContainerMaterialBottle,
		ContainerMaterialCan,
		ContainerType
	} from '$lib/utils/enums/Beverage.enum';
	import type { Select as SelectType } from '$lib/utils/types/common/Select.d';
	import SelectWrapper from '../SelectWrapper.svelte';

	export let errors: string | string[];
	export let handleClear: () => void;
	export let setValue: (event: any) => void;
	export let type: ContainerType;
	export let value: ContainerMaterialBottle | ContainerMaterialCan | string;

	let items: SelectType[] = [];

	$: if (type === ContainerType.bottle) {
		items = Object.keys(ContainerMaterialBottle).map((value) => ({
			label: $translate(`dashboard.container.material.${value}`),
			value
		}));
	} else if (type === ContainerType.can) {
		items = Object.keys(ContainerMaterialCan).map((value) => ({
			label: $translate(`dashboard.container.material.${value}`),
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
	placeholder={$translate('form.select.placeholder.containerMaterial')}
	{setValue}
	value={items.find((item) => item.value === value) ?? null}
/>
