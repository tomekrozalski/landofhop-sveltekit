<script lang="ts">
	import { setContext } from 'svelte';
	import { translate } from 'svelte-intl';
	import { editorialStore, labelStore, producerStore } from '../../../../Beverage/stores';
	import Beverage from '../../../../Beverage/Beverage.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	if (data.beverage) {
		labelStore.set(data.beverage.label);
		producerStore.set(data.beverage.producer);
		editorialStore.set(data.beverage.editorial);
	}

	setContext('formType', 'update');
</script>

<svelte:head>
	<title>Land of Hop 🔒 Dashboard, {$translate('dashboard.title.updateBeverage')}</title>
</svelte:head>

<Beverage />
