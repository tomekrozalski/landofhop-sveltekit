<script lang="ts">
	import { translate } from 'svelte-intl';
</script>

<h2>{$translate('brands.rates.title')}</h2>
<div>
	<p>{$translate('brands.rates.rules')}</p>
	<p>{$translate('brands.rates.thoughts')}</p>
</div>

<style>
	div {
		margin-bottom: 3rem;
		font-size: 1.6rem;
		line-height: 2.6rem;
	}

	p {
		margin: 0 0 2.6rem 0;
	}

	@media (min-width: 768px) {
		div {
			columns: 2 auto;
			column-gap: 3rem;
		}

		p {
			/* max-width: 60rem; */
			text-align: justify;
		}
	}

	@media (min-width: 1024px) {
		div {
			column-gap: 6rem;
		}
	}
</style>
