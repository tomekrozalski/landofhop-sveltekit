<script lang="ts">
	import { translate } from 'svelte-intl';
	import Badge from '$lib/dashboard/fields/badge.svelte';

	function handleSubmit() {
		console.log('submitted');
	}
</script>

<form on:submit|preventDefault={handleSubmit} novalidate>
	<header>
		<h2>{$translate('dashboard.beverage.labelInfo.title')}</h2>
		<p>{$translate('dashboard.beverage.labelInfo.description')}</p>
	</header>
	<Badge form="label" />
</form>
