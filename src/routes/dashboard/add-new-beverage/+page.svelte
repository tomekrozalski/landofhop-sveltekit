<script lang="ts">
	import { setContext } from 'svelte';
	import { translate, translations } from 'svelte-intl';

	import dashboardDictionary from '$lib/utils/dictionary/screens/dashboard.json';
	import commonFormsDictionary from '$lib/utils/dictionary/form.json';

	import { editorialStore, labelStore, producerStore } from '../utils/stores';
	import { initialValues as initialLabelValues } from '../Beverage/Label/initialValues';
	import { initialValues as initialProducerValues } from '../Beverage/Producer/initialValues';
	import { initialValues as initialEditorialValues } from '../Beverage/Editorial/initialValues';
	import Beverage from '../Beverage/Beverage.svelte';

	translations.update(dashboardDictionary);
	translations.update(commonFormsDictionary);

	labelStore.set(initialLabelValues);
	producerStore.set(initialProducerValues);
	editorialStore.set(initialEditorialValues);

	setContext('formType', 'add');
</script>

<svelte:head>
	<title>Land of Hop 🔒 Dashboard, {$translate('dashboard.title.addNewBeverage')}</title>
</svelte:head>

<Beverage />
