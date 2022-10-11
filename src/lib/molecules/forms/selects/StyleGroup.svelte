<script lang="ts">
	import { translate } from 'svelte-intl';
	import { StyleGroup } from '$lib/utils/enums/StyleGroup.enum';
	import SelectWrapper from './SelectWrapper.svelte';

	export let errors: string;
	export let name: string;
	export let updateField: (fieldName: string, value: any) => void;
	export let validateField: (fieldName: string) => void;
	export let value: string;

	const items = Object.values(StyleGroup).map((value) => ({
		label: $translate(`styleGroup.${value}`),
		value
	}));

	function handleClear() {
		updateField(name, '');
	}

	function setValue(event: any) {
		updateField(name, event.detail.value);
		validateField(name);
	}
</script>

<SelectWrapper
	{errors}
	{handleClear}
	{items}
	placeholder={$translate('form.select.placeholder.styleGroup')}
	{setValue}
	value={items.find((item) => item.value === value) ?? null}
/>
