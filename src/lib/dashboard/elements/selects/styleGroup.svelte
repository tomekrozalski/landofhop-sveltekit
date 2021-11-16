<script lang="ts">
	import { translations, translate } from 'svelte-intl';
	import dictionary from '$lib/utils/dictionary/lists/styleGroup.json';
	import { StyleGroup } from '$lib/utils/enums/StyleGroup.enum';
	import SelectWrapper from './selectWrapper.svelte';

	export let errors: string;
	export let name: string;
	export let updateField: (fieldName: string, value: any) => void;
	export let validateField: (fieldName: string) => void;
	export let value: string;

	translations.update(dictionary);

	const items = Object.values(StyleGroup).map((value) => ({
		label: $translate(`styleGroup.${value}`),
		value
	}));

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
