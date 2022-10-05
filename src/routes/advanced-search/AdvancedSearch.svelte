<script lang="ts">
	import { onMount } from 'svelte';
	import { translate } from 'svelte-intl';
	import Spinner from '$lib/atoms/spinners/FullScreen.svelte';
	import layoutStore from '../layout/store';
	import type AdvancedSearchData from './AdvancedSearchData.type';
	import Form from './Form.svelte';
	import Results from './Results.svelte';

	let mounted = false;
	let initialValues: AdvancedSearchData = {
		brands: null,
		ingredientTags: null,
		name: null,
		page: null,
		styleTags: null
	};

	onMount(async () => {
		layoutStore.closeSearchBar();

		const params = new URLSearchParams(location.search);
		initialValues.brands = params.get('brands')?.split(',') ?? null;
		initialValues.ingredientTags = params.get('ingredientTags')?.split(',') ?? null;
		initialValues.name = params.get('name') ?? null;
		initialValues.page = params.get('page') ? Number(params.get('page')) : null;
		initialValues.styleTags = params.get('styleTags')?.split(',') ?? null;

		mounted = true;
	});
</script>

<h1>{$translate('advancedSearch.title')}</h1>
{#if mounted}
	<Form {initialValues} />
	<Results data={initialValues} />
{:else}
	<Spinner />
{/if}

<style>
	h1 {
		padding-top: 4rem;
	}
</style>
