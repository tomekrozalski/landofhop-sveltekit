<script lang="ts">
	import { translate } from 'svelte-intl';
	import isArray from 'lodash/isArray.js';
	import isString from 'lodash/isString.js';

	import { getFromArray } from '$lib/dashboard/utils/getFromArray';
	import { institutionStore } from '$lib/dashboard/utils/stores';
	import SelectWrapper from './selectWrapper.svelte';

	export let errors: string | string[];
	export let handleClear: () => void;
	export let id: string = null;
	export let isMulti: boolean = false;
	export let setValue: (event: any) => void;
	export let value: string | string[] | null;

	function getSelectValue(value) {
		if (isArray(value)) {
			return value.map((id) => items.find((item) => item.value === id));
		}

		if (isString(value)) {
			return items.find((item) => item.value === value);
		}

		return null;
	}

	$: items = $institutionStore
		.map(({ name, shortId }) => ({
			label: getFromArray(name, 'pl').value,
			value: shortId
		}))
		.sort((a, b) => (a.label < b.label ? -1 : 1));
</script>

<SelectWrapper
	{errors}
	{handleClear}
	{id}
	{isMulti}
	{items}
	placeholder={$translate('dashboard.select.placeholder.institution')}
	{setValue}
	value={getSelectValue(value)}
/>
