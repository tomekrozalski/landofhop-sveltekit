<script lang="ts">
	import { fade } from 'svelte/transition';
	import { translate } from 'svelte-intl';
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" transition:fade={{ duration: 200 }}>
	<title>{$translate('header.closeSearch')}</title>
	<path d="M1 0l13 13 -1 1L0 1 1 0z" />
	<path d="M14 1L1 14 0 13 13 0 14 1z" />
</svg>

<style>
	svg {
		width: 3rem;
		height: 3rem;
	}
</style>
