<script lang="ts">
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import type { Basics } from '$lib/utils/types/Beverage/Basics';
	import Navigation from './navigation.svelte';
	import Gallery from './gallery/gallery.svelte';
	import Header from './header.svelte';
	import Tale from './tale/tale.svelte';
	import Testimony from './testimony/testimony.svelte';
	import FootNotes from './footNotes.svelte';
	import Impressions from './impressions/impressions.svelte';

	export let details: Details;
	export let next: Basics | null;
	export let previous: Basics | null;
</script>

<article>
	<Gallery {details} />
	<div>
		<Header {details} />
		<Tale {details} />
		<Testimony {details} />
		<Impressions {details} />
		<FootNotes {details} />
		<!-- {isLoggedIn && <AdminBar />} -->
	</div>
	<Navigation {next} {previous} />
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
		max-width: var(--size-container-max-width);
		padding: 2rem;
		margin: 0 auto 6rem auto;
	}

	div {
		grid-area: main;
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
			padding: 2rem 1rem;
		}
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

	article :global(dl) {
		grid-area: testimony;
		margin: 1.8rem 0;
	}

	article :global(dl::first-letter) {
		text-transform: uppercase;
	}

	article :global(dt) {
		display: inline;
	}

	article :global(dt::after) {
		content: ': ';
	}

	article :global(dd) {
		display: inline;
		margin: 0;
		padding: 0;
	}

	article :global(dd:not(:last-of-type)::after) {
		content: ', ';
	}

	article :global(dd > * + *:not(.no-separator)::before) {
		content: ' / ';
	}

	article :global(dd > * + .no-separator::before) {
		content: ' ';
	}
</style>
