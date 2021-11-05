<script lang="ts">
	import { translate } from 'svelte-intl';
	import languages from '@cospired/i18n-iso-languages/index.js';

	export let language: string;
</script>

<h5>
	{#if language === '--'}
		{$translate('dashboard.language.notApplicable')}
	{:else}
		{languages.getName(language, 'pl')}
	{/if}
</h5>

<style>
	h5 {
		font-size: 1.8rem;
		line-height: var(--size-input-height);
		font-weight: var(--font-weight-light);
		margin: 0;
	}
</style>
