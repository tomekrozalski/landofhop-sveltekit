<script lang="ts">
	import { translate } from 'svelte-intl';
	import languages, { getAlpha2Codes } from '@cospired/i18n-iso-languages/index.js';
	import en from '@cospired/i18n-iso-languages/langs/en.json';
	import pl from '@cospired/i18n-iso-languages/langs/pl.json';
	import SelectWrapper from './selectWrapper.svelte';

	languages.registerLocale(en);
	languages.registerLocale(pl);

	export let errors: string;
	export let isWide: boolean = false;
	export let name: string;
	export let updateField: (fieldName: string, value: any) => void;
	export let withBlank: boolean = false;
	export let validateField: (fieldName: string) => void;
	export let value: string;

	const languageList = Object.keys(getAlpha2Codes()).map((value) => ({
		value,
		label: languages.getName(value, 'pl'),
		group: ['pl', 'en'].includes(value) ? 'mostPopular' : 'rest'
	}));

	if (withBlank) {
		languageList.unshift({
			value: '--',
			label: $translate('dashboard.language.notApplicable'),
			group: 'mostPopular'
		});
	}

	const items = [
		...languageList.filter(({ group }) => group === 'mostPopular').reverse(),
		...languageList.filter(({ group }) => group === 'rest')
	];

	const groupBy = (item) => item.group;

	let getGroupHeaderLabel = (option) => {
		return $translate(`dashboard.language.${option.label}`);
	};

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
	{getGroupHeaderLabel}
	{groupBy}
	{handleClear}
	{isWide}
	{items}
	{name}
	placeholder={$translate('dashboard.select.placeholder.language')}
	{setValue}
	value={items.find((item) => item.value === value)}
/>
