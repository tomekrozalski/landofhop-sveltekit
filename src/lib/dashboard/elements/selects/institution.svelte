<script lang="ts">
	import { translate } from 'svelte-intl';
	import { getFromArray } from '$lib/dashboard/utils/getFromArray';
	import { institutionStore } from '$lib/dashboard/utils/stores';
	import SelectWrapper from './selectWrapper.svelte';

	export let errors: string;
	export let name: string;
	export let updateValidateField: (string, any) => void;
	export let value: string;

	let items = $institutionStore
		.map(({ name, shortId }) => ({
			label: getFromArray(name, 'pl').value,
			value: shortId
		}))
		.sort((a, b) => (a.label < b.label ? -1 : 1));
</script>

<SelectWrapper
	{errors}
	{items}
	{name}
	{updateValidateField}
	placeholder={$translate('dashboard.select.placeholder.institution')}
	value={items.find((item) => item.value === value)}
/>
