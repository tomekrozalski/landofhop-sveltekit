<script lang="ts">
	import { translate } from 'svelte-intl';
	import SelectWrapper from './SelectWrapper.svelte';

	export let errors: string;
	export let name: string;
	export let updateField: (fieldName: string, value: any) => void;
	export let validateField: (fieldName: string) => void;
	export let value: string;

	const items = [
		{
			label: 'sklep specjalistyczny',
			value: 'specialist shop'
		},
		{
			label: 'internetowy sklep specjalistyczny',
			value: 'e-commerce specialist shop'
		},
		{
			label: 'Aldi',
			value: 'Aldi'
		},
		{
			label: 'Biedronka',
			value: 'Biedronka'
		},
		{
			label: 'Lidl',
			value: 'Lidl'
		},
		{
			label: 'Żabka',
			value: 'Żabka'
		}
	];

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
	placeholder={$translate('dashboard.select.placeholder.shop')}
	{setValue}
	style="grid-column: 3/5"
	value={items.find((item) => item.value === value) ?? null}
/>
