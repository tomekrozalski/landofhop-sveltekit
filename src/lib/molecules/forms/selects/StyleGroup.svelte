<script lang="ts">
	import { translate } from 'svelte-intl';
	import SelectWrapper from './SelectWrapper.svelte';

	export let errors: string;
	export let name: string;
	export let updateField: (fieldName: string, value: any) => void;
	export let validateField: (fieldName: string) => void;
	export let value: string;

	const items = [
		'british-and-irish-ales',
		'the-lager-family',
		'continental-ales-weissbiers-and-ale-lager-hybrids',
		'the-beers-of-belgium',
		'craft-beer-in-america-and-beyond',
		'a-sip-beyond'
	].map((value) => ({
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
