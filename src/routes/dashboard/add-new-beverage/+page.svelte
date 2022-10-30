<script lang="ts">
	import { setContext } from 'svelte';
	import { translate } from 'svelte-intl';
	import { editorialStore, labelStore, producerStore } from '$Beverage/utils/stores';
	import { initialValues as initialLabelValues } from '$Beverage/Label/initialValues';
	import { initialValues as initialProducerValues } from '$Beverage/Producer/initialValues';
	import { initialValues as initialEditorialValues } from '$Beverage/Editorial/initialValues';
	import Beverage from '$Beverage/Beverage.svelte';

	labelStore.set(initialLabelValues);
	producerStore.set(initialProducerValues);
	editorialStore.set(initialEditorialValues);

	setContext('formType', 'add');
</script>

<svelte:head>
	<title>Land of Hop 🔒 Dashboard, {$translate('dashboard.title.addNewBeverage')}</title>
</svelte:head>

<Beverage />
