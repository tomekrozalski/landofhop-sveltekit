<script lang="ts">
	import { beverage } from '$lib/utils/stores/beverage';
	import Aside from './aside.svelte';
	import Gallery from './gallery/gallery.svelte';
	import Header from './header.svelte';
	import Tale from './tale/tale.svelte';
	import Testimony from './testimony/testimony.svelte';
</script>

<article>
	{#key $beverage.id}
		<Gallery />
	{/key}
	<Header />
	<Tale />
	<Testimony />
	<!-- <Impressions /> -->
	<!-- <FootNotes /> -->
	<!-- {isLoggedIn && <AdminBar />} -->
	<Aside />
</article>

<style>
	article {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-areas:
			'aside'
			'gallery'
			'header'
			'tale'
			'testimony'
			'impressions'
			'footnotes'
			'admin';
		column-gap: 4rem;
		max-width: var(--size-container-max-width);
		padding: 2rem;
		margin: 0 auto 6rem auto;
	}

	@media (--md) {
		article {
			grid-template-columns: 22rem 1fr 1fr;
			grid-template-areas:
				'aside aside aside'
				'gallery header header'
				'gallery tale tale'
				'gallery testimony testimony'
				'gallery impressions impressions'
				'gallery footnotes footnotes'
				'gallery admin admin'
				'gallery . .';
		}
	}

	@media (--lg) {
		article {
			grid-template-columns: 22rem 1fr 18rem;
			grid-template-areas:
				'gallery header aside'
				'gallery tale aside'
				'gallery testimony aside'
				'gallery impressions aside'
				'gallery footnotes aside'
				'gallery admin aside'
				'gallery . aside';
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
</style>
