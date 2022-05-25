<script lang="ts">
	import { onMount } from 'svelte';
	import { translate } from 'svelte-intl';
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	import Navigation from '$lib/dashboard/elements/navigation.svelte';
	import Spinner from '$lib/elements/spinners/fullScreen.svelte';
	import Cover from './cover.svelte';
	import Gallery from './gallery.svelte';
	import ViewFromAbove from './viewFromAbove.svelte';

	onMount(() => {
		if (!$session.isLoggedIn) {
			goto('/', { replaceState: true });
		}
	});
</script>

{#if $session.isLoggedIn}
	<article>
		<h1>{$translate('dashboard.beveragePhotos.title')}</h1>
		<Navigation />
		<Cover />
		<Gallery />
		<ViewFromAbove />
	</article>
{:else}
	<Spinner />
{/if}
