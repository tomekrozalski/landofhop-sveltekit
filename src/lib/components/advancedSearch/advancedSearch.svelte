<script lang="ts">
	import { onMount } from 'svelte';
	import { translate } from 'svelte-intl';
	import Spinner from '$lib/elements/spinner.svelte';
	import type AdvancedSearchData from './AdvancedSearchData.type';
	import Form from './form.svelte';
	import Results from './results.svelte';

	let mounted = false;
	let initialValues: AdvancedSearchData = {
		brands: null,
		ingredientTags: null,
		name: null,
		styleTags: null
	};

	onMount(async () => {
		const params = new URLSearchParams(location.search);
		initialValues.brands = params.get('brands')?.split(',') ?? null;
		initialValues.ingredientTags = params.get('ingredientTags')?.split(',') ?? null;
		initialValues.name = params.get('name') ?? null;
		initialValues.styleTags = params.get('styleTags')?.split(',') ?? null;

		mounted = true;
	});
</script>

<article>
	<h1>{$translate('advancedSearch.title')}</h1>
	{#if mounted}
		<Form {initialValues} />
		<Results data={initialValues} />
	{:else}
		<Spinner />
	{/if}
</article>
