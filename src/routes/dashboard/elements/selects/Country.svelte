<script lang="ts">
	import { translate } from 'svelte-intl';
	import countries from 'i18n-iso-countries';
	import pl from 'i18n-iso-countries/langs/pl.json';
	import SelectWrapper from '$lib/elements/form/selects/SelectWrapper.svelte';

	export let errors: string;
	export let name: string;
	export let updateField: (fieldName: string, value: any) => void;
	export let validateField: (fieldName: string) => void;
	export let value: string;

	countries.registerLocale(pl);

	const items = Object.entries(countries.getNames('pl', { select: 'official' }))
		.map(([value, label]) => ({
			value,
			label
		}))
		.sort((a, b) => (a.label > b.label ? 1 : -1));

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
	{name}
	placeholder={$translate('dashboard.select.placeholder.country')}
	{setValue}
	value={items.find((item) => item.value === value)}
/>
