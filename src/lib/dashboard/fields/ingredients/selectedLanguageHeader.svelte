<script lang="ts">
	import languages from '@cospired/i18n-iso-languages/index.js';
	export let language: string;
</script>

<h5>{languages.getName(language, 'pl')}</h5>

<style>
	h5 {
		grid-column: 2/3;
		font-size: 1.8rem;
		line-height: var(--size-input-height);
		font-weight: var(--font-weight-light);
		margin: 0;
		background-color: var(--color-grey-5);
		padding-right: 2rem;
		text-align: right;
	}
</style>
