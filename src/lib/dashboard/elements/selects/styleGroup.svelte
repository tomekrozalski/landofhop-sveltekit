<script lang="ts">
	import { translate } from 'svelte-intl';
	import SelectWrapper from './selectWrapper.svelte';

	export let errors: string;
	export let name: string;
	export let updateField: (fieldName: string, value: any) => void;
	export let validateField: (fieldName: string) => void;
	export let value: string;

	const items = [
		{
			label: 'British and Irish Ales',
			value: 'british-and-irish-ales'
		},
		{
			label: 'The Lager Family',
			value: 'the-lager-family'
		},
		{
			label: 'Continental Ales, Weissbiers and Ale-Lager Hybrids',
			value: 'continental-ales-weissbiers-and-ale-lager-hybrids'
		},
		{
			label: 'The Beers of Belgium',
			value: 'the-beers-of-belgium'
		},
		{
			label: 'Craft Beer in America and Beyond',
			value: 'craft-beer-in-america-and-beyond'
		},
		{
			label: 'A Sip Beyond',
			value: 'a-sip-beyond'
		}
	];

	function handleClear() {
		updateField(name, '');
	}

	function setValue(event) {
		updateField(name, event.detail.value);
		validateField(name);
	}
</script>

<SelectWrapper
	{errors}
	{handleClear}
	{items}
	placeholder={$translate('dashboard.select.placeholder.styleGroup')}
	{setValue}
	value={items.find((item) => item.value === value)}
/>
