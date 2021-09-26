<script lang="ts">
	import { translate } from 'svelte-intl';
	import languages, { getAlpha2Codes } from '@cospired/i18n-iso-languages';
	import en from '@cospired/i18n-iso-languages/langs/en.json';
	import pl from '@cospired/i18n-iso-languages/langs/pl.json';
	import Icon from '$lib/elements/vectors/language.svelte';
	import SelectWrapper from './selectWrapper.svelte';

	languages.registerLocale(en);
	languages.registerLocale(pl);

	export let errors: string;
	export let name: string;
	export let updateValidateField: (string, any) => void;
	export let value: string;

	const languageList = Object.keys(getAlpha2Codes()).map((value) => ({
		value,
		label: languages.getName(value, 'pl'),
		group: ['pl', 'en'].includes(value) ? 'mostPopular' : 'rest'
	}));

	languageList.unshift({
		value: '--',
		label: $translate('dashboard.language.notApplicable'),
		group: 'mostPopular'
	});

	const items = [
		...languageList.filter(({ group }) => group === 'mostPopular').reverse(),
		...languageList.filter(({ group }) => group === 'rest')
	];

	const groupBy = (item) => item.group;

	export let getGroupHeaderLabel = (option) => {
		return $translate(`dashboard.language.${option.label}`);
	};
</script>

<SelectWrapper
	{errors}
	{getGroupHeaderLabel}
	{groupBy}
	{Icon}
	{items}
	{name}
	{updateValidateField}
	placeholder="wybierz język"
	showChevron={true}
	value={items.find((item) => item.value === value)}
/>
