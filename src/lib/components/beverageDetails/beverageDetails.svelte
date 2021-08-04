<script lang="ts">
	import Aside from './aside.svelte';
	import Header from './header/header.svelte';
</script>

<article>
	<!-- <Gallery /> -->
	<Header />
	<!-- <Tale /> -->
	<!-- <Testimony /> -->
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
</style>
