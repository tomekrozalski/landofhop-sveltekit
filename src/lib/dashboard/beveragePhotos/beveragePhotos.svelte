<script lang="ts">
	import { onMount } from 'svelte';
	import { translate } from 'svelte-intl';
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	import Navigation from '$lib/dashboard/elements/navigation.svelte';
	import Spinner from '$lib/elements/spinner.svelte';
	import Cap from './cap.svelte';
	import Cover from './cover.svelte';
	import Gallery from './gallery.svelte';

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
		<Cap />
	</article>
{:else}
	<Spinner />
{/if}
