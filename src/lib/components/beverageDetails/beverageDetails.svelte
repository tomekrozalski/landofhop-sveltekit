<script lang="ts">
	import { session } from '$app/stores';
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import type { LinkData } from '$lib/utils/types/Beverage/LinkData';
	import Navigation from './navigation.svelte';
	import Gallery from './gallery/gallery.svelte';
	import Header from './header.svelte';
	import Tale from './tale/tale.svelte';
	import Testimony from './testimony/testimony.svelte';
	import FootNotes from './footNotes.svelte';
	import Impressions from './impressions/impressions.svelte';
	import AdminBar from './adminBar/adminBar.svelte';
	import Rating from './rating/rating.svelte';

	export let details: Details;
	export let next: LinkData | null;
	export let previous: LinkData | null;
</script>

<article>
	<Gallery {details} />
	<div>
		<Header {details} />
		<Tale {details} />
		<Testimony {details} />
		<Impressions {details} />
		<FootNotes {details} />
		{#if $session.isLoggedIn}
			<AdminBar {details} />
		{/if}
	</div>
	<aside>
		<Navigation {next} {previous} />
		<Rating {details} />
	</aside>
</article>

<style>
	article {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-areas:
			'navigation'
			'gallery'
			'main';
		column-gap: 4rem;
	}

	div {
		grid-area: main;
		padding: 0 2rem;
	}

	article :global(em) {
		font-weight: var(--font-weight-regular);
		font-style: normal;
	}

	article :global(.label),
	article :global(.producer),
	article :global(.editorial) {
		background-position: 0px 0.8em;
		background-repeat: repeat-x;
		font-weight: initial;
		color: inherit;
	}

	article :global(a.editorial) {
		transition: background-position var(--transition-default);
	}

	article :global(a.editorial:hover) {
		background-position: 0px 0.2em;
	}

	article :global(.label) {
		background-image: linear-gradient(var(--color-label-light), var(--color-label-light));
	}

	article :global(.producer) {
		background-image: linear-gradient(var(--color-producer-light), var(--color-producer-light));
	}

	article :global(.editorial) {
		background-image: linear-gradient(var(--color-editorial-light), var(--color-editorial-light));
	}

	article :global(dd) {
		margin: 0;
		padding: 0;
	}

	@media (--md) {
		article {
			grid-template-columns: 22rem 1fr 1fr;
			grid-template-areas:
				'navigation navigation navigation'
				'gallery main main';
		}
	}

	@media (--lg) {
		article {
			grid-template-columns: 22rem 1fr 18rem;
			grid-template-areas: 'gallery main navigation';
			padding-top: 2rem;
		}

		div {
			padding: 0;
		}
	}
</style>
